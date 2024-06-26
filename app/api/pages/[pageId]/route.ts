import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { pageId: string } }
) {
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

    if (!params.pageId) {
      return new NextResponse("Page ID missing", { status: 400 });
    }

    const project = await db.project.update({
      where: {
        id: projectId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.DEVELOPER],
            },
          },
        },
      },
      data: {
        pages: {
          delete: {
            id: params.pageId,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// export async function PATCH(
//   req: Request,
//   { params }: { params: { pageId: string } }
// ) {
//   try {
//     const profile = await currentProfile();
//     const { name, type } = await req.json();
//     const { searchParams } = new URL(req.url);

//     const projectId = searchParams.get("projectId");

//     if (!profile) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!projectId) {
//       return new NextResponse("Server ID missing", { status: 400 });
//     }

//     if (!params.pageId) {
//       return new NextResponse("Channel ID missing", { status: 400 });
//     }

//     if (name === "general") {
//       return new NextResponse("Name cannot be 'general'", { status: 400 });
//     }

//     const project = await db.project.update({
//       where: {
//         id: projectId,
//         members: {
//           some: {
//             profileId: profile.id,
//             role: {
//               in: [MemberRole.ADMIN, MemberRole.MODERATOR],
//             },
//           },
//         },
//       },
//       data: {
//         pages: {
//           update: {
//             where: {
//               id: params.pageId,
//               NOT: {
//                 name: "general",
//               },
//             },
//             data: {
//               name,
//               type,
//             },
//           },
//         },
//       },
//     });

//     return NextResponse.json(project);
//   } catch (error) {
//     console.log("[CHANNEL_ID_PATCH]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

export async function GET(
  req: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.pageId) {
      return new NextResponse("Page ID missing", { status: 400 });
    }

    const page = await db.page.findFirst({
      where: {
        id: params.pageId,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[CHANNEL_ID_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { pageId: string } }
) {
  try {
    const profile = await currentProfile();
    const { code } = await req.json();
    console.log("code", code, "params", params);
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.pageId) {
      return new NextResponse("Page ID missing", { status: 400 });
    }

    const page = await db.page.update({
      where: {
        id: params.pageId,
      },
      data: {
        code,
      },
    });

    return NextResponse.json(page);
  } catch (error) {
    console.log("[CHANNEL_ID_CODE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
