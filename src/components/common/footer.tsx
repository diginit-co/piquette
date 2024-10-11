

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
  
  export interface Newsletter {
    display: boolean
    title: string
    description: string
    placeholder: string
    button: string
  }
  export interface Social {
    name: string
    href: string
  }

  export interface Link {
    label: string
    href: string
  }
    
  export interface Column {
    header: string
    links: Link[]
  }
  interface FooterComponentProps {
    newsletter: Newsletter
    columns: Column[]
    social: []
  }

  export default function FooterComponent({ newsletter, columns, social }: FooterComponentProps) {
    return (
      <footer aria-labelledby="footer-heading" className="bg-gray-900">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 xl:col-span-2">
                    {columns.map((column, idx) => (
                        <div key={idx}>
                            <h3 className="text-sm font-semibold leading-6 text-white">{column.header}</h3>
                            <ul role="list" className="mt-6 space-y-4">
                                {column.links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-8 lg:px-8">
          <div className="xl:grid xl:grid-cols-4 xl:gap-8">
            
            { newsletter.display && (
                <div className="mt-10 xl:mt-0">
                    <h3 className="text-sm font-semibold leading-6 text-white">Subscribe to our newsletter</h3>
                    <p className="mt-2 text-sm leading-6 text-gray-300">
                        The latest news, articles, and resources, sent to your inbox weekly.
                    </p>
                    <form className="mt-6 sm:flex sm:max-w-md">
                        <label htmlFor="email-address" className="sr-only">
                        Email address
                        </label>
                        <input
                        id="email-address"
                        name="email-address"
                        type="email"
                        required
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                        />
                        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                        <button
                            type="submit"
                            className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Subscribe
                        </button>
                        </div>
                    </form>
                </div>
            )}
          </div>
          <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
            <div className="flex space-x-6 md:order-2">
              {social.map((item: { id: string; href: string; name: string; }, idx) => (
                <a key={idx} href={item.href} className="text-gray-500 hover:text-gray-400">
                  <span className="sr-only">{item.name}</span>
                  {/* <item.icon aria-hidden="true" className="h-6 w-6" /> */}
                </a>
              ))}
            </div>
            <p className="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
              &copy; {new Date().getFullYear()} Your Company, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }
  