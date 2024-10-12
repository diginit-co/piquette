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

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

// Define the expected content structure
interface BuilderContent {
  data?: {
    title?: string;
    description?: string;
    // Add other known fields here
  };
  [key: string]: unknown; // Allows for additional fields with unknown types
}

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const builderModelName = "page";

  // Fetch the content from Builder.io and ensure it has the correct type
  const content: BuilderContent | null = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath: "/" + (props?.params?.page?.join("/") ?? ""),
      },
    })
    .promise() as BuilderContent | null; // Explicitly cast the result to BuilderContent

  // Check if content exists and has data, safely
  if (content && content.data) {
    const { title, description } = content.data;

    // Here you can handle the content data if needed
    console.log("Page Title:", title);
    console.log("Page Description:", description);
  }

  return (
    <div>
      {/* Safely render the content */}
      <RenderBuilderContent content={content ?? undefined} model={builderModelName} />
    </div>
  );
}