import {
    ArchiveBoxXMarkIcon,
    StarIcon,
    ShareIcon,
    HandThumbUpIcon,
    HandThumbDownIcon,
    FolderIcon,
    SparklesIcon as ChatIcon,
} from '@heroicons/react/24/outline'

import {
    Home as HomeIcon,
    Building as BusinessIcon,
    Building2 as OrganizationIcon,
    FolderIcon as DocumentsIcon,
    Pin
} from "lucide-react"

export const piquetteConfig = {
    meta: {
        id: 'piquette',
        title: 'Piquette',
        description: 'Piquette is a free and open-source platform for creating and managing your own Pikette database.',
    },
    navbar: {
        display: true,
        links: [
            { id: 'about', label: 'About', href: '/about' },
            { id: 'contact', label: 'Contact', href: '/contact' },
            { id: 'blog', label: 'Blog', href: '/blog' },
            { id: 'faq', label: 'FAQ', href: '/faq' },
        ]
    },
    footer: {
        display: true,
        newsletter: {
            display: false,
            title: 'Subscribe to our newsletter',
            description: 'The latest news, articles, and resources, sent to your inbox weekly.',
            placeholder: 'Enter your email',
            button: 'Subscribe'
        },
        social: [
            {
                id: 'github',
                name: 'GitHub',
                href: 'https://github.com/notbrooks/piquette',
            },
        ],
        columns: [
            { 
                header: "Solutions", links: [
                    { label: 'Marketing', href: '#' },
                    { label: 'Analytics', href: '#' },
                    { label: 'Commerce', href: '#' },
                    { label: 'Insights', href: '#' },
                ],
            },
            { 
                header: "Support", links: [
                    { label: 'Pricing', href: '#' },
                    { label: 'Documentation', href: '#' },
                    { label: 'Guides', href: '#' },
                    { label: 'API Status', href: '#' },
                ],
            },
            { 
                header: "Company", links: [
                    { label: 'About', href: '#' },
                    { label: 'Blog', href: '#' },
                    { label: 'Jobs', href: '#' },
                    { label: 'Press', href: '#' },
                    { label: 'Partners', href: '#' },
                ],
            },
            { 
                header: "Legal", links: [
                    { label: 'Claim', href: '#' },
                    { label: 'Privacy', href: '#' },
                    { label: 'Terms', href: '#' },
                ],
            },
        ]

    },
    app: {
        features: [
            {id: 'mockup', label: 'Mockup', href: '/dashboard', icon: HomeIcon},
            {id: 'businesses', label: 'Businesses', href: '/dashboard/businesses', icon: BusinessIcon},
            {id: 'organizations', label: 'Organizations', href: '/dashboard/organizations', icon: OrganizationIcon},
            {id: 'documents', label: 'Documents', href: '/dashboard/documents', icon: DocumentsIcon},
            {id: 'assistant', label: 'Assistant', href: '/dashboard/assistant', icon: ChatIcon},
        ],
        services: [
            {id: 'pinned', label: 'Pinned', href: '/dashboard/services/pinned', icon: Pin},
            {id: 'favorites', label: 'Favorites', href: '/dashboard/services/favorites', icon: StarIcon},
            {id: 'saved', label: 'Saved', href: '/dashboard/services/saved', icon: FolderIcon},
            {id: 'likes', label: 'Liked', href: '/dashboard/services/liked', icon: HandThumbUpIcon},
            {id: 'dislikes', label: 'Disliked', href: '/dashboard/services/disliked', icon: HandThumbDownIcon},
            {id: 'archive', label: 'Archived', href: '/dashboard/services/archived', icon: ArchiveBoxXMarkIcon},
            {id: 'shared', label: 'Shared', href: '/dashboard/services/shared', icon: ShareIcon},
        ],
    }
}