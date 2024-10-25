
import { currentUser } from '@clerk/nextjs/server'


import { type Metadata } from "next";

import { HeaderComponent } from '~/components/common';
import Column from '~/components/templates/column';
import AssistantComponent from './_components/assistant'


export const metadata: Metadata = {
  title: `Assistant | Piquette`,
  description: "Manufactured by Piquette",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function AssistantPage() {
  const user = await currentUser()


  if (!user) return <div>This is an authenticated route</div>

  return (
    <Column>
      <HeaderComponent
        title="Assistant"
        />
      
      <AssistantComponent />

    </Column>
  );
}
