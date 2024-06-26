"use client";

import { useEffect, useState } from "react";
import CreateProjectModal from "../modals/create-project-modal";
import InviteModal from "../modals/invite-modal";
import CreatePageModal from "../modals/create-page-modal";
import CreateTemplateModal from "../modals/create-template-modal";
import { DeleteProjectModal } from "../modals/delete-project-modal";
import { Delete } from "lucide-react";
import { DeletePageModal } from "../modals/delete-page-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateProjectModal />
      <CreatePageModal />
      <InviteModal />
      <CreateTemplateModal />
      <DeleteProjectModal />
      <DeletePageModal />
    </>
  );
};
