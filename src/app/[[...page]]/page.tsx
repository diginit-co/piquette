import { notFound } from 'next/navigation'; // To handle 404 pages
import { ContentComponent } from '~/components/common';
import { cmsData } from './content';

interface DefaultPageProps {
  params: {
    page?: string[]; // Dynamic path segments from the URL
  };
}

// Define a more specific type for Storyblok's content

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

export default  function DefaultPage({ params }: DefaultPageProps) {
  const slug = params.page ? params.page.join('/') : 'home';
  const page = cmsData.find(page => page.page === slug) as Page;

  // if story is not found, return 404
  if (!page) {
    return notFound();
  }

  return (
    <ContentComponent page={page} />
  )
}

interface PageProps {
  page: {
    page: string;
    name: string;
    description: string;
    sections: {
        component: string;
        content: {
            headline: string;
            description: string;
            buttons: {
                label: string;
                variant: string;
                action: {
                    type: string;
                    href: string;
                };
            }[];
        };
    }[];
  }
  
}