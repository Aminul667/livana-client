/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

type LivanaFormProps<T extends FieldValues> = {
  schema: ZodType<T, any, any>; // replaces deprecated ZodSchema
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  className?: string;
};

export const LivanaForm = <T extends FieldValues>({
  schema,
  onSubmit,
  children,
  className,
}: LivanaFormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  );
};
