## 项目介绍

使用 Next.js 框架实现的前端代码生成工具

## 运行项目

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## 数据库

prisma 文件夹 存放数据库相关文件，数据库表结构见 schema.prisma

可以运行以下指令 打开数据库图形化界面，查看和编辑数据库

```bash
npx prisma studio
```

## .env 文件配置

需配置以下内容

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

OPENAI_API_KEY=
