import { getStoryblokApi } from '~/lib/storyblok'; // Helper to initialize Storyblok API
import { notFound } from 'next/navigation'; // To handle 404 pages
import { ContentComponent } from '~/components/common';

interface PageProps {
  params: {
    page?: string[]; // Dynamic path segments from the URL
  };
}

// Define a more specific type for Storyblok's content
interface StoryContent {
  _uid: string;
  body: Array<{
      _uid: string;
      component: 'grid' | 'teaser';
      headline?: string;
      description?: string;
  }>;
  component: string;
}

interface StoryblokResponse {
  story: {
  name: string;
  created_at: string;
  published_at: string;
  id: number;
  uuid: string;
  content: StoryContent;
  slug: string;
  full_slug: string;
  sort_by_date: null | string;
  position: number;
  tag_list: Array<string>;
  is_startpage: boolean;
  parent_id: number;
  group_id: string;
  first_published_at: string;
  release_id: null | string;
  lang: string;
  path: null | string;
  default_full_slug: null | string;
  translated_slugs: null | string;
}
}

export default async function Page({ params }: PageProps) {
  const slug = params.page ? params.page.join('/') : 'home';
  const storyblokApi = getStoryblokApi();

  try {
    const response = await storyblokApi.get(`cdn/stories/${slug}`, { version: 'published' as const });
    const storyData = response.data as StoryblokResponse;

    if (!storyData) {
      return notFound();
    }

    const stories = storyData.story.content;
    const name = storyData.story.name;
    const uuid = storyData.story.uuid;

    return <ContentComponent name={name} uuid={uuid} stories={stories} />;
        
    } catch (error) {
        console.error('Error fetching Storyblok story:', error);
        return notFound();
    }
}