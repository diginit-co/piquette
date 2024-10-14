// import { api, HydrateClient } from "~/trpc/server";

// import Column from "~/components/templates/column";
// export default async function HomePage() {
//   const RestResponse = await api.rest.get(
//     {
//       url: "https://cdn.contentful.com/spaces/3lo7q5ucxiwp/environments/master/entries/1wIAnTvZaIj4KXikSW06rd",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer qXLJSqiXVc7TT-XiIYKMDdHTE77LhbZmTooj3M-shEU",
//       },
//     },
//   );

//   void api.post.getLatest.prefetch();

//   return (
//     <HydrateClient>
//       <Column>
//         {JSON.stringify(RestResponse, null, 2)}
//       </Column>
//     </HydrateClient>
//   );
// }

// app/page.js
import Column from "~/components/templates/column";
import { getStoryblokApi, type ISbStoryData } from "@storyblok/react"; // Ensure types are imported if available

export const metadata = {
  title: "Create Next App",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Home() {
  // Define the slug for the page you are fetching
  const slug = "/landing";
  
  // Set Storyblok API params (typed as const)
  const sbParams = { version: "published" as const };

  // Get Storyblok API
  const storyblokApi = getStoryblokApi();
  
  // Fetch data from Storyblok API
  let story: ISbStoryData | null = null;

  try {
    const response = await storyblokApi.get(`cdn/stories/${slug}`, sbParams);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    story = response?.data?.story || null; // Safely assign the story
  } catch (error) {
    console.error("Error fetching Storyblok data:", error);
  }

  // Render the story or an error message
  return (
    <Column>
      {story ? (
        <pre>{JSON.stringify(story, null, 2)}</pre>
      ) : (
        <p>No story found or failed to fetch the story.</p>
      )}
    </Column>
  );
}