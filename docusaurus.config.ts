import {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Shane Woods',
  tagline: 'Senior Technical Writer Portfolio',
  url: 'https://shanewoodsy.github.io',
  baseUrl: '/swtechwr01/', // Matches your repository name exactly for GitHub Pages routing
  onBrokenLinks: 'warn',   // Warns instead of crashing until all files are populated
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ShaneWoodsy',
  projectName: 'swtechwr01',
  deploymentBranch: 'gh-pages',

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts', // Points cleanly to your TypeScript sidebar engine
          routeBasePath: 'docs',        // Directs documentation to live at /docs/
        },
        blog: {
          showReadingTime: true,
          routeBasePath: 'blog',
          path: './blog',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Forces modern dark mode aesthetic by default
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Shane Woods',
      items: [
        {
          // 1) About Me (Your main Markdown landing page mapping to root)
          to: '/',
          label: 'About Me',
          position: 'left',
          exact: true,
        },
        {
          // 2) Expertise Section
          to: '/expertise',
          label: 'Expertise',
          position: 'left',
        },
        {
          // 3) Documentation Samples Portal (Housing your Dane Food API content)
          type: 'docSidebar',
          sidebarId: 'portfolioSidebar',
          position: 'left',
          label: 'Documentation Samples',
        },
        {
          // Your pure Markdown blog system
          to: '/blog',
          label: 'Blog',
          position: 'right'
        },
        {
          href: 'https://github.com/ShaneWoodsy',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Shane Woods. Built with Docusaurus.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;