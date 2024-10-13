export default interface FormDefinition {
    headline: string
    description: string
    fields: Field[][]
    buttons: Button[]
}

export interface Field {
    label: string
    type: "text" | "email" | "tel" | "textarea" | "select" | "radio" | "checkbox"
    name: string
    placeholder?: string
    required?: boolean
    options?: string[]
}


export interface Button {
    label: string
    type: "submit" | "reset"
    variant: "default" | "ghost"
}