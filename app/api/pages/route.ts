import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, nameEN } = await req.json();
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get("projectId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID missing", { status: 400 });
    }

    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 400 });
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
        pages: {
          create: {
            profileId: profile.id,
            name,
            nameEN,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("PAGES_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID missing", { status: 400 });
    }

    const project = await db.project.findFirst({
      where: {
        id: projectId,
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      include: {
        pages: true,
      },
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    return NextResponse.json(project.pages);
  } catch (error) {
    console.log("PAGES_GET", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
