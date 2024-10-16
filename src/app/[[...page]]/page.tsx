import Link from "next/link";
import { Button } from "~/components/ui/button";
import { notFound } from 'next/navigation'; // To handle 404 pages

// Define the props type for the page
interface DefaultPageProps {
  params: {
    page?: string[]; // Dynamic path segments from the URL
  };
}

// Refined type for Storyblok's content sections
interface ContentComponentProps {
  page: {
    page: string;
    name: string;
    description: string;
    sections: {
      component: "grid" | "hero"; // Restrict to specific component types
      content: {
        headline: string;
        description: string;
        buttons: {
          label: string;
          variant: "default" | "outline" | "ghost" | "link" | "secondary"; // Restrict to specific variant types
          action: {
            type: "link" | "dialog"; // Restrict action type
            href: string;
          };
        }[];
      };
    }[];
  };
}

// This is the default export, which Next.js expects for a page component
export default function DefaultPage({ params }: DefaultPageProps) {
  const slug = params.page ? params.page.join('/') : 'home';
  const page = cmsData.find((page) => page.page === slug) as ContentComponentProps['page'];

  // If page is not found, return 404
  if (!page) {
    return notFound();
  }

  // Render the ContentComponent with the page data
  return (
    <section>
      {page.sections.map((section, idx) => {
        switch (section.component) {
          case 'hero':
            return (
              <HeroComponent
                key={idx}
                fields={{
                  headline: section.content.headline,
                  description: section.content.description,
                  buttons: section.content.buttons.map((button) => ({
                    label: button.label,
                    variant: button.variant,
                    action: {
                      type: button.action.type,
                      href: button.action.href,
                    },
                  })),
                }}
              />
            );
          default:
            return (
              <div key={idx}>
                <strong>Unknown Component: {section.component}</strong>
                <pre>{JSON.stringify(section, null, 2)}</pre>
              </div>
            );
        }
      })}
    </section>
  );
}


// HeroComponent to render hero sections
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
      };
    }[];
  };
};

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
                  target={button.action.href.includes("https://") ? "_blank" : ""}
                >
                  <Button variant={button.variant}>{button.label}</Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Example data structure to simulate CMS data
const cmsData: ContentComponentProps['page'][] = [
  {
    page: 'home',
    name: 'Home Page',
    description: 'This is the home page',
    sections: [
      {
        component: 'hero',
        content: {
          headline: 'Build Tomorrow’s Ideas Today',
          description:
            'Piquette is a low-code development factory that accelerates the creation of high-quality applications for entrepreneurs and developers alike.',
          buttons: [
            {
              label: 'Get Started',
              variant: 'outline',
              action: {
                type: 'link',
                href: 'https://github.com/diginit-co/piquette',
              },
            },
            {
              label: 'Learn More',
              variant: 'default',
              action: {
                type: 'link',
                href: 'https://calendar.app.google/5BhtCHDZ15DBGXhn9',
              },
            },
          ],
        },
      },
    ],
  },
];