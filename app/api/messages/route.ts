// pages/api/messages.ts
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  const pageId = searchParams.get("pageId");
  const messages = await db.message.findMany({
    where: {
      pageId: pageId!,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(messages);
}
