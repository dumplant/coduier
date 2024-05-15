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
  Edit,
  Trash,
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { refineCode } from "@/utils/refineCode";

const DynamicComponentWithRef = dynamic(
  () => import("string-to-react-component"),
  { ssr: false }
);
const CanvasArea = () => {
  const { code, setCode, success, setSuccess } = useContext(CodeContext);

  const extractCode = useMemo(() => {
    let refined = refineCode(code);
    let result = extractLastBracesContent(refined);
    setSuccess(true);
    return result;
  }, [code]);

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
            Edit,
            Trash,
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
            Table,
            TableBody,
            TableCaption,
            TableCell,
            TableHeader,
            TableHead,
            TableRow,
            Dialog,
            DialogContent,
            DialogDescription,
            DialogHeader,
            DialogTitle,
            DialogTrigger,
            AlertDialog,
            AlertDialogAction,
            AlertDialogCancel,
            AlertDialogContent,
            AlertDialogDescription,
            AlertDialogFooter,
            AlertDialogHeader,
            AlertDialogTitle,
            AlertDialogTrigger,
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
            AccordionTrigger,ScrollArea,Save,
            Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,Edit,Trash,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
