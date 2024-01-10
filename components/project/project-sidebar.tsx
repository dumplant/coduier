import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ProjectHeader from "./project-header";
import { ProjectPage } from "./project-page";

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
      pages: {
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
      {project.pages.length > 0 && (
        <div className="space-y-[2px]">
          {project.pages.map((page) => (
            <ProjectPage
              key={page.id}
              project={project}
              role={role}
              page={page}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectSidebar;
