import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  portfolioSidebar: [
    {
      type: 'category',
      label: 'Dane Food API (v1.0.0)',
      collapsible: false, // Keeps sidebar open like a real portal dashboard
      items: [
        'REST-APIS/Dane-Food-API/1.0.0/overview',
        'REST-APIS/Dane-Food-API/1.0.0/authentication',
        'REST-APIS/Dane-Food-API/1.0.0/make-call',
        'REST-APIS/Dane-Food-API/1.0.0/use-cases',
        'REST-APIS/Dane-Food-API/1.0.0/workflows',
        'REST-APIS/Dane-Food-API/1.0.0/expectations',
        'REST-APIS/Dane-Food-API/1.0.0/best-practices',
        'REST-APIS/Dane-Food-API/1.0.0/glossary',
        'REST-APIS/Dane-Food-API/1.0.0/code-samples',
      ],
    },
  ],
};

export default sidebars;