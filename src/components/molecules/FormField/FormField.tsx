import { useField } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel";
  placeholder?: string;
  required?: boolean;
};

export function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required = false,
}: FormFieldProps) {
  const [field, meta] = useField(name);
  const hasError = meta.touched && Boolean(meta.error);
  const errorId = `${name}-error`;

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        className={cn(
          hasError && "border-destructive focus-visible:ring-destructive/40",
        )}
        {...field}
      />
      {hasError && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {meta.error}
        </p>
      )}
    </div>
  );
}
