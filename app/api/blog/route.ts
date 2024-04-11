import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const prisma = new PrismaClient();

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
    const posts = await prisma.post.findMany();
    return NextResponse.json({ message: "success", posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログ投稿
export const POST = async (req: Request, res: NextResponse) => {
  try {
    const { title, description } = await req.json();
    await main();
    const posts = await prisma.post.create({ data: { title, description } });
    return NextResponse.json({ message: "success", posts }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
