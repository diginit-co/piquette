import { type Metadata } from "next";
import { HeaderComponent } from '~/components/common';
import Column from '~/components/templates/column';

import { assistantConfig } from './assistant.config';
import { AssistantComponent } from '~/components/common/Assistant';


export const metadata: Metadata = {
  title: `Assistant | Piquette`,
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};




export default function AssistantPage() {
  return (
    <Column>
      <HeaderComponent title="Assistant" 
        description="Assistant example"
        
      />
      
      <AssistantComponent assistantId={assistantConfig.assistantId} />
    
    </Column>  
  )
}
