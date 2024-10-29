import { currentUser } from '@clerk/nextjs/server'
import { type Metadata } from "next";

import { HeaderComponent } from '~/components/common';
import Column from '~/components/templates/column';
import { DocumentIndex } from './_documents';

export const metadata: Metadata = {
  title: `Documents | Piquette`,
  description: "Generated by Piquette",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};




export default async function BusinessesPage() {

  const user = await currentUser()

  if (!user) return <div>This is an authenticated route</div>

  return (
    <Column>
      <HeaderComponent title="Documents" 
        description="Document starter"
        actions={[
          {label: "New Document", type: "link", href: "/dashboard/documents/new"},
        ]}
      />
      <DocumentIndex userId={user.id} />
    
    </Column>  
  )
}
