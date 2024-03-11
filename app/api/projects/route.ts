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
    const { name, description } = await req.json();
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const pages = (await generatePages(name, description)) as Array<string>;

    const project = await db.project.create({
      data: {
        profileId: profile.id,
        name,
        description,
        inviteCode: uuidv4(),
        pages: {
          create: pages.map((page) => {
            return { name: page, profileId: profile.id };
          }),
        },
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
