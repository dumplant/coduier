import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  if (!params.inviteCode) {
    return redirect("/");
  }

  const existingProject = await db.project.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (existingProject) {
    return redirect(`/projects/${existingProject.id}`);
  }
  // 更新数据库中的一个项目
  const project = await db.project.update({
    where: {
      // 指定要更新的项目的条件，这里是邀请码等于参数中的inviteCode的项目
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            // 将当前用户（由profile.id指定）添加为指定项目的成员
            profileId: profile.id,
          },
        ],
      },
    },
  });

  // 重定向到该项目的页面
  if (project) {
    return redirect(`/projects/${project.id}`);
  }

  return <></>;
};

export default InviteCodePage;
