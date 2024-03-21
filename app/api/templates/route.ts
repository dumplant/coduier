import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, nameCN, description, code } = await req.json();
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get("projectId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID missing", { status: 400 });
    }

    const project = await db.project.update({
      where: {
        id: projectId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        templates: {
          create: {
            name,
            nameCN,
            description,
            code,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("TEMPLATES_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
