import type { ChangeEvent, RefObject as Ref, FormEvent } from "react";

type InnerRef<T> = { innerRef?: Ref<T> };
type Regrex = { isRegrex?: boolean };
type Validation = { isValid?: boolean };
type LightMode = { isLightMode?: boolean };
type OnChange<T> = { onChange: (event: ChangeEvent<T>) => void };
type Placeholder = { placeholder?: string };
type Value<T> = { value?: T };
type DefaultValue<T> = { defaultValue?: T };
type Required = { required?: boolean };

export type EventTargetNameValue = {
  target: {
    name: string;
    value: string | File;
  };
};

export type EventTargetFileValue = {
  target: {
    name: string;
    files: FileList;
  };
};

interface LabelProps {
  label?: string;
  name: string;
}

interface FieldProps<E, F, V>
  extends LabelProps,
    Placeholder,
    Regrex,
    Validation,
    Required,
    LightMode,
    OnChange<E>,
    InnerRef<E>,
    DefaultValue<V>,
    Value<V> {
  fieldType: F;
}

export interface InputProps
  extends FieldProps<HTMLInputElement, "input", string> {
  type: "text" | "password" | "email" | "file" | "url";
}

export interface TextareaProps
  extends FieldProps<HTMLTextAreaElement, "textarea", string> {
  cols?: number;
  rows?: number;
}

export type { ChangeEvent, FormEvent };
