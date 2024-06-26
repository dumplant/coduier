import ProjectSidebar from "@/components/project/project-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ProjectIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { projectId: string };
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const project = await db.project.findUnique({
    where: {
      id: params.projectId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (!project) {
    return redirect("/");
  }
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ProjectSidebar projectId={params.projectId} />
      </div>
      <div className="absolute top-0 right-0 bg-zinc-700 rounded-bl-sm text-white p-2">
        ✨ <span className="font-bold">CODUIER</span> · 前端代码生成工具
      </div>
      <main className="h-full md:pl-60 pt-5">{children}</main>
    </div>
  );
};

export default ProjectIdLayout;
