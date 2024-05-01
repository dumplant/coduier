"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Check,
  Sliders,
  Play,
  Volume2,
  Maximize,
  ArrowRight,
  Search,
  User,
  Key,
  Home,
  PlayCircle,
  Fullscreen,
  Pause,
  Volume,
  Settings,
  Lock,
  Badge,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import dynamic from "next/dynamic";
import { useContext, useEffect, useMemo } from "react";
import { CodeContext } from "@/context/codeContext";
import { extractLastBracesContent } from "@/utils/extract";
import { ErrorBoundary } from "react-error-boundary";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { refineCode } from "@/utils/refineCode";

const DynamicComponentWithRef = dynamic(
  () => import("string-to-react-component"),
  { ssr: false }
);
const CanvasArea = () => {
  const { code, setCode, success, setSuccess } = useContext(CodeContext);

  const extractCode = useMemo(() => {
    const result = extractLastBracesContent(code);
    setSuccess(true);
    return result;
  }, [code]);

  refineCode(`import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "@/components/ui/button";
  import { useState } from 'react';

  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    CardFooter,
  } from "@/components/ui/card";
  import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
  import { Home, User, Settings } from "lucide-react";
  import { useContext, useEffect, useMemo } from "react";
  
  export default function StudentDormSelectionPage() {
    const [selectedDorm, setSelectedDorm] = useState("");
    return (
      <main className="p-4">
      <NotFound>123</NotFound>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">学生选宿舍系统</h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline">个人信息</Button>
            <Button variant="outline">选宿舍</Button>
          </div>
        </div>
  
        <Card>
          <CardHeader>
            <Avatar>
              <AvatarImage src="https://source.unsplash.com/random/100x100" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>张三</CardTitle>
              <p>学号: 123456</p>
            </div>
          </CardHeader>
          <CardContent>
            <div>
              <h2 className="text-lg font-semibold mb-2">选宿舍注意事项</h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>宿舍分配规则</AccordionTrigger>
                  <AccordionContent>
                    请遵守学校的宿舍分配规定，不得私自调换宿舍。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>宿舍卫生</AccordionTrigger>
                  <AccordionContent>
                    经常打扫宿舍卫生，保持宿舍环境整洁。
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>宿舍安全</AccordionTrigger>
                  <AccordionContent>
                    爱护公共财产，保障宿舍安全。
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </CardContent>
          <CardFooter>
            <CardDescription>
              选宿舍时间: 2022年9月1日至2022年9月5日
            </CardDescription>
          </CardFooter>
        </Card>
  
        <Alert>
          <User className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            请仔细阅读宿舍选取注意事项，并按照要求进行选择。
          </AlertDescription>
        </Alert>
      </main>
    );
  }`);
  // console.log(extractCode);
  return (
    <div className="w-[80%] h-[90%] border-8 border-gray-300 rounded-lg overflow-y-scroll ">
      <ErrorBoundary
        fallback={<div>糟糕，出错了，请重试</div>}
        onError={(error) => {
          console.log(error);
          setSuccess(false);
        }}
      >
        <DynamicComponentWithRef
          data={{
            Tabs,
            TabsContent,
            TabsList,
            TabsTrigger,
            Card,
            CardTitle,
            CardHeader,
            CardDescription,
            Select,
            CardContent,
            Label,
            Button,
            Input,
            RadioGroup,
            RadioGroupItem,
            SelectTrigger,
            SelectValue,
            SelectItem,
            SelectContent,
            Textarea,
            Checkbox,
            CardFooter,
            Check,
            ArrowRight,
            Search,
            User,
            Key,
            Home,
            AspectRatio,
            Calendar,
            Alert,
            AlertDescription,
            AlertTitle,
            Avatar,
            AvatarFallback,
            AvatarImage,
            Popover,
            PopoverContent,
            PopoverTrigger,
            Progress,
            Sliders,
            Play,
            Volume2,
            Maximize,
            Tooltip,
            TooltipContent,
            TooltipProvider,
            TooltipTrigger,
            Slider,
            PlayCircle,
            Fullscreen,
            Menubar,
            MenubarContent,
            MenubarItem,
            MenubarMenu,
            MenubarSeparator,
            MenubarShortcut,
            MenubarTrigger,
            Pause,
            Volume,
            DropdownMenu,
            DropdownMenuContent,
            DropdownMenuItem,
            DropdownMenuLabel,
            DropdownMenuSeparator,
            DropdownMenuTrigger,
            Settings,
            NavigationMenu,
            NavigationMenuContent,
            NavigationMenuIndicator,
            NavigationMenuItem,
            NavigationMenuLink,
            NavigationMenuList,
            NavigationMenuTrigger,
            NavigationMenuViewport,
            Lock,
            Separator,
            Badge,
            Accordion,
            AccordionContent,
            AccordionItem,
            AccordionTrigger,
            ScrollArea,
            Save,
          }}
        >
          {`(props)=>{
          const {PlayCircle,Fullscreen,Slider,Tooltip,TooltipContent,TooltipProvider, TooltipTrigger,Play, Volume2, Maximize,Progress,Popover,PopoverContent,PopoverTrigger,Card,CardDescription,User,Calendar,Alert, AlertDescription, AlertTitle,Avatar, AvatarFallback, AvatarImage,AspectRatio,Key,Home, RadioGroup,Select,Search, Check,ArrowRight,CardFooter,Checkbox,Textarea,SelectItem,SelectValue,SelectContent,SelectTrigger,RadioGroupItem,CardTitle,CardHeader, CardContent, Label, Button, Input,Menubar,
            MenubarContent,
            MenubarItem,
            MenubarMenu,
            MenubarSeparator,
            MenubarShortcut,
            MenubarTrigger,Pause,Volume,Tabs,
            TabsContent,
            TabsList,
            TabsTrigger, 
            DropdownMenu,
            DropdownMenuContent,
            DropdownMenuItem,
            DropdownMenuLabel,
            DropdownMenuSeparator,
            DropdownMenuTrigger,Settings,
            NavigationMenu,
            NavigationMenuContent,
            NavigationMenuIndicator,
            NavigationMenuItem,
            NavigationMenuLink,
            NavigationMenuList,
            NavigationMenuTrigger,
            NavigationMenuViewport,Lock,Separator,Badge,
            Accordion,
            AccordionContent,
            AccordionItem,
            AccordionTrigger,ScrollArea,Save
          }=props;
         const {useState}=React;
         ${extractCode}
       }`}
        </DynamicComponentWithRef>
      </ErrorBoundary>
    </div>
  );
};

export default CanvasArea;
