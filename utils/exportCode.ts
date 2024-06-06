import axios from "axios";
import JSZip from "jszip";
import { refineCode } from "./refineCode";

export async function exportCode(projectId: string) {
  // 获得项目的所有页面
  const pages = await axios.get(`/api/pages?projectId=${projectId}`);
  // 读取public目录下的zip文件资源my-next-app.zip
  const publicFolder = (await fetch("/my-next-app.zip")).clone();
  const publicFolderBlob = await publicFolder.blob();
  const publicFolderArrayBuffer = await publicFolderBlob.arrayBuffer();
  const publicFolderBuffer = Buffer.from(publicFolderArrayBuffer);
  const loadedZip = await JSZip.loadAsync(publicFolderBuffer);
  console.log(loadedZip);
  // 获取app文件夹
  const appFolder = loadedZip.folder("my-next-app")?.folder("app");
  // 遍历所有页面
  const pagePromises = pages.data.map(async (page: any) => {
    // 在'app'文件夹下创建一个文件夹，文件夹的名称为页面的名称
    const folder = appFolder?.folder(
      page.nameEN.toLocaleLowerCase().replace(/\s/g, "-")
    );
    // 在文件夹中创建一个名为page.tsx的文件，内容为页面的代码
    folder?.file("page.jsx", page.code);
  });

  await Promise.all(pagePromises);

  // 将zip文件下载到本地
  const content = await loadedZip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "project.zip";
  a.click();
  URL.revokeObjectURL(url);
}
