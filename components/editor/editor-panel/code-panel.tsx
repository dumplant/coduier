import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeContext } from "@/context/codeContext";
import { useContext, useEffect, useState } from "react";
import { getHighlighter, setCDN } from "shiki";

const CodePanel = () => {
  const { code, setCode } = useContext(CodeContext);
  const [highlightCode, setHighlightCode] = useState<string>("");
  function setCodeHighlighter() {
    setCDN("https://cdn.jsdelivr.net/npm/shiki");
    getHighlighter({ theme: "one-dark-pro", langs: ["jsx"] })
      .then((h) => {
        const html = h.codeToHtml(code, {
          lang: "jsx",
        });
        setHighlightCode(html);
      })
      .catch((error) => {
        setHighlightCode(error);
      });
  }

  useEffect(() => {
    if (!code) return;
    setCodeHighlighter();
  }, [code]);

  return (
    <div className="p-4">
      <ScrollArea>
        <div dangerouslySetInnerHTML={{ __html: highlightCode }}></div>
      </ScrollArea>
    </div>
  );
};

export default CodePanel;
