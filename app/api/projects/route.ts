import { v4 as uuidv4 } from "uuid";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://api.openai-proxy.com/v1",
});

export async function POST(req: Request) {
  try {
    // 从请求体中获取name和description
    const { name, description } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // 生成页面数组
    const pages = (await generatePages(name, description)) as Array<string>;

    // 在数据库中创建新的项目
    const project = await db.project.create({
      data: {
        // 设置项目的用户资料ID
        profileId: profile.id,
        // 设置项目的名称和描述
        name,
        description,
        // 生成一个新的邀请码
        inviteCode: uuidv4(),
        // 创建页面
        pages: {
          create: pages.map((page) => {
            return { name: page, profileId: profile.id };
          }),
        },
        // 创建项目成员
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[PROJECTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function generatePages(projectName: string, description: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Create pages name for a project named " +
          projectName +
          "with the description: " +
          description +
          "For example, the output should put all the names in an array, like ['主页','关于我们','个人中心']",
      },
    ],
    model: "gpt-3.5-turbo-1106",
  });

  const pages =
    (completion.choices[0].message.content || "['主页']")
      .match(/'([^']*)'/g)
      ?.map((page) => page.replace(/'/g, "")) || [];
  console.log(completion.choices[0].message.content, pages);
  return pages;
}
