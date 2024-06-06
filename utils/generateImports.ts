export function generateImports(used: string[], declarations: Set<string>) {
  const importMap: Record<string, Set<string>> = {};
  const fallbacks: string[] = [];

  for (const u of used) {
    let source = "";
    let fallback = false;

    for (const rule of shadcnRules) {
      if (new RegExp(rule.matcher).test(u)) {
        source = rule.source;
        break;
      }
    }

    if (!source && lucideIcons[u]) {
      source = "lucide-react";
    }

    if (!source && declarations.has(u)) {
      continue;
    }

    if (!source) {
      // fallback to Home icon
      source = "lucide-react";
      fallback = true;
      fallbacks.push(u);
    }

    if (!importMap[source]) {
      importMap[source] = new Set();
    }
    importMap[source].add(fallback ? "Home" : u);
  }

  let importStatements = "";
  for (const key in importMap) {
    const statement = `import { ${Array.from(importMap[key]).join(
      ", "
    )} } from '${key}';`;
    importStatements += `${statement}\r\n`;
  }

  return { importStatements, fallbacks };
}

export const shadcnRules = [
  {
    matcher: "^Avatar.*",
    source: "@/components/ui/avatar",
  },
  {
    matcher: "^AspectRatio",
    source: "@/components/ui/aspect-ratio",
  },
  {
    matcher: "^Badge",
    source: "@/components/ui/badge",
  },
  {
    matcher: "^Button",
    source: "@/components/ui/button",
  },
  {
    matcher: "^Card.*",
    source: "@/components/ui/card",
  },
  {
    matcher: "^Checkbox",
    source: "@/components/ui/checkbox",
  },
  {
    matcher: "^Collapsible.*",
    source: "@/components/ui/collapsible",
  },
  {
    matcher: "^Menubar.*",
    source: "@/components/ui/menubar",
  },
  {
    matcher: "^Select.*",
    source: "@/components/ui/select",
  },
  {
    matcher: "^RadioGroup.*",
    source: "@/components/ui/radio-group",
  },
  {
    matcher: "^Textarea",
    source: "@/components/ui/textarea",
  },
  {
    matcher: "^ToggleGroup.*",
    source: "@/components/ui/toggle-group",
  },
  {
    matcher: "^Toggle",
    source: "@/components/ui/toggle",
  },
  {
    matcher: "^Skeleton",
    source: "@/components/ui/skeleton",
  },
  {
    matcher: "^Slider",
    source: "@/components/ui/slider",
  },
  {
    matcher: "^Tooltip.*",
    source: "@/components/ui/tooltip",
  },
  {
    matcher: "^Label",
    source: "@/components/ui/label",
  },
  {
    matcher: "^Input",
    source: "@/components/ui/input",
  },
  {
    matcher: "^ScrollArea",
    source: "@/components/ui/scroll-area",
  },
  {
    matcher: "^Switch",
    source: "@/components/ui/switch",
  },
  {
    matcher: "^Dialog.*",
    source: "@/components/ui/dialog",
  },
  {
    matcher: "^Sheet.*",
    source: "@/components/ui/sheet",
  },
  {
    matcher: "^Separator",
    source: "@/components/ui/separator",
  },
  {
    matcher: "^NavigationMenu.*",
    source: "@/components/ui/navigation-menu",
  },
  {
    matcher: "^HoverCard.*",
    source: "@/components/ui/hover-card",
  },
  {
    matcher: "^DropdownMenu.*",
    source: "@/components/ui/dropdown-menu",
  },
  {
    matcher: "^Accordion.*",
    source: "@/components/ui/accordion",
  },
  {
    matcher: "^AlertDialog.*",
    source: "@/components/ui/alert-dialog",
  },
  {
    matcher: "^Alert.*",
    source: "@/components/ui/alert",
  },
  {
    matcher: "^Table.*",
    source: "@/components/ui/table",
  },
  {
    matcher: "^Tabs.*",
    source: "@/components/ui/tabs",
  },
  {
    matcher: "^Popover.*",
    source: "@/components/ui/popover",
  },
  {
    matcher: "^Calendar",
    source: "@/components/ui/calendar",
  },
  {
    matcher: "^Command.*",
    source: "@/components/ui/command",
  },
  {
    matcher: "^ContextMenu.*",
    source: "@/components/ui/context-menu",
  },
  {
    matcher: "^Carousel.*",
    source: "@/components/ui/carousel",
  },
  {
    matcher: "^Drawer.*",
    source: "@/components/ui/drawer",
  },
  {
    matcher: "^Pagination.*",
    source: "@/components/ui/pagination",
  },
  {
    matcher: "^Resizable.*",
    source: "@/components/ui/resizable",
  },
];

export const lucideIcons: Record<string, unknown> = {};
// try {
//   const iconNodes = await (
//     await fetch("https://lucide.dev/api/icon-nodes")
//   ).json();
//   for (const key in iconNodes) {
//     const newKey = key
//       .split("-")
//       .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
//       .join("");
//     lucideIcons[newKey] = iconNodes[key];
//   }
// } catch {}
