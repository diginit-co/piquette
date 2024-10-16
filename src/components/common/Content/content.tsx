import Link from "next/link";
import { Button } from "~/components/ui/button";
  
interface ContentComponentProps {
    page: {
        page: string;
        name: string;
        description: string;
        sections: {
            component: "grid" | "hero";
            content: {
                headline: string;
                description: string;
                buttons: {
                    label: string;
                    variant: "default" | "outline" | "ghost" | "link" | "secondary";
                    action: {
                        type: "link" | "dialog";
                        href: string;
                    };
                }[];
            }
        }[]
    };
}
export default function ContentComponent({ page }: ContentComponentProps) {
  return (
    <section>
      {page.sections.map((section, idx) => {
          switch (section.component) {
              case 'hero':
                console.log(section.component)
                  return <HeroComponent key={idx} fields={{ 
                      headline: section.content.headline, 
                      description: section.content.description, 
                      buttons: section.content.buttons.map(button => ({ 
                          label: button.label, 
                          variant: button.variant,
                          action: { 
                               // Default variant or adjust accordingly
                              type: button.action.type, // Default type or adjust accordingly
                              href: button.action.href, // Default href or adjust accordingly
                          } 
                      })) 
                  }} />;
              default:
                  return (
                    <div>
                        <strong>Unknown Component: {section.component}</strong>
                        <pre>{JSON.stringify(section, null, 2)}</pre>
                    </div>
                  );
          }
      })}
    </section>
  )
}

type HeroComponentProps = {
  fields: {
    headline?: string;
    description?: string;
    buttons?: {
      label: string;
      variant: "default" | "outline" | "ghost" | "link" | "secondary";
      action: {
        type: "link" | "dialog";
        href: string;
      }
    }[];
  };
}
function HeroComponent({ fields }: HeroComponentProps) {
  return (
    <div className="bg-white">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          
          {fields.headline && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {fields.headline}
            </h2>
          )}


          {fields.description && (
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              {fields.description}
            </p>
          )}

          {fields.buttons && (
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {fields.buttons.map((button, idx) => (
                <Link
                  key={idx}
                  href={button.action.href}
                  // if href contains https:// set target="_blank"
                  target={button.action.href.includes("https://") ? "_blank" : ""}
                >
                  <Button
                    variant={button.variant}
                  >
                    {button.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}