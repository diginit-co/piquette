"use client";

import { useState } from "react";
import { toast } from "~/hooks/use-toast"

import { FormComponent } from "~/components/common";
import { type FormDefinition } from "~/components/common/Form/form.dt";

import { api } from "~/trpc/react";

interface FavoriteFormProps {
    formConfig: FormDefinition
}

export function ExampleForm({formConfig } : FavoriteFormProps) {
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  


    /**
     * Handle Form Submission
     * 
     * This function is required and is the primary callback sent to the FormComponent.
     * Pass the formConfig object and it will return a key value pair of the form data.
     * 
     * Handle the form data as you see fit.
     * 
     */
    const handleFormSubmit = async (values: unknown) => {
        toast({
            variant: "default",
            title: "Form Submitted",
            description: JSON.stringify(values, null, 2),
        });
    };

  return (
    <FormComponent formConfig={formConfig} onSubmit={handleFormSubmit} />
  );
}
