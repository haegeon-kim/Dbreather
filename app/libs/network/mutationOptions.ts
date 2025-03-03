import type { UseMutationOptions } from "@tanstack/react-query";

export default function mutationOptions<
  TError = CustomError,
  TData = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationOptions<TData, TError, TVariables, TContext> {
  return options;
}
