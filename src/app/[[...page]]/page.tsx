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
  // Define properties according to your content structure
  data?: any; // Replace 'any' with the actual structure of your content
  [key: string]: any; // Allows additional properties, if necessary
}

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const builderModelName = "page";

  // Safely handle the promise and ensure the content is of type `BuilderContent | null`
  const content: BuilderContent | null = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath: "/" + (props?.params?.page?.join("/") ?? ""),
      },
    })
    .promise() // `.toPromise()` has been updated to `.promise()` in newer versions of Builder SDK.

  return (
    <div>
      {/* Render the content, or provide a fallback for undefined */}
      <RenderBuilderContent content={content ?? undefined} model={builderModelName} />
    </div>
  );
}