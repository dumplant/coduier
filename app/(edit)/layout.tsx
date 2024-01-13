"use client";
import EditorSidebar from "@/components/editor/editor-siderbar";
import { Button } from "@/components/ui/button";
import { PageContext } from "@/context/pageContext";
import { ArrowBigLeft, Pen, Save, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const EditorLayout = async ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { pageName, setPageName, projectName, setProjectName } =
    useContext(PageContext);

  return (
    <div className="h-full">
      <header className="fixed h-14 w-full bg-white shadow px-4 py-2 flex justify-between items-center gap-4">
        <div>
          <span className="font-bold">CODUIER</span>
          <span> - </span>
          {projectName} / {pageName}
        </div>
        <div>
          <Button onClick={() => router.back()}>
            <ArrowBigLeft />
            <p className="ml-1">返回</p>
          </Button>
          <Button onClick={() => router.back()}>
            <Save />
            <p className="ml-1">保存</p>
          </Button>
        </div>
      </header>
      <div className="hidden md:flex h-full z-30 flex-col fixed inset-y-14">
        <EditorSidebar />
      </div>
      <main className="md:pl-[358px] pt-14 h-full">{children}</main>
    </div>
  );
};

export default EditorLayout;
