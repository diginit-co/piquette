"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { toast } from "~/hooks/use-toast";

import { businessConfig } from "../business.config";
import { FormComponent } from "~/components/common";

import { api } from "~/trpc/react";

export function BusinessForm() {
  const router = useRouter(); // Initialize useRouter
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Define the mutation using `useMutation`
  const createBusinessMutation = api.business.create.useMutation({
    onSuccess: async () => {
      toast({
        variant: "default",
        title: "Business Created",
        description: "Your business has been created successfully!",
      });

      // Invalidate queries or perform other actions on success
      try {
        await utils.business.invalidate(); // Await the invalidate query operation
      } catch (invalidateError) {
        console.error("Failed to invalidate cache:", invalidateError);
      }

      // Redirect to the businesses dashboard
      router.push("/dashboard/businesses");
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Failed to Create Business",
        description: err.message,
      });
      setError(err.message);
    },
  });

  /**
   * Handle Form Submission
   * 
   * This function is required and is the primary callback sent to the FormComponent.
   * Pass the formConfig object and it will return a key value pair of the form data.
   * 
   * Handle the form data as you see fit.
   * 
   */
  const handleFormSubmit = async (values: Record<string, unknown>) => {
    setIsLoading(true);
    try {
      await createBusinessMutation.mutateAsync({
        name: values.name as string,
        description: values.description as string,
        location: values.location as string,
        url: values.url as string,
        industry: values.industry as string,
      });
      toast({
        variant: "default",
        title: "Form Submitted",
        description: JSON.stringify(values, null, 2),
      });
    } catch (err) {
      console.error("Error creating business:", err);
      setError("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormComponent formConfig={businessConfig.form} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
  );
}