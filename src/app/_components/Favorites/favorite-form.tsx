"use client";

import { toast } from "~/hooks/use-toast"

import { FormComponent, type FormDefinition } from "~/components/common";

import { api } from "~/trpc/react";

interface FavoriteFormProps {
  userId: string
  setDialogOpen?: (open: boolean) => void; // Add this line
}
export function FavoriteForm({ userId, setDialogOpen }: FavoriteFormProps) {
  const utils = api.useUtils();
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  
  

  const createFavorite = api.favorite.create.useMutation({
    onSuccess: async () => {
      await utils.favorite.invalidate();
      
      setDialogOpen?.(false); // Close the dialog here
      
      toast({
        variant: "default",
        title: "Your favorite has been created",
      });

    },
  });

  const handleFormSubmit = (data: Record<string, unknown>) => {
    void createFavorite.mutateAsync({
      type: data.type as string,
      object: data.object as string,
      createdBy: "Brooke", 
      updatedBy: "Brooke",
    });
  };

  const formConfig: FormDefinition = {
    headline: "Favorite Form",
    description: "This is an example of how to manually create a form",
    fields: [
      [
        {label: "Type", type: "text", name: "type", required: true},
      ],
      [
        {label: "Object", type: "text", name: "object", required: true},
      ]
    ],
    buttons: [
      {label: "Cancel", type: "reset", variant: "ghost"},
      {label: "Submit", type: "submit", variant: "default"}
    ],
  }
  return (
    <FormComponent formConfig={formConfig} onSubmit={handleFormSubmit} />
  );
}
