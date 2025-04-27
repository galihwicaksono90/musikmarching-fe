import type { Icon as IconType } from '@lucide/svelte'
import CircleUser from "@lucide/svelte/icons/circle-user";
import {
  PUBLIC_GOOGLE_LOGOUT_URL,
} from "$env/static/public";
import ShoppingCart from "@lucide/svelte/icons/shopping-cart";
import Music from "@lucide/svelte/icons/music";
import Package from "@lucide/svelte/icons/package";
import Settings from "@lucide/svelte/icons/settings";

export type LoggedInLayoutItem = {
  href: string
  title: string
  icon: typeof IconType
  disabled?: boolean
  isVisible?: boolean
  description?: string
}

export type LoggedInLayoutMenuSeparator = {
  type: 'separator',
}

export type LoggedInLayoutMenuLabel = {
  type: 'label',
  title: string
  icon?: typeof IconType
}

export type LoggedInLayoutMenuLink = {
  type: 'link',
  href: string
  title: string
  icon?: typeof IconType
  disabled?: boolean
  isVisible?: boolean
}

export type LoggedInLayoutProps = {
  header: string
  title: string
  description: string
  items: LoggedInLayoutItem[]
  menuItems: (LoggedInLayoutMenuLink | LoggedInLayoutMenuSeparator | LoggedInLayoutMenuLabel)[],
}

export const profileLayoutData: LoggedInLayoutProps = {
  header: 'Music Marching',
  title: 'My Account',
  description: 'Manage your account settings and purchased music scores.',
  items: [
    {
      href: '/profile/library',
      title: 'Koleksi',
      icon: Music,
    },
    {
      href: '/profile/purchases',
      title: 'Transaksi',
      icon: Package,
    },
    {
      href: '/profile/settings',
      title: 'Pengaturan',
      icon: Settings,
    },
  ],
  menuItems: [
    { type: 'label', title: "My Account" },
    { type: 'separator' },
    {
      type: 'link',
      href: '/profile',
      title: 'Profil',
      icon: Package,
    },
    {
      type: 'link',
      href: '/contributor',
      title: 'Kontributor',
      icon: Settings,
    },
    { type: 'separator' },
    {
      type: 'link',
      href: PUBLIC_GOOGLE_LOGOUT_URL,
      title: 'Logout',
      icon: Settings,
    },
  ]
}

export const contributorLayoutData: LoggedInLayoutProps = {
  header: 'Contributor',
  title: 'Contributor Dashboard',
  description: 'Manage your music scores and track your sales performance.',
  items: [
    {
      title: "Overview",
      href: "/contributor/dashboard",
      icon: CircleUser,
    },
    {
      title: "Scores",
      href: "/contributor/score",
      icon: ShoppingCart,
      description: 'hello'
    },
    {
      title: "Payments",
      href: "/contributor/payments",
      icon: ShoppingCart,
    },
  ],
  menuItems: [
    { type: 'label', title: "My Account" },
    { type: 'separator' },
    {
      type: 'link',
      href: '/profile',
      title: 'Profil',
      icon: Package,
    },
    {
      type: 'link',
      href: '/contributor',
      title: 'Kontributor',
      icon: Settings,
    },
    { type: 'separator' },
    {
      type: 'link',
      href: PUBLIC_GOOGLE_LOGOUT_URL,
      title: 'Logout',
      icon: Settings,
    },
  ]
};

export const adminLayoutData: LoggedInLayoutProps = {
  header: 'Admin',
  title: 'Admin Dashboard',
  description: 'Manage your music scores and track your sales performance.',
  items: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: CircleUser,
    },
    {
      title: "Scores",
      href: "/admin/scores",
      icon: ShoppingCart,
    },
    {
      title: "Contributor",
      href: "/admin/contributor",
      icon: ShoppingCart,
    },
    {
      title: "Purchases",
      href: "/admin/purchases",
      icon: ShoppingCart,
    },
  ],
  menuItems: []
};
