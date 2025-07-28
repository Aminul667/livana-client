/* eslint-disable @typescript-eslint/no-explicit-any */
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSelectProps } from "@/types/form.types";
import React from "react";
import { Controller, FieldValues } from "react-hook-form";

const LSelectItem = <T extends FieldValues, TValue = string>({
  registerName,
  control,
  label,
  placeholder = "Select an option",
  options,
  errors,
  parseValue = (val) => val as unknown as TValue,
  className = "space-y-2",
  triggerClass = "w-full",
  labelClass,
  contentClass,
  itemClass,

  disabled = false,
}: FormSelectProps<T, TValue>) => {
  return (
    <Controller
      name={registerName}
      control={control}
      render={({ field }) => (
        <div className={className}>
          <Label htmlFor={registerName} className={labelClass}>
            {label}
          </Label>
          <Select
            disabled={disabled}
            value={field.value !== undefined ? String(field.value) : ""}
            onValueChange={(val) => field.onChange(parseValue(val))}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className={contentClass}>
              {options.map((item, index) => (
                <SelectItem
                  key={index}
                  value={String(item.value)}
                  className={itemClass}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.[registerName] && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors[registerName]?.message)}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default LSelectItem;
