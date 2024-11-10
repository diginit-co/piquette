import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import { Button } from "~/components/ui/button";
import { notFound } from 'next/navigation';

// Define Button and common Action type
interface Action {
  type: "link" | "dialog";
  href: string;
}

interface Button {
  label: string;
  variant: "default" | "outline" | "ghost" | "link" | "secondary";
  action: Action;
}

// Base structure for a Section, common for all types
interface BaseSection {
  headline?: string;
  description?: string;
  body?: string; // For markdown content
  buttons?: Button[];
}

// Specific Section Types
interface ContentSection extends BaseSection {
  type: "content";
}

interface ColumnsSection extends BaseSection {
  type: "columns";
  columns: BaseSection[];
}

// Other types like 'grid' and 'hero' can be added similarly
interface GridSection extends BaseSection {
  type: "grid";
}

interface HeroSection extends BaseSection {
  type: "hero";
}

// Union of all section types
type Section = ContentSection | ColumnsSection | GridSection | HeroSection;

// Page Interface
interface Page {
  page: string;
  name: string;
  description: string;
  sections: Section[];
}

// Props for the DefaultPage component
interface DefaultPageProps {
  params: Promise<{ page?: string[] }>;
}

// Example CMS data
const cmsData: Page[] = [
  {
    page: 'home',
    name: 'Home Page',
    description: 'This is the home page',
    sections: [
      {
        type: 'content',
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
    ],
  },
];

// DefaultPage Component
export default async function DefaultPage({ params }: DefaultPageProps) {
  // Resolve the promise for `params` here
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.page) ? resolvedParams.page.join('/') : 'home';
  const page = cmsData.find((page) => page.page === slug);

  if (!page) return notFound();

  return (
    <section>
      {page.sections.map((section, idx) => {
        switch (section.type) {
          case 'content':
            return <ContentSectionComponent key={idx} fields={section} />;
          case 'columns':
            return <ColumnsSectionComponent key={idx} columns={section.columns} />;
          default:
            return <div key={idx}><strong>Unknown Component: {section.type}</strong></div>;
        }
      })}
    </section>
  );
}

// ContentSection Component
function ContentSectionComponent({ fields }: { fields: ContentSection }) {
  return (
    <div className="bg-white container mx-auto">
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
          {fields.body && (
            <ReactMarkdown className="mt-6 text-lg leading-8 text-gray-600 max-w-prose">
              {fields.body}
            </ReactMarkdown>
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

// ColumnsSection Component
function ColumnsSectionComponent({ columns }: { columns: BaseSection[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 container border mx-auto">
      {columns.map((column, idx) => (
        <div key={idx} className="p-4">
          {column.headline && <h3 className="font-bold">{column.headline}</h3>}
          {column.description && <p>{column.description}</p>}
        </div>
      ))}
    </div>
  );
}