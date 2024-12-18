"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { api } from "~/trpc/react";
import { useProfileContext } from "~/context/profile-context";
import { toast } from "~/hooks/use-toast";

import { documentConfig } from "../document.config";
import { FormComponent } from "~/components/common";




export function DocumentForm() {
  const router = useRouter(); // Initialize useRouter
  const utils = api.useUtils();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { myProfile } = useProfileContext();

  // Define the mutation using `useMutation`
  const createDocumentMutation = api.document.create.useMutation({
    onSuccess: async () => {
      toast({
        variant: "default",
        title: "Document Created",
        description: "Your document has been created successfully!",
      });

      // Invalidate queries or perform other actions on success
      try {
        await utils.business.invalidate(); // Await the invalidate query operation
      } catch (invalidateError) {
        console.error("Failed to invalidate cache:", invalidateError);
      }

      // Redirect to the businesses dashboard
      setTimeout(() => {
        router.push("/dashboard/documents");
      }, 1000);
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Failed to Create Document",
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

  interface FileUploadResponse {
    fileUrl: string;
  }

  const handleFormSubmit = async (values: Record<string, unknown>) => {
    setIsLoading(true);
    try {
      let fileUrl: string | undefined;
  
      if (values.file) {
        const selectedFile = values.file as File;
        console.log(`Selected file: ${selectedFile.name}`);
        const formData = new FormData();
        formData.append("file", selectedFile);
  
        const response = await fetch("/api/aws", {
          method: "POST",
          body: formData,
          headers: {
            "x-original-filename": selectedFile.name,
          },
        });
  
        if (response.ok) {
          const data = await response.json() as FileUploadResponse; // Removed type assertion
          fileUrl = data.fileUrl;
        } else {
          throw new Error("File upload failed");
        }
  
        if (!myProfile?.id) {
          throw new Error("Profile not found");
        }

        await createDocumentMutation.mutateAsync({
          owner: myProfile.id,
          name: values.name as string,
          description: values.description as string,
          url: fileUrl, // Removed non-null assertion
          type: selectedFile.type,
        });
      }
    } catch (err) {
      console.error("Error creating document:", err);
      setError("An error occurred while submitting the form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormComponent formConfig={documentConfig.form} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
  );
}