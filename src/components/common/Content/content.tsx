import Head from 'next/head';

interface ContentComponentProps {
  story: { content?: { body: ComponentType[] } };
}

interface ComponentType {
  component: string;
  _uid: string;
  [key: string]: any; // To account for dynamic fields in Storyblok components
}

export default function ContentComponent({ story }: ContentComponentProps) {
  const contents = story?.content?.body;

  if (!contents) return null;

  return (
    <>
      {contents.length > 0 ? (
        contents.map((item, idx) => {
          switch (item.component) {
            case 'teaser':
              return <TeaserComponent key={item._uid} fields={{ _uid: item._uid, headline: item.headline, description: item.description }} />;
            case 'grid':
              return <GridComponent key={item._uid} fields={item.items} />;
            default:
              return <section key={item._uid}>Unknown Component</section>;
          }
        })
      ) : (
        <section>No content available</section>
      )}
    </>
  );
}

interface TeaserComponentProps {
  fields: {
    _uid: string;
    headline: string;
    description: string;
  };
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
        <div className="mt-16 flow-root sm:mt-24">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <img
              alt="App screenshot"
              src="https://tailwindui.com/plus/img/component-images/project-app-screenshot.png"
              width={2432}
              height={1442}
              className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface GridComponentProps {
  fields: {
    _uid: string;
    headline: string;
    description: string;
    url: string;
    alt: string;
  }[];
}

function GridComponent({ fields }: GridComponentProps) {
  return (
    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {fields.map((field) => (
        <div key={field._uid} className="flex flex-col">
          <div className="aspect-w-10 aspect-h-6 overflow-hidden rounded-lg bg-gray-900/5 shadow-lg">
            <img alt={field.alt} src={field.url} className="object-cover object-center" />
          </div>
          <h3 className="mt-4 text-sm font-semibold tracking-tight text-gray-900">{field.headline}</h3>
          <p className="mt-3 text-base text-gray-500">{field.description}</p>
        </div>
      ))}
    </div>
  );
}