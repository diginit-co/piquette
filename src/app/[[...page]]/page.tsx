import { getStoryblokApi } from '~/lib/storyblok'; // Helper to initialize Storyblok API
import { notFound } from 'next/navigation'; // To handle 404 pages

interface PageProps {
  params: {
    page?: string[]; // Dynamic path segments from the URL
  };
}

export default async function Page({ params }: PageProps) {
  const slug = params.page ? params.page.join('/') : 'home'; // Default to 'home' if no path is provided

  const sbParams = {
    version: 'published', // You can change this to 'draft' if needed for preview mode
  };

  const storyblokApi = getStoryblokApi();


  try {
    // Fetch the story from Storyblok
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    const story = data?.story || null;

    // If no story is found, show a 404 page
    if (!story) {
      return notFound();
    }

    // Return the story content to be displayed
    return (
      <div>
        <pre>{JSON.stringify(story.content, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    // Handle errors and log them to the console
    console.error('Error fetching Storyblok story:', error);
    return notFound(); // Return 404 page if something goes wrong
  }
}