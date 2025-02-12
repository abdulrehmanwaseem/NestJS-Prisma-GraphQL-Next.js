import { clsx, ClassValue } from "clsx";
import { ClientError } from "graphql-request";
import { twMerge } from "tailwind-merge";
import { ParsedError } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseGraphQLError = (
  name: string,
  stack: string | undefined,
  response: ClientError["response"] | undefined
): ParsedError => {
  if (
    !response ||
    !Array.isArray(response.errors) ||
    response.errors.length === 0
  ) {
    return {
      name,
      message: "Unknown error",
      statusCode: 500,
      error: "Unknown",
      stack: stack || "",
    };
  }

  const firstError = response.errors[0];
  const firstPath =
    Array.isArray(firstError.path) && firstError.path.length > 0
      ? String(firstError.path[0])
      : undefined;

  const ext = (firstError?.extensions?.originalError ?? {}) as {
    message?: string;
    statusCode?: number;
    error?: string;
  };
  const { message = "", statusCode = 500, error = "" } = ext;
  return {
    name,
    path: firstPath,
    message,
    statusCode,
    error,
    stack,
  };
};
