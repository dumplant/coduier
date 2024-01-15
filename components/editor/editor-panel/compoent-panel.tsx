import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const ComponentPanel = () => {
  const components = [
    {
      name: "Card",
      nameCN: "卡片",
      import: `
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  `,
    },
    {
      name: "Select",
      nameCN: "选择器",
      import: `
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent,
  } from "@/components/ui/select";
  `,
    },
    {
      name: "Input",
      nameCN: "输入框",
      import: 'import { Input } from "@/components/ui/input";',
    },
    {
      name: "RadioGroup",
      nameCN: "单选组",
      import: `
  import {
    RadioGroup,
    RadioGroupItem,
  } from "@/components/ui/radio-group";
  `,
    },
    {
      name: "Textarea",
      nameCN: "文本区域",
      import: 'import { Textarea } from "@/components/ui/textarea";',
    },
    {
      name: "Checkbox",
      nameCN: "复选框",
      import: 'import { Checkbox } from "@/components/ui/checkbox";',
    },
    {
      name: "Button",
      nameCN: "按钮",
      import: 'import { Button } from "@/components/ui/button";',
    },
    {
      name: "Label",
      nameCN: "标签",
      import: 'import { Label } from "@/components/ui/label";',
    },
    // ... 其他组件
  ];

  return (
    <div className="p-4 ">
      <div className="grid grid-cols-2 gap-3">
        {components.map((c) => {
          return (
            <Popover>
              <PopoverTrigger asChild>
                <div className="w-[100%] p-2 bg-zinc-100 border-zinc-300 shadow rounded-sm hover:cursor-pointer">
                  <div className="text-base">{c.nameCN}</div>
                  <div className="text-sm text-zinc-500">{c.name}</div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">组件信息</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="width">名称</Label>
                      <Input
                        defaultValue={c.nameCN}
                        className="col-span-2 h-8"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="maxWidth">英文名</Label>
                      <Input defaultValue={c.name} className="col-span-2 h-8" />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">导入与使用</Label>
                      <Textarea
                        defaultValue={c.import}
                        className="col-span-2 h-20"
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
      <div className="flex mt-3 h-[48px] w-[100%] rounded-[24px] hover:rounded-[12px] items-center justify-center bg-zinc-100 hover:cursor-pointer">
        <Plus className=" transition text-black" size={25} />
      </div>
    </div>
  );
};

export default ComponentPanel;
