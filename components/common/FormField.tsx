import { cn } from "@/lib/utils";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type FormFieldProps<T extends FieldValues> = {
  id: Path<T>;
  label?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
};

const FormField = <T extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder,
  disabled,
  register,
  errors,
}: FormFieldProps<T>) => {
  const errorMessage = errors[id]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-black dark:text-neutral-300"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        {...register(id)}
        className={cn(
          "px-3 py-2 border rounded-sm bg-white text-black dark:bg-black dark:text-white placeholder-neutral-800 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white",
          errorMessage
            ? "border-red-500 focus:ring-red-500"
            : "border-black dark:border-neutral-600",
          disabled && "bg-gray-200 dark:bg-gray-800 cursor-not-allowed"
        )}
      />
      {errorMessage && (
        <span className="text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default FormField;
