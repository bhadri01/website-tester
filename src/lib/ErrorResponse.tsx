import { NextResponse } from "next/server";

export const ErrorRespose = (error: any) => {
  return NextResponse.json(
    {
      status: false,
      message: String(error.message),
    },
    { status: 500 }
  );
};
