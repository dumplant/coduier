import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeContext } from "@/context/codeContext";
import { useContext, useEffect, useState } from "react";
import { getHighlighter, setCDN } from "shiki";
import { Button } from "../ui/button";
import { Check, Copy, Download } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToast } from "@/components/ui/use-toast";

const CodeArea = () => {
  const { toast } = useToast();
  const { code, setCode } = useContext(CodeContext);
  const [highlightCode, setHighlightCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "page.jsx";
    a.click();
    URL.revokeObjectURL(url);
  };

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
    <ScrollArea className="relative w-[80%] h-[90%] border-8 border-gray-300 rounded-lg bg-[#282c34] p-2">
      <div className="absolute top-0 right-2">
        <Button
          className="p-1 text-zinc-400 hover:text-white "
          variant={"link"}
          onClick={onCopy}
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
        <Button
          className="p-1 text-zinc-400 hover:text-white"
          variant={"link"}
          onClick={handleDownload}
        >
          <Download />
        </Button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: highlightCode }}></div>
    </ScrollArea>
  );
};

export default CodeArea;
