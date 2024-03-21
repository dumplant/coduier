import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { CodeContext } from "@/context/codeContext";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "@radix-ui/react-label";
import { Plus } from "lucide-react";
import { Input } from "postcss";
import { useContext, useEffect, useState } from "react";
import { getHighlighter, setCDN } from "shiki";
import { db } from "@/lib/db";
import { useParams } from "next/navigation";

const TemplatePanel = () => {
  const templates1 = [
    {
      id: "T01",
      name: "登录注册页面",
      description: "用户登录和注册的页面",
      code: `
import { User, Lock, ArrowRight } from "lucide-react";

const LoginRegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold text-gray-900 mb-4">Login/Register</div>
      <div className="flex flex-col w-80 space-y-4">
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <User className="w-6 h-6 text-gray-600 mr-2" />
          <input type="text" placeholder="Username" className="outline-none flex-1" />
        </div>
        <div className="flex items-center border border-gray-300 rounded-md p-2">
          <Lock className="w-6 h-6 text-gray-600 mr-2" />
          <input type="password" placeholder="Password" className="outline-none flex-1" />
        </div>
        <button className="bg-blue-500 text-white py-2 rounded-md flex items-center justify-center">
          Login <ArrowRight className="w-4 h-4 ml-2" />
        </button>
        <div className="text-sm text-gray-600">Don't have an account? <a href="#">Register</a></div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
`,
    },
    {
      id: "T03",
      name: "列表页模板",
      description: "用于显示一系列相关内容的列表，如博客文章列表，产品列表等。",
      code: `
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, User, Settings } from "lucide-react";

export default function ProductList() {
  return (
    <div className="p-6">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
            <NavigationMenuLink className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all rounded-md">Category 1</NavigationMenuLink>
            <NavigationMenuLink className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all rounded-md">Category 2</NavigationMenuLink>
            <NavigationMenuLink className="block px-4 py-2 text-gray-800 hover:bg-gray-200 transition-all rounded-md">Category 3</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Product 1</CardTitle>
            <CardDescription>Description of product 1</CardDescription>
          </CardHeader>
          <CardContent>
            <img src="https://source.unsplash.com/random/400x400" alt="Product" className="h-48 w-full object-cover" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Product</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product 2</CardTitle>
            <CardDescription>Description of product 2</CardDescription>
          </CardHeader>
          <CardContent>
            <img src="https://source.unsplash.com/random/400x401" alt="Product" className="h-48 w-full object-cover" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Product</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product 3</CardTitle>
            <CardDescription>Description of product 3</CardDescription>
          </CardHeader>
          <CardContent>
            <img src="https://source.unsplash.com/random/400x402" alt="Product" className="h-48 w-full object-cover" />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Product</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
`,
    },
    {
      id: "T04",
      name: "用户主页模板",
      description: "用于显示用户的个人信息，用户的活动，以及与用户相关的内容。",
      code: `
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Home, User, Settings } from "lucide-react";

export default function UserProfile() {
  return (
    <div className="p-6 h-full relative">
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>个人信息</CardTitle>
          </CardHeader>
          <CardContent>
            <Avatar>
              <AvatarImage src="https://source.unsplash.com/random/150x150" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            <p className="mt-4 text-gray-600">姓名：张三</p>
            <p className="text-gray-600">邮箱：zhangsan@example.com</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>活动</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">暂无最近活动。</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>相关内容</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">暂无相关内容。</p>
        </CardContent>
      </Card>
      <div className="absolute bottom-6 right-6">
        <Button variant="outline">
          <Home className="w-6 h-6 mr-1" />
          首页
        </Button>
        <Button variant="outline">
          <User className="w-6 h-6 mr-1" />
          用户
        </Button>
        <Button variant="outline">
          <Settings className="w-6 h-6 mr-1" />
          设置
        </Button>
      </div>
    </div>
  );
}
      `,
    },
    {
      id: "T05",
      name: "404错误页模板",
      description: "当用户访问的页面不存在时显示的页面。",
      code: `
      import { Home } from "lucide-react";

      const NotFoundPage = () => {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-4xl font-bold text-gray-900 mb-4">404 - Page Not Found</div>
            <div className="text-lg text-gray-700 mb-6">The page you are looking for might have been removed or its name changed.</div>
            <Home className="w-12 h-12 text-blue-500" />
          </div>
        );
      };
      
      export default NotFoundPage;`,
    },
  ];
  const { onOpen } = useModal();
  const { code, setCode, isCodeLoading, setSuccess } = useContext(CodeContext);

  return (
    <div className="p-4 ">
      <p className="mb-2">请选择需要的模版</p>
      <div className="grid grid-cols-2 gap-3">
        {templates1.map((c) => {
          return (
            <HoverCard>
              <HoverCardTrigger asChild>
                <div
                  onClick={() => setCode(c.code)}
                  className="w-[100%] p-2 bg-zinc-100 border-zinc-300 shadow rounded-sm hover:cursor-pointer"
                >
                  <div className="text-base">{c.name}</div>
                  <div className="text-sm text-zinc-500">{c.description}</div>
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">模版信息</h4>
                  </div>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <Label htmlFor="height">代码</Label>
                      <Textarea
                        defaultValue={c.code}
                        className="col-span-2 h-40"
                      />
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          );
        })}
      </div>
      <div
        onClick={() => onOpen("createTemplate")}
        className="flex mt-3 h-[48px] w-[100%] rounded-[24px] hover:rounded-[12px] items-center justify-center bg-zinc-100 hover:cursor-pointer"
      >
        <Plus className=" transition text-black" size={25} />
      </div>
    </div>
  );
};

export default TemplatePanel;
