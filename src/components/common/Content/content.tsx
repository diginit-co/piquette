import Head from 'next/head'
interface ContentComponentProps {
    story: { content?: { body: unknown } }
}

export default function ContentComponent( { story }: ContentComponentProps) {
    const contents = story?.content?.body as Array<{ component: string; text?: string; image?: { url: string; alt: string }; items?: Array<{ text: string }> }>;

    if (!contents) return null;

    return (
        <>
            {contents.length > 0 ? (
                contents.map((item, idx) => {
                    switch (item.component) {
                        case "teaser":
                            return <TeaserComponent key={idx} fields={item} />;
                        default:
                            return <section key={idx}>Unknown Component</section>;
                    }
                })
            ) : (
                <section>No content available</section>
            )}
        </>
    )
};

interface TeaserComponentProps {
    fields: {
        _uuid: string
        headline: string
        description: string
     }
}
function TeaserComponent ({fields} : TeaserComponentProps) {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        {fields.headline}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        {fields.description}
                    </p>
                    {/* <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                        href="#"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Get started
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div> */}
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
    )
}