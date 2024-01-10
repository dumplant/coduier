"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ apiUrl, query, name, type }: ChatInputProps) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query,
      });

      await axios.post(url, values);

      form.reset();
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="p-4 pb-6 mt-10">
                  <div className="flex items-center justify-between mb-2">
                    <button
                      type="button"
                      onClick={() => onOpen("messageFile", { apiUrl, query })}
                      className="h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 transition rounded-full p-1 flex items-center justify-center"
                    >
                      <Plus className="text-white " />
                    </button>
                    <Button
                      onClick={() => onOpen("messageFile", { apiUrl, query })}
                      variant={"secondary"}
                      className="p-2 h-8"
                    >
                      发送
                    </Button>
                  </div>
                  <Textarea
                    disabled={isLoading}
                    placeholder="请输入对页面的需求"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
