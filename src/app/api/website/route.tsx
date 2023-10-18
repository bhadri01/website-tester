import { NextRequest, NextResponse } from "next/server";
import DB from "@/lib/db";
import WebModels from "@/models/website";
import { ErrorRespose } from "@/lib/ErrorResponse";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";

type WebModelsType = {
  logo: String;
  brandName: String;
  website: String;
  domainService: String;
  domainPurchase: String;
  domainExpiry: String;
};

export async function GET() {
  try {
    await DB();
    let website = await WebModels.find({});
    return NextResponse.json(
      { status: true, message: "list of websites", data: website },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorRespose(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData: any = await request.formData();
    const file: any = formData.get("logo") as Blob | null;
    if (!file) {
      return NextResponse.json(
        { status: false, message: "File blob is required." },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = `/brandlogo`;
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    await writeFile(`${uploadDir}/${file?.name}`, buffer);

    const websiteData: WebModelsType = {
      brandName: formData.get("brandName"),
      domainExpiry: formData.get("domainExpiry"),
      domainPurchase: formData.get("domainPurchase"),
      domainService: formData.get("domainService"),
      logo: `/brandlogo/${file?.name}`,
      website: formData.get("website"),
    };
    await DB();
    await WebModels.create(websiteData);
    return NextResponse.json(
      { status: true, message: "website added to your list" },
      { status: 200 }
    );
  } catch (error: any) {
    return ErrorRespose(error);
  }
}
