import { Function, StackContext } from "sst/constructs";

export function API({ stack }: StackContext) {
  const nestLambda = new Function(stack, "NestLambda", {
    runtime: "container",
    handler: "packages/application",
    url: true,
  });

  stack.addOutputs({
    NestLambdaUrl: nestLambda.url,
  });
}
