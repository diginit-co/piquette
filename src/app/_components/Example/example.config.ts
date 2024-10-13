import { type FormDefinition } from "~/components/common";



const formStructure: FormDefinition = {
  headline: "Favorite Form",
  description: "This is an example of how to manually create a form",
  fields: [
    [
      { label: "First Name", type: "text", name: "firstName", required: true },
      { label: "Last Name", type: "text", name: "lastName", required: true },
      { label: "Phone", type: "text", name: "phone", required: true },
    ],
    [
      { label: "Description", type: "textarea", name: "description", required: true },
    ]
  ],
  buttons: [
    { label: "Cancel", type: "reset", variant: "ghost" },
    { label: "Submit", type: "submit", variant: "default" }
  ]
}

export const exampleConfig = {
    form: formStructure  // Assign formStructure here
  }