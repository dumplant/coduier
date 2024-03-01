import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.openai-proxy.com/v1",
});

const openai = new OpenAIApi(config);

export const runtime = "nodejs";

export async function POST(req: Request) {
  const json = await req.json();
  const { messages, pageId, projectId } = json;
  console.log(messages);
  const profile = await currentProfile();
  if (!profile) {
    return redirectToSignIn();
  }
  const project = await db.project.findFirst({
    where: {
      id: projectId as string,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: true,
    },
  });

  if (!project) {
    return new NextResponse("Project ID missing", { status: 400 });
  }

  const page = await db.page.findFirst({
    where: {
      id: pageId as string,
      projectId: projectId as string,
    },
  });

  if (!page) {
    return new NextResponse("Project ID missing", { status: 400 });
  }

  const member = project.members.find(
    (member) => member.profileId === profile.id
  );
  if (!member) {
    return new NextResponse("Project ID missing", { status: 400 });
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-1106",
    stream: true,
    messages: messages,
    max_tokens: 3000,
  });

  const stream = OpenAIStream(response, {
    onCompletion: async (completion: string) => {
      const message = await db.message.create({
        data: {
          pageId: pageId,
          memberId: member.id,
          response: completion,
          content: messages.slice(-1)[0].content,
        },
        include: {
          member: {
            include: {
              profile: true,
            },
          },
        },
      });
    },
  });

  return new StreamingTextResponse(stream);
}
