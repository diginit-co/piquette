import { currentUser } from '@clerk/nextjs/server'


import { type Metadata } from "next";

import { HeaderComponent } from '~/components/common';
import { BusinessForm } from '../_components';

import Column from '~/components/templates/column';

export const metadata: Metadata = {
  title: `New Business | Piquette`,
  description: "Generated by Piquette",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default async function NewExamplePage() {
  const user = await currentUser()

  if (!user) return <div>This is an authenticated route</div>

  return (
    <Column>
      
      <HeaderComponent title="Create Business" 
        description="Create a new business"
      />
      
      <BusinessForm  />

    </Column>
  );
}