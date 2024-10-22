"use client"

import { toast } from "~/hooks/use-toast"
import { FormComponent } from '~/components/common'
import {settingsConfig} from '../../dashboard/settings/settings.config'

export default function CancelSettings() {
    const handleFormSubmit = (data: Record<string, unknown>) => {
        toast({
            variant: "destructive",
            title: "Notification Settings Received",
            description: JSON.stringify(data, null, 2),
        });
    }

    return <FormComponent formConfig={settingsConfig.cancelSettings} onSubmit={handleFormSubmit} />
}