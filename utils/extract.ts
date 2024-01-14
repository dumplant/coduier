export function extractLastBracesContent(str: string) {
  console.log("str", str);
  let stack = [];
  let lastLeft = -1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "{") {
      stack.push(i);
    }
    if (str[i] === "}") {
      lastLeft = stack[stack.length - 1];
      stack.pop();
    }
  }
  let lastRight = str.lastIndexOf("}");
  let result = str.slice(lastLeft + 1, lastRight);
  console.log("result", result);
  return result;
}

export function extractCodeBlock(str: string) {
  const pattern = /```(\w+)?\n([\s\S]+?)\n```/g;
  let matches = pattern.exec(str);

  if (!matches) {
    return;
  }
  const codeBlock = matches[2];

  return codeBlock;
}
