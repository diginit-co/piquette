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
  body: Array<{
    component: string;
    _uid: string;
    headline?: string; // Optional, since not every component will have this
    description?: string; // Optional, same reason
    items?: Array<{
      _uid: string;
      headline: string;
      description: string;
      url: string;
      alt: string;
    }>; // If there's a grid component with items
  }>;
}

// Define the expected structure of the Storyblok response
interface StoryblokResponse {
  story: {
    content: StoryContent;
    name: string;
    [key: string]: unknown; // Indexer if you have dynamic fields
  } | null;
}

export default async function Page({ params }: PageProps) {
  const slug = params.page ? params.page.join('/') : 'home';
  const storyblokApi = getStoryblokApi();

  try {
    const response = await storyblokApi.get(`cdn/stories/${slug}`, { version: 'published' as const });
    const storyData = response.data as StoryblokResponse;

    const story = storyData.story;


    if (!story) {
      return notFound();
    }

    // Ensure the story.content has required properties
    const storyContent: StoryContent = {
      body: story.content.body,
    };

    return <ContentComponent story={{ name: story.name, content: storyContent }} />;
  } catch (error) {
    console.error('Error fetching Storyblok story:', error);
    return notFound();
  }
}