import "~/styles/globals.css";
import React from "react";


import { piquetteConfig } from "~/config";

import { NavbarComponent, FooterComponent} from "~/components/common";
import { type Column, type Newsletter } from "~/components/common/footer";


export default function PageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
    {piquetteConfig.navbar.display && <NavbarComponent links={piquetteConfig.navbar.links} />}
    <main className="flex min-h-screen flex-col">
      {children}  
    </main>
    { piquetteConfig.footer.display && 
        <FooterComponent 
          newsletter={piquetteConfig.footer.newsletter as Newsletter} 
          columns={piquetteConfig.footer.columns as unknown as Column[]} 
          social={piquetteConfig.footer.social as unknown as []} 
        />
      }
    </>
  );
}
