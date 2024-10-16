export  const cmsData = [
    {
        page: 'home',
        name: 'Home',
        description: 'This is the home page',
        sections: [
            {
                component: 'hero',
                content: {
                    headline: 'Build Tomorrow’s Ideas Today',
                    description: 'Piquette is a low-code development factory that accelerates the creation of high-quality applications for entrepreneurs and developers alike.',
                    buttons: [
                        {label: "Get Started", variant: "outline", action: {
                            type: "link",
                            href: "https://github.com/diginit-co/piquette"
                        } },
                        {label: "Learn More", variant: "default", action: {
                            type: "link",
                            href: "https://calendar.app.google/5BhtCHDZ15DBGXhn9"
                        }}

                    ]
                }
                
            },
        ]
    }
]