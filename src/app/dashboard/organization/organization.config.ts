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
const organizationForm: FormDefinition = {
  fields: [
    [
      { label: "Name", type: "text", name: "name", required: true, placeholder: "Enter the name of your organization" },
      { label: "Location", type: "text", name: "location", required: true, placeholder: "City & State" },
      { label: "Website", type: "text", name: "url", required: false },
    ],
    [
      {
        label: "Industry", type: "select", name: "industry", required: false, options: [
          { label: "Retail", value: "retail" },
          { label: "Hospitality", value: "hospitality" },
          { label: "Health Care", value: "healthcare" },
          { label: "Education", value: "education" },
        ],

      },
    ],
    [
      {
        label: "Description", type: "textarea", name: "description", required: true,
        autocomplete: {
          type: "openai",
          mode: "complete",
          prompt: "You are a content writer specializing in media-focused messaging. Craft a concise public description for this business, intended for use on its website. Keep the tone informative and neutral, focusing on describing the organization without including contact details or making it sound like a sales pitch."
        }
      },
    ]
  ],
  buttons: [
    { label: "Save", type: "submit", variant: "default" }
  ],
  forEach: function (arg0: (field: { required: any; name: string | number; }) => void): unknown {
    throw new Error("Function not implemented.");
  }
}

/**
 * Export the exampleConfig object
 */
export const organizationConfig = {
    form: organizationForm,
    table: tableStructure
}