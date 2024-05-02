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
      if (isJSXElement(p, fromReact)) {
        usedElements.add(p.node.name);
      }
      this.traverse(p);
    },
  });

  const { importStatements, fallbacks } = generateImports(
    Array.from(usedElements),
    declarations
  );

  visit(ast, {
    visitJSXIdentifier(p) {
      if (isJSXElement(p, fromReact) && fallbacks.includes(p.node.name)) {
        p.replace(types.builders.jsxIdentifier("div"));
      }
      this.traverse(p);
    },
  });

  return importStatements + print(ast).code;
}

function isJSXElement(p: any, fromReact: Set<string>) {
  const elName = p.node.name;
  return (
    p.parent?.node.type === "JSXOpeningElement" &&
    elName[0].toUpperCase() === elName[0] &&
    !fromReact.has(elName)
  );
}
