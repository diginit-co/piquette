export default interface FormDefinition {
    headline?: string
    description?: string
    fields: Field[][]
    buttons: Button[]
}

export interface Field {
    label: string
    type: "text" | "email" | "tel" | "textarea" | "select" | "radio" | "checkbox" | "switch"
    name: string
    placeholder?: string
    description?: string
    required?: boolean
    options?: Option[]
    autocomplete?: Autocomplete
}


export interface Button {
    label: string
    type: "submit" | "reset"
    variant: "default" | "ghost" | "destructive"
}

type Option = {
    label: string
    value: string
}

type Autocomplete = {
    type: "openai"
    mode: "prompt" | "complete"
    prompt?: string
}

