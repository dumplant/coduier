"use client";

import { Page, MemberRole, Project } from "@prisma/client";
import { Edit, Hash, Lock, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionTooltip } from "@/components/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";
import { useContext, useEffect } from "react";
import { PageContext } from "@/context/pageContext";

interface ProjectPageProps {
  page: Page;
  project: Project;
  role?: MemberRole;
}

export const ProjectPageItem = ({ page, project, role }: ProjectPageProps) => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();
  const { pageName, setPageName, projectName, setProjectName } =
    useContext(PageContext);
  const onClick = () => {
    router.push(`/projects/${params?.projectId}/pages/${page.id}`);
  };

  const onAction = (e: React.MouseEvent, action: ModalType) => {
    e.stopPropagation();
    onOpen(action, { page, project });
  };

  useEffect(() => {
    setProjectName(project.name);
  }, []);
  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-3 py-3 flex items-center gap-x-2 w-full hover:bg-zinc-700/10 transition mb-1",
        params?.pageId === page.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.pageId === page.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {page.name}
      </p>
      {role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit
              onClick={(e) => {
                e.stopPropagation();
                setPageName(page.name);
                router.push(
                  `/edit/projects/${params?.projectId}/pages/${page.id}`
                );
              }}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={(e) => onAction(e, "deleteChannel")}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </button>
  );
};
