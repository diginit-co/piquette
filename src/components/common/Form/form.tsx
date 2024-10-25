/**
 * ************************************************************************************************
 *   _____                     ____                                             _   
 *  |  ___|__  _ __ _ __ ___  / ___|___  _ __ ___  _ __   ___  _ __   ___ _ __ | |_ 
 *  | |_ / _ \| '__| '_ ` _ \| |   / _ \| '_ ` _ \| '_ \ / _ \| '_ \ / _ \ '_ \| __|
 *  |  _| (_) | |  | | | | | | |__| (_) | | | | | | |_) | (_) | | | |  __/ | | | |_ 
 *  |_|  \___/|_|  |_| |_| |_|\____\___/|_| |_| |_| .__/ \___/|_| |_|\___|_| |_|\__|
 *                                                |_|                               
 * ************************************************************************************************
 * @author Brooke Dixon
 * @version 1.0.0
 * @copyright 2024 Digital Initiatives, Inc.
 * @license MIT
 * ************************************************************************************************
 * ************************************************************************************************
 * 
 * 
 */
"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { SparklesIcon as ChatIcon } from "@heroicons/react/24/outline";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import type { FormDefinition } from "~/components/common";

interface FormComponentProps {
  object?: string;
  type?: string;
  formConfig: FormDefinition;
  onSubmit: (data: Record<string, unknown>) => void;
}

export default function FormComponent({ onSubmit, formConfig }: FormComponentProps) {
  const [stateValue, setStateValue] = useState<Record<string, unknown>>({});
  const form = useForm({
    defaultValues: {
      // Initialize with default values based on the formConfig
      ...Object.fromEntries(
        formConfig.fields.flat().map((field) => [
          field.name,
          field.type === "checkbox" ? [] : "",
        ])
      ),
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  // Update the field values in state on blur or change
  const handleFieldChange = (name: string, value: unknown) => {
    setStateValue((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutocomplete = async (fieldName: string) => {
    // Capture current stateValue from useState
    const formValues = stateValue;
  
    try {
      const response = await fetch("/api/openai/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: formValues })
      });
      
      const data = await response.json();
      if (data.content) {
        // Update the specific field with the generated content
        setStateValue((prev) => ({
          ...prev,
          [fieldName]: data.content
        }));
        form.setFieldValue(fieldName, data.content); // Changed from setValue to setFieldValue
      }
    } catch (error) {
      console.error("Failed to autocomplete:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      className="p-5 space-y-6 border bg-white border-gray-900/10 rounded-lg shadow-sm"
    >
      {formConfig.headline && (
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          {formConfig.headline}
        </h2>
      )}
      {formConfig.description && (
        <p className="mt-1 text-sm leading-6 text-gray-600">
          {formConfig.description}
        </p>
      )}

      {formConfig.fields?.map((row, idx) => {
        const columns =
          row.length === 1
            ? "md:grid-cols-1"
            : row.length === 2
            ? "md:grid-cols-2"
            : "md:grid-cols-3 sm:grid-cols-1";

        return (
          <div key={idx} className={`grid ${columns} gap-4`}>
            {row.map((col, idx) => (
              <div key={idx} className="w-full">
                <Label
                  htmlFor={col.name}
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  {col.label}
                </Label>
                <div className="mt-2">
                  {(() => {
                    switch (col.type) {
                      case "text":
                      case "email":
                      case "tel":
                        return (
                          <form.Field name={col.name}>
                            {(field) => (
                              <Input
                                value={field.state.value}
                                onBlur={(e) =>
                                  handleFieldChange(col.name, e.target.value)
                                }
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                              />
                            )}
                          </form.Field>
                        );
                      case "textarea":
                        return (
                          <div className="space-y-4">
                            <form.Field name={col.name}>
                              {(field) => (
                                <Textarea
                                value={
                                  stateValue[col.name] !== undefined
                                    ? String(stateValue[col.name])
                                    : Array.isArray(field.state.value)
                                    ? field.state.value.join("")
                                    : field.state.value
                                }
                                onBlur={(e) => handleFieldChange(col.name, e.target.value)}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6 min-h-[125px]"
                              />
                              )}
                            </form.Field>
                            {col.autocomplete && (
                              <div className="flex justify-end cursor-pointer">
                                <div
                                  className="flex items-center justify-center space-x-1 bg-white px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out"
                                  onClick={() => handleAutocomplete(col.name)}
                                >
                                  <ChatIcon className="w-4 h-4 text-blue-400 hover:text-blue-500" />
                                  <span className="text-sm font-medium">
                                    Autocomplete with AI
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      case "select":
                        return (
                          <form.Field name={col.name}>
                            {(field) => (
                              <Select
                                value={
                                  Array.isArray(field.state.value)
                                    ? field.state.value.join("")
                                    : field.state.value
                                }
                                onValueChange={(value) =>
                                  field.handleChange(value)
                                }
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue placeholder={col.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    {col.options?.map((option, idx) => (
                                      <SelectItem key={idx} value={option.value}>
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            )}
                          </form.Field>
                        );
                      default:
                        return <>Unknown</>;
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>
        );
      })}

      <div className="mt-6 pt-5 flex items-center justify-end gap-x-6 border-t border-gray-900/10">
        {formConfig.buttons.map((button, idx) => (
          <Button
            key={idx}
            type={button.type}
            variant={button.variant}
            onClick={
              button.type === "reset" ? () => form.reset() : undefined
            }
          >
            {button.label}
          </Button>
        ))}
      </div>
    </form>
  );
}