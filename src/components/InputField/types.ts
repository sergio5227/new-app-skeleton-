export interface InputFieldProps {
    label?: string
    id: string
    value?: string
    ref?: any
    name: string
    placeholder?: string
    required?: boolean
    autoComplete?: string
    autoFocus?: boolean
    fullWidth?: boolean
    disabled?: boolean
    type: 'text' | 'email' | 'password' | 'hidden' | 'textArea' | 'file' | 'date' | 'color' | 'month' | 'week' | 'time' | 'tel'
    onInput?: (e: any) => void
    formik?: any
    onEdit?: () => void
    info?:string
    tipoInput?:string
}