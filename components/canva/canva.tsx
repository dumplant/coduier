"use client";
import DormSelectionForm from "./test";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select as UISelect,
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
import { useEffect, useMemo } from "react";

const DynamicComponentWithRef = dynamic(
  () => import("string-to-react-component"),
  { ssr: false }
);
const Canvas = () => {
  const { code, setCode } = useContext(CodeContext);

  const extractCode = useMemo(() => {}, [code]);
  return (
    <div className="w-[80%] h-[90%] bg-zinc-100">
      <DynamicComponentWithRef
        data={{
          Card,
          CardTitle,
          CardHeader,
          UISelect,
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
        }}
      >
        {`(props)=>{
          const {Card, RadioGroup, CardFooter,Checkbox,Textarea,SelectItem,SelectValue,SelectContent,SelectTrigger,RadioGroupItem,CardTitle,CardHeader, UISelect, CardContent, Label, Button, Input}=props;
         const {useState}=React;
         ${code}
       }`}
      </DynamicComponentWithRef>
    </div>
  );
};

export default Canvas;
