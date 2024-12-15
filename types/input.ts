type TInputFieldProps = {
  id: string
  label: string
  type: string
  value: string
  placeholder?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export type {TInputFieldProps}
