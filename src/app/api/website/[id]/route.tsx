import { ErrorRespose } from "@/lib/ErrorResponse";
import DB from "@/lib/db";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import WebModels from "@/models/website";
import { WebModelsType } from "../route";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DB();
    let data = await WebModels.findOne({ _id: params.id });
    return NextResponse.json(
      { status: true, message: "list by id" + params.id, data: data || [] },
      { status: 200 }
    );
  } catch (error) {
    return ErrorRespose(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    const timedata = new Date().getTime()
    await writeFile(`${uploadDir}/${timedata}_${file?.name}${file?.name}`, buffer);

    const websiteData: WebModelsType = {
      brandName: formData.get("brandName"),
      domainExpiry: formData.get("domainExpiry"),
      domainPurchase: formData.get("domainPurchase"),
      domainService: formData.get("domainService"),
      logo: `/brandlogo/${timedata}_${file?.name}${file?.name}`,
      website: formData.get("website"),
    };
    await DB();
    await WebModels.updateOne({ _id: params.id }, websiteData);
    return NextResponse.json(
      { status: true, message: "website updated in your list" },
      { status: 200 }
    );
  } catch (error) {
    return ErrorRespose(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await DB();
    await WebModels.deleteOne({ _id: params.id });
    return NextResponse.json(
      { status: true, message: "website removed from in your list" },
      { status: 200 }
    );
  } catch (error) {
    return ErrorRespose(error);
  }
}
