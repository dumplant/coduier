"use client";

import qs from "query-string";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const DeletePageModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "deletePage";
  const { project, page } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/pages/${page?.id}`,
        query: {
          projectId: project?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/projects/${project?.id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            删除页面
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            确定执行该操作？ <br />
            <span className="text-indigo-500 font-semibold">
              #{page?.name}
            </span>{" "}
            将会被永久删除
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              取消
            </Button>
            <Button disabled={isLoading} variant="default" onClick={onClick}>
              确认
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
