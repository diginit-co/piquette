"use client"
import { FormComponent } from '~/components/common'
import {settingsConfig} from '../../dashboard/settings/settings.config'

export default function NotificationSettings() {
    const handleFormSubmit = (data: Record<string, unknown>) => {
        console.log(data)
    }

    return <FormComponent formConfig={settingsConfig.notificationsSettings} onSubmit={handleFormSubmit} />
}