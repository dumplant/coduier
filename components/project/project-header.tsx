"use client";

import { useModal } from "@/hooks/use-modal-store";
import { ProjectWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { exportCode, handleExportCode } from "@/utils/exportCode";
import axios from "axios";

interface ProjectHeaderProps {
  project: ProjectWithMembersWithProfiles;
  role?: MemberRole;
}

const ProjectHeader = ({ project, role }: ProjectHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  // const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 border-b-2 hover:bg-zinc-700/10  transition">
          {project.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black space-y-[2px]">
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { project })}
            className="text-indigo-600 px-3 py-2 text-sm cursor-pointer"
          >
            邀请成员
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editProject", { project })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            项目设置
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { project })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            管理成员
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {
          <DropdownMenuItem
            onClick={() => onOpen("createPage")}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            创建页面
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        }
        {isAdmin && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteProject", { project })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            删除项目
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveProject", { project })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            退出项目
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {
          <DropdownMenuItem
            onClick={() => exportCode(project.id)}
            className=" px-3 py-2 text-sm cursor-pointer"
          >
            导出代码
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        }
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectHeader;
