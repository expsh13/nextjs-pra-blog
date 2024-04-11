import { NextResponse } from "next/server";
import { main, prisma } from "../route";

// ブログの詳細記事取得
export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = parseInt(params.id);
    await main();
    const post = await prisma.post.findFirst({ where: { id } });
    return NextResponse.json({ message: "success", post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
