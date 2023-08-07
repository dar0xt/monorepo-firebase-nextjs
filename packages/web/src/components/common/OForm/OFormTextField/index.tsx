import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form"
import { OTextField, OTextFieldProps } from "../../OTextField"

export type OFormTextField<T extends FieldValues> = {
  name: Path<T>
  formInstance: UseFormReturn<T>
} & OTextFieldProps

export const OFormTextField = <T extends FieldValues>({
  name,
  formInstance,
  ...rest
}: OFormTextField<T>) => {
  return (
    <Controller
      name={name}
      control={formInstance.control}
      render={({ field, fieldState: { error } }) => (
        <OTextField
          {...field}
          error={!!error}
          helperText={error?.message}
          {...rest}
        />
      )}
    />
  )
}
