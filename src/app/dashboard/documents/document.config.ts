import { Label } from "@headlessui/react";
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
const documentForm: FormDefinition = {
  fields: [
    [
      { label: "Name", type: "text", name: "name", required: true, placeholder: "Name Your Document" },
    ],
    [
      {label: "Description", type: "textarea", name: "description", required: true,}
    ],
    [
      {label: "File", type: "file", name: "file", required: true,}
    ]
    
  ],
  buttons: [
    { label: "Save", type: "submit", variant: "default" }
  ],
}

/**
 * Export the exampleConfig object
 */
export const documentConfig = {
    form: documentForm,
    table: tableStructure
}