import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
  Control,
} from "react-hook-form";

export interface InputFieldProps<T extends FieldValues = FieldValues> {
  registerName: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClass?: string;
  labelClass?: string;
  isDisabled?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// Option type
export interface Option<T = string> {
  label: string;
  value: T;
}

// Component props
export interface FormSelectProps<T extends FieldValues, TValue = string> {
  registerName: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  parseValue?: (val: string) => TValue;
  className?: string;
  labelClass?: string;
  triggerClass?: string;
  contentClass?: string;
  itemClass?: string;
  disabled?: boolean;
}
