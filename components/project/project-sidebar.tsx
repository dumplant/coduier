import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProjectHeader from "./project-header";

interface ServerSidebarProps {
  projectId: string;
}
const ProjectSidebar = async ({ projectId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  if (!project) {
    return redirect("/");
  }

  const members = project?.members.filter(
    (member) => member.profileId !== profile.id
  );

  const role = project.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full bg-[#F2F3F5]">
      <ProjectHeader project={project} role={role} />
    </div>
  );
};

export default ProjectSidebar;
