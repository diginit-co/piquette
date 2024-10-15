
import { getStoryblokApi } from '~/lib/storyblok'; // Helper to initialize Storyblok API
import { notFound } from 'next/navigation'; // To handle 404 pages
import { ContentComponent } from '~/components/common';

interface PageProps {
  params: {
    page?: string[]; // Dynamic path segments from the URL
  };
}

// Define the expected structure of the Storyblok response
interface StoryblokResponse {
  story: {
    // Define expected fields in the story; adjust based on your schema
    content: any; 
    [key: string]: any; // Indexer if you have dynamic fields
  } | null;
}

export default async function Page({ params }: PageProps) {
  const slug = params.page ? params.page.join('/') : 'home';

  const storyblokApi = getStoryblokApi();

  try {
    // Fetch the story from Storyblok
    const response = await storyblokApi.get(`cdn/stories/${slug}`, { version: 'published' as const });
    const storyData: StoryblokResponse = response.data;

    const story = storyData.story; // This should now have clearer typing

    if (!story) {
      return notFound();
    }

    return (
      <ContentComponent story={story} />
    );
  } catch (error) {
    console.error('Error fetching Storyblok story:', error);
    return notFound();
  }
}