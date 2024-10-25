import {
    type FormDefinition,
    type TableDefinition
} from "~/components/common";



/**
 * Table Structure
 */
const tableStructure: TableDefinition = {
    bulkActions: [
        { label: "Delete", type: "link", href: "/dashboard/-example/new" },
        { label: "Archive", type: "link", href: "/dashboard/-example/new"},
    ],
    filter: true,
    columns: [
        { label: "ID", accessorKey: "id", type: "text", required: true },
        
        { label: "Status", accessorKey: "status", type: "text", required: true },
        { label: "Amount", accessorKey: "amount", type: "tel", required: true },
        { label: "Email", accessorKey: "email", type: "email", required: true },
        
    ]
}

/**
 * Form Structure
 */
const organizationForm: FormDefinition = {
  headline: "New Organization",
  description: "Create a new organization",
  fields: [
    [
      { label: "First Name", type: "text", name: "firstName", required: true },
      { label: "Last Name", type: "text", name: "lastName", required: true },
      { label: "Phone", type: "text", name: "phone", required: true },
    ],
    [
      { label: "Description", type: "textarea", name: "description", required: true, autocomplete: { type: "openai", mode: "complete" } },
    ]
  ],
  buttons: [
    { label: "Cancel", type: "reset", variant: "ghost" },
    { label: "Submit", type: "submit", variant: "default" }
  ]
}

/**
 * Export the exampleConfig object
 */
export const organizationConfig = {
    form: organizationForm,
    table: tableStructure
}