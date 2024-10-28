"use client"
import { useState } from "react"
import {toast} from "~/hooks/use-toast"

import { FormComponent } from '~/components/common'
import {settingsConfig} from '../../dashboard/settings/settings.config'

export default function PersonalSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = (data: Record<string, unknown>) => {
        toast({
            variant: "default",
            title: "Personal Settings Received",
            description: JSON.stringify(data, null, 2),
        });
    }

    return <FormComponent formConfig={settingsConfig.personalSettings} onSubmit={handleFormSubmit} isFormLoading={isLoading} />
}