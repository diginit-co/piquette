"use client"
import {toast} from "~/hooks/use-toast"

import { FormComponent } from '~/components/common'
import {settingsConfig} from '../../dashboard/settings/settings.config'

export default function PersonalSettings() {
    const handleFormSubmit = (data: Record<string, unknown>) => {
        toast({
            variant: "default",
            title: "Personal Settings Received",
            description: JSON.stringify(data, null, 2),
        });
    }

    return <FormComponent formConfig={settingsConfig.personalSettings} onSubmit={handleFormSubmit} />
}