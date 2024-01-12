import EditorSidebar from "@/components/editor/editor-siderbar";

const EditorLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full z-30 flex-col fixed inset-y-0">
        <EditorSidebar />
      </div>
      <main className="md:pl-[358px] h-full">{children}</main>
    </div>
  );
};

export default EditorLayout;
