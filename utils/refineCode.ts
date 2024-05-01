import { parse, print, visit, types } from "recast";
import { generateImports } from "./generateImports";

export function refineCode(code: string) {
  const fromReact = new Set<string>();
  const usedVariables = new Set<string>();
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
      const elName = p.node.name;
      if (
        p.parent?.node.type === "JSXOpeningElement" &&
        elName[0].toUpperCase() === elName[0] &&
        !fromReact.has(elName)
      ) {
        usedVariables.add(elName);
      }
      this.traverse(p);
    },
  });

  const { importStatements, fallbacks } = generateImports(
    Array.from(usedVariables),
    declarations
  );

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

  return importStatements + print(ast).code;
}
