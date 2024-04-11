import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const main = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    return Error("db接続に失敗しました");
  }
};

// ブログの全記事取得
export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
  } catch (error) {
  } finally {
  }
};
