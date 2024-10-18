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

import { useForm } from '@tanstack/react-form'


import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from '~/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectTrigger,
  SelectValue,
 } from '~/components/ui/select'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Checkbox } from "~/components/ui/checkbox"
import type {FormDefinition} from '~/components/common'

type FormValue = string | string[] | undefined;

interface FormComponentProps {
  object?: string
  type?: string
  formConfig: FormDefinition;
  onSubmit: (data: Record<string, unknown>) => void;
}

export default function FormComponent( {onSubmit, formConfig }: FormComponentProps) {
  const form = useForm({
    defaultValues: {
      // get all of the field names from the formConfig
      ...Object.fromEntries(formConfig.fields.flat().map((field) => [field.name, field.type === 'checkbox' ? [] : ''])),
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  })

  return (
      <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
          className="p-5 space-y-6 border bg-white border-gray-900/10 rounded-lg shadow-sm"
        >
      
        {formConfig.headline && <h2 className="text-base font-semibold leading-7 text-gray-900">{formConfig.headline}</h2>}
        {formConfig.description && <p className="mt-1 text-sm leading-6 text-gray-600">{formConfig.description}</p>}

        {formConfig.fields?.map((row, idx) => {
          // Dynamically calculate the number of columns based on the number of fields in the row
          const columns = row.length === 1 ? 'md:grid-cols-1' : row.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3 sm:grid-cols-1';

          return (
            <div key={idx} className={`grid ${columns} gap-4`}> {/* ROW */}
              {row.map((col, idx) => (
                <div key={idx} className="w-full"> {/* FIELD */}
                  <Label htmlFor={col.name} className="block text-sm font-medium leading-6 text-gray-900">
                    {col.label}
                  </Label>
                  <div className="mt-2">
                    
                    {
                      (() => {
                        switch (col.type) {
                          case "text":
                          case "email":
                          case "tel":
                            return (
                              <form.Field name={col.name}>
                                {(field) => (
                                  <Input
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  />
                                )}
                              </form.Field>
                            );
                          case "textarea":
                            return (
                              <form.Field name={col.name}>
                                {(field) => (
                                  <Textarea
                                    value={Array.isArray(field.state.value) ? field.state.value.join('') : field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                                  />
                                )}
                              </form.Field>
                            )
                          case "select":
                            return (
                              <form.Field name={col.name}>
                                {(field) => (
                                  <Select
                                    value={Array.isArray(field.state.value) ? field.state.value.join('') : field.state.value}
                                    onValueChange={(value) => field.handleChange(value)}
                                  >
                                    <SelectTrigger className="w-[180px]">
                                      <SelectValue placeholder={col.placeholder}></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        {col.options?.map((option, idx) => (
                                          <SelectItem key={idx} value={option}>
                                            {option}
                                          </SelectItem>
                                        ))}
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              </form.Field>
                            )
                          case "radio":
                            return (
                              <form.Field name={col.name}>
                                {(field) => (
                                  <RadioGroup defaultValue={col.options ? col.options[0] : ''} onValueChange={(value) => field.handleChange(value)}>
                                    {col.options?.map((option, idx) => (
                                      <div key={idx} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option} id={option} />
                                        <Label htmlFor={option}>{option}</Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                )}
                              </form.Field>
                            )
                          // case "checkbox":
                          //   return (
                          //   <form.Field name={col.name}>
                          //     {(field) => (
                          //       <ul className="space-y-2">
                          //         {col.options?.map((option, idx) => (
                          //           <li key={idx} className="flex items-center space-x-2">
                          //             <Checkbox
                          //               id={`${idx}`}
                          //               checked={Array.isArray(field.state.value) ? field.state.value.includes(option) : false} // Ensure the correct checking behavior
                          //               onCheckedChange={(checked) => {
                          //                 field.handleChange((prevValue: FormValue) => {
                          //                   const currentValue = Array.isArray(prevValue) ? prevValue : [];
                          //                   if (checked) {
                          //                     return [...currentValue, option]; // Add the option if checked
                          //                   } else {
                          //                     return currentValue.filter((value) => value !== option); // Remove the option if unchecked
                          //                   }
                          //                 });
                          //               }}
                          //             />
                          //             <Label htmlFor={`${idx}`} className="ml-2">{option}</Label>
                          //           </li>
                          //         ))}
                          //       </ul>
                          //     )}
                          //   </form.Field>
                          //   )
                          default:
                            return <>Unknown</>;
                        }
                      })()
                    }
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
              onClick={button.type === 'reset' ? () => { form.reset(); } : undefined}
            >
              {button.label}
            </Button>
          ))}
        </div>
      
    </form>
  )
}