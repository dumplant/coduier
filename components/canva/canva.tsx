"use client";
import DormSelectionForm from "./test";
import { Check, ArrowRight, Search, User } from "lucide-react";
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

const DynamicComponentWithRef = dynamic(
  () => import("string-to-react-component"),
  { ssr: false }
);
const Canvas = () => {
  const { code, setCode, success, setSuccess } = useContext(CodeContext);

  const extractCode = useMemo(() => {
    const result = extractLastBracesContent(code);
    setSuccess(true);
    return result;
  }, [code]);
  console.log(extractCode);
  return (
    <div className="w-[80%] h-[90%] border-8 border-gray-300 rounded-lg overflow-y-scroll	">
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
          }}
        >
          {`(props)=>{
          const {Card,User, RadioGroup,Select,Search, Check,ArrowRight,CardFooter,Checkbox,Textarea,SelectItem,SelectValue,SelectContent,SelectTrigger,RadioGroupItem,CardTitle,CardHeader, CardContent, Label, Button, Input}=props;
         const {useState}=React;
         ${extractCode}
       }`}
        </DynamicComponentWithRef>
      </ErrorBoundary>
    </div>
  );
};

export default Canvas;
