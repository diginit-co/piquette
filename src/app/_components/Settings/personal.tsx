"use client"
import { FormComponent } from '~/components/common'
import {settingsConfig} from '../../dashboard/settings/settings.config'

export default function PersonalSettings() {
    const handleFormSubmit = (data: Record<string, unknown>) => {
        console.log(data)
    }

    return <FormComponent formConfig={settingsConfig.personalSettings} onSubmit={handleFormSubmit} />
}