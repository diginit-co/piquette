import { type Metadata } from "next";

import { HeaderComponent } from '~/components/common';
import Column from '~/components/templates/column';
import { ExampleIndex } from '~/app/_components/services/Example';

export const metadata: Metadata = {
  title: `Examples | Piquette`,
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};




export default function ExamplePage() {
  return (
    <Column>
      <HeaderComponent title="Demo" 
        description="A collection of your demo objects"
        
      />
      <ExampleIndex />
    </Column>  
  )
}
