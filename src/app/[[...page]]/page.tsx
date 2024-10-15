
import { piquetteConfig } from "~/config";
import { getStoryblokApi } from '~/lib/storyblok'; // Helper to initialize Storyblok API
import { notFound } from 'next/navigation'; // To handle 404 pages
import { ContentComponent } from '~/components/common';

interface PageProps {
  params: {
    page?: string[]; // Dynamic path segments from the URL
  };
}


export default async function Page({ params }: PageProps) {
  const slug = params.page ? params.page.join('/') : 'home'; // Default to 'home' if no path is provided
  
  // const sbParams = {
  //   version: 'published', // You can change this to 'draft' if needed for preview mode
  // };

  const storyblokApi = getStoryblokApi();

  try {
    // Fetch the story from Storyblok
    const response = await storyblokApi.get(`cdn/stories/${slug}`, { version: 'published' as const });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const story = response.data?.story ? response.data.story : null;

    

    // If no story is found, show a 404 page
    if (!story) {
      return notFound();
    }

    // Return the story content to be displayed
    return (
      <ContentComponent story={story} />
    );
  } catch (error) {
    // Handle errors and log them to the console
    console.error('Error fetching Storyblok story:', error);
    return notFound(); // Return 404 page if something goes wrong
  }
}