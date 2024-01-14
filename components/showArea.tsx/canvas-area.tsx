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

  console.log(extractCode);
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
          }}
        >
          {`(props)=>{
          const {PlayCircle,Fullscreen,Slider,Tooltip,TooltipContent,TooltipProvider, TooltipTrigger,Play, Volume2, Maximize,Progress,Popover,PopoverContent,PopoverTrigger,Card,CardDescription,User,Calendar,Alert, AlertDescription, AlertTitle,Avatar, AvatarFallback, AvatarImage,AspectRatio,Key,Home, RadioGroup,Select,Search, Check,ArrowRight,CardFooter,Checkbox,Textarea,SelectItem,SelectValue,SelectContent,SelectTrigger,RadioGroupItem,CardTitle,CardHeader, CardContent, Label, Button, Input,Menubar,
            MenubarContent,
            MenubarItem,
            MenubarMenu,
            MenubarSeparator,
            MenubarShortcut,
            MenubarTrigger,Pause,Volume}=props;
         const {useState}=React;
         ${extractCode}
       }`}
        </DynamicComponentWithRef>
      </ErrorBoundary>
    </div>
  );
};

export default CanvasArea;
