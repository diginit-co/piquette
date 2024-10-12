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

interface PageProps {
  params: {
    page: string[];
  };
}

export default async function Page(props: PageProps) {
  const builderModelName = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <div>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </div>
  );
}
