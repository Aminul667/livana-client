"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormCheckboxProps } from "@/types/form.types";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";

const LCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  icon,
  errors,
  labelClass = "",
  containerClass = "",
  checkboxClass = "",
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`flex items-center space-x-2 ${containerClass}`}>
          <Checkbox
            id={name}
            checked={field.value ?? false}
            onCheckedChange={field.onChange}
            className={checkboxClass}
          />
          <Label htmlFor={name} className={labelClass}>
            {icon && <span className="mr-2">{icon}</span>}
            {label}
          </Label>
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors[name]?.message)}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default LCheckbox;
