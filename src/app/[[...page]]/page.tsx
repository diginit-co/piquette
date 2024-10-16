import { notFound } from 'next/navigation'; // To handle 404 pages
import { ContentComponent } from '~/components/common';

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

export default function DefaultPage({ params }: DefaultPageProps) {
  const slug = params.page ? params.page.join('/') : 'home';
  const page = cmsData.find((page) => page.page === slug) as ContentComponentProps['page'];

  // if page is not found, return 404
  if (!page) {
    return notFound();
  }

  return <ContentComponent page={page} />;
}

// Assuming cmsData follows this structure
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
            description: 'Piquette is a low-code development factory that accelerates the creation of high-quality applications for entrepreneurs and developers alike.',
            buttons: [
                {label: "Get Started", variant: "outline", action: {
                    type: "link",
                    href: "https://github.com/diginit-co/piquette"
                } },
                {label: "Learn More", variant: "default", action: {
                    type: "link",
                    href: "https://calendar.app.google/5BhtCHDZ15DBGXhn9"
                }}

            ]
        }
        
    },
      // {
      //   component: 'grid',
      //   content: {
      //     headline: 'Our Services',
      //     description: 'Check out what we offer.',
      //     buttons: [
      //       {
      //         label: 'Contact Us',
      //         variant: 'outline',
      //         action: {
      //           type: 'link',
      //           href: '/contact',
      //         },
      //       },
      //     ],
      //   },
      // },
    ],
  },
];