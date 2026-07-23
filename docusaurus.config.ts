import {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

let apiVersion = '1.0.0';
try {
  const specPath = path.join(__dirname, 'docs/REST-APIS/Dane-Food-API/1.0.0/spec.yaml');
  const fileContents = fs.readFileSync(specPath, 'utf8');
  const spec = yaml.load(fileContents) as { info?: { version?: string } };

  if (spec?.info?.version) {
    apiVersion = spec.info.version;
  }
} catch (e) {
  console.error("Could not parse API version from spec.yaml, falling back to baseline default.", e);
}
const currentBuildDate = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

const config: Config = {
  title: 'Shane Woods',
  tagline: 'Senior Technical Writer Portfolio',
  url: 'https://shanewoodsy.github.io',
  baseUrl: process.env.NETLIFY ? '/' : '/swtechwr01/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ShaneWoodsy',
  projectName: 'swtechwr01',
  deploymentBranch: 'gh-pages',

  customFields: {
    currentApiVersion: apiVersion,
    lastUpdatedDate: currentBuildDate,
  },

  markdown: {
    mermaid: true,
  },

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
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
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Shane Woods',
      items: [
        {
          to: '/',
          label: 'About Me',
          position: 'left',
          exact: true,
        },
        {
          type: 'docSidebar',
          sidebarId: 'portfolioSidebar',
          position: 'left',
          label: 'API Reference',
        },
        {
          to: '/case-studies',
          label: 'Case Studies',
          position: 'left',
        },
        {
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