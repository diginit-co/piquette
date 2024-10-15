// interface StoryContent {
//     _uid?: string; // Make this optional
//     body: ComponentType[];
//     component?: string; // Make this optional
//   }
  
//   interface ContentComponentProps {
//     story: {
//       name: string;
//       content: StoryContent;
//     };
//   }
  
//   interface ComponentType {
//     component: 'grid' | 'teaser'
//     _uid: string;
//     headline?: string;
//     description?: string;
//     items?: GridComponentProps['fields']; // Items for the grid component
//   }
  
//   type GridComponentProps = {
//     fields: {
//       _uid: string;
//       headline: string;
//       description: string;
//       url: string;
//       alt: string;
//     }[];
//   };
  
  type TeaserComponentProps = {
    fields: {
      _uid: string;
      headline: string;
      description: string;
    };
  };
  
interface ContentComponentProps {
    name: string;
    uuid: string
    stories: {
        _uid: string;
        body: {
            component: "grid" | "teaser";
            _uid: string;
            headline?: string;
            desciption?: string;
        }[]
    }
}
  export default function ContentComponent({ name, uuid, stories }: ContentComponentProps) {
    // const contents = story?.content?.body;
return (
    <>
        {stories.body.map((section) => {
            switch (section.component) {
                case 'teaser':
                    return <TeaserComponent key={section._uid} fields={{ 
                        _uid: section._uid, 
                        headline: section.headline ?? "", 
                        description: section.desciption ?? "",
                    }} />;
                default:
                    return <section key={section._uid}>Unknown Component<div><pre>{JSON.stringify(section, null, 2)}</pre></div></section>;
            }
        })}
    </>
)
  
    // if (!contents || contents.length === 0) {
    //   return <section>No content available</section>;
    // }
  
    // return (
    //   <>
    //     {contents.map((item) => {
    //       switch (item.component) {
    //         case 'teaser':
    //           return (
    //             <TeaserComponent
    //               key={item._uid}
    //               fields={{
    //                 _uid: item._uid,
    //                 headline: item.headline ?? '',
    //                 description: item.description ?? '',
    //               }}
    //             />
    //           );
    //         case 'grid':
    //           return <GridComponent key={item._uid} fields={item.items ?? []} />;
    //         default:
    //           return <section key={item._uid}>Unknown Component</section>;
    //       }
    //     })}
    //   </>
    // );
    
  }
  
  function TeaserComponent({ fields }: TeaserComponentProps) {
    return (
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {fields.headline}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">{fields.description}</p>
          </div>
        </div>
      </div>
    );
  }
  
//   function GridComponent({ fields }: GridComponentProps) {
//     return (
//       <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//         {fields.map((field) => (
//           <div key={field._uid} className="flex flex-col">
//             <div className="aspect-w-10 aspect-h-6 overflow-hidden rounded-lg bg-gray-900/5 shadow-lg">
//               <img alt={field.alt} src={field.url} className="object-cover object-center" />
//             </div>
//             <h3 className="mt-4 text-sm font-semibold tracking-tight text-gray-900">{field.headline}</h3>
//             <p className="mt-3 text-base text-gray-500">{field.description}</p>
//           </div>
//         ))}
//       </div>
//     );
//   }