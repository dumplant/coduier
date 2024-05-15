import { parse, print, visit, types } from "recast";
import { generateImports } from "./generateImports";

export function refineCode(code: string) {
  const fromReact = new Set<string>();
  const usedElements = new Set<string>();
  const declarations = new Set<string>();
  const ast = parse(code);

  visit(ast, {
    visitImportDeclaration(p) {
      const isReact =
        p.node.source.type === "Literal" && p.node.source.value === "react";
      if (!isReact) {
        p.replace();
      } else {
        for (const s of p.node.specifiers || []) {
          fromReact.add(s.local?.name.toString() || "");
        }
      }

      this.traverse(p);
    },
  });
  console.log(
    "第一次遍历",
    print(ast).code,
    fromReact,
    usedElements,
    declarations
  );

  visit(ast, {
    visitIdentifier(p) {
      const varName = p.node.name;
      const isDecl = ["VariableDeclarator", "FunctionDeclaration"].includes(
        p.parent?.node.type
      );

      if (isDecl) {
        declarations.add(varName);
      }

      this.traverse(p);
    },
    visitJSXIdentifier(p) {
      const elName = p.node.name;
      if (
        p.parent?.node.type === "JSXOpeningElement" &&
        elName[0].toUpperCase() === elName[0] &&
        !fromReact.has(elName)
      ) {
        usedElements.add(elName);
      }
      this.traverse(p);
    },
  });
  console.log(
    "第二次遍历",
    print(ast).code,
    fromReact,
    usedElements,
    declarations
  );

  const { importStatements, fallbacks } = generateImports(
    Array.from(usedElements),
    declarations
  );
  console.log("调用generate", importStatements, fallbacks);

  visit(ast, {
    visitJSXIdentifier(p) {
      const elName = p.node.name;
      if (
        ["JSXOpeningElement", "JSXClosingElement"].includes(
          p.parent?.node.type
        ) &&
        elName[0].toUpperCase() === elName[0] &&
        !fromReact.has(elName) &&
        fallbacks.includes(elName)
      ) {
        p.replace(types.builders.jsxIdentifier("div"));
      }
      this.traverse(p);
    },
  });
  console.log(
    "第三次遍历",
    print(ast).code,
    fromReact,
    usedElements,
    declarations
  );

  return importStatements + print(ast).code;
}

// export function isJSXElement(p: any, fromReact: Set<string>) {
//   const elName = p.node.name;
//   return (
//     p.parent?.node.type === "JSXOpeningElement" &&
//     elName[0].toUpperCase() === elName[0] &&
//     !fromReact.has(elName)
//   );
// }
