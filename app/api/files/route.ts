import { refineCode } from "@/utils/refineCode";
import axios from "axios";
import fs from "fs";
import JSZip from "jszip";
import path from "path";
export default async function ExportCode(req, res) {
  const { projectId } = req.query;
  const pages = await axios.get(`/api/pages?projectId=${projectId}`);
  // console.log(pages

  // 创建一个zip文件
  const zip = new JSZip();
  // 读取public目录下的文件资源
  const publicFolder = fs.readFileSync(
    path.join(__dirname, "public", "my-next-app.zip")
  );
  // 加载这个文件资源到zip对象中
  const loadedZip = await JSZip.loadAsync(publicFolder);
  // 获取app文件夹
  const appFolder = loadedZip.folder("app");
  // 遍历所有页面
  const pagePromises = pages.data.map(async (page: any) => {
    // 获得页面的代码
    const code = await axios.get(`/api/messages?pageId=${page.id}`);
    console.log(code.data);
    // 在'app'文件夹下创建一个文件夹，文件夹的名称为页面的名称
    const folder = appFolder!.folder(page.name);
    // 在文件夹中创建一个名为page.tsx的文件，内容为页面的代码
    folder!.file("page.tsx", code.data[0]?.response);
  });

  await Promise.all(pagePromises);

  // 将zip文件下载到本地
  const content = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "pages.zip";
  a.click();
  URL.revokeObjectURL(url);
}
