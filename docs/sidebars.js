/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

function sidebarHeader(name) {
  return `<div class="mt-4" style="font-size: 0.8em; font-weight: 700; padding: 0.4em 0 0.4em 0.4em; background-color: #00000005;">${name}</div>`;
}

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    { id: 'intro', label: 'Introduction', type: 'doc' },
    { id: 'quickstart', label: 'Quickstart', type: 'doc' },

    // section
    {
      type: 'html',
      value: sidebarHeader('Connectors'),
    },
    {
      label: 'Providers',
      type: 'category',
      link: {
        title: 'Providers',
        description: 'Providers',
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'providers',
        },
      ],
    },
    {
      label: 'Destinations',
      type: 'category',
      link: {
        title: 'Destinations',
        description: 'Destinations',
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'destinations',
        },
      ],
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Integration Patterns'),
    },
    {
      id: 'integration-patterns/overview',
      label: 'Overview',
      type: 'doc',
    },
    {
      id: 'integration-patterns/managed-syncs',
      label: 'Managed syncs (reads)',
      type: 'doc',
    },
    {
      id: 'integration-patterns/actions-api',
      label: 'Writing data',
      type: 'doc',
    },
    {
      id: 'integration-patterns/real-time-events',
      label: 'Triggers/CDC',
      type: 'doc',
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Platform'),
    },
    {
      id: 'platform/overview',
      label: 'Overview',
      type: 'doc',
    },
    {
      id: 'platform/managed-auth',
      label: 'Managed authentication',
      type: 'doc',
    },
    {
      id: 'platform/objects/overview',
      label: 'Objects',
      type: 'doc',
    },
    {
      id: 'platform/passthrough',
      label: 'Passthrough API',
      type: 'doc',
    },
    {
      id: 'platform/notification-webhooks',
      label: 'Notification webhooks',
      type: 'doc',
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Tutorials'),
    },
    {
      id: 'use-cases/overview',
      label: 'Overview',
      type: 'doc',
    },
    {
      id: 'tutorials/listen-for-webhooks',
      label: 'Listen for webhooks',
      type: 'doc',
    },
    {
      id: 'tutorials/read-write-contacts',
      label: 'Read/write contacts',
      type: 'doc',
    },
    {
      id: 'tutorials/build-integration-card',
      label: 'Build an integration card',
      type: 'doc',
    },
    {
      id: 'tutorials/build-settings-page',
      label: 'Build a settings page',
      type: 'doc',
    },
    {
      label: 'Transformations',
      type: 'category',
      link: {
        title: 'Transformations',
        description: 'Transformations',
        type: 'generated-index',
      },
      items: [
        {
          id: 'tutorials/transformations/overview',
          type: 'doc',
          label: 'Overview',
        },
        {
          id: 'tutorials/transformations/pagination',
          type: 'doc',
          label: 'Pagination',
        },
        {
          id: 'tutorials/transformations/common-schema',
          type: 'doc',
          label: 'Common schema',
        },
        {
          id: 'tutorials/transformations/normalized-relations',
          type: 'doc',
          label: 'Normalized relations',
        },
        {
          id: 'tutorials/transformations/object-field-mapping',
          type: 'doc',
          label: 'Object and field mapping',
        },
        {
          id: 'tutorials/transformations/value-mapping',
          type: 'doc',
          label: 'Value mapping',
        },
        {
          id: 'tutorials/transformations/date-time-conversion',
          type: 'doc',
          label: 'Date time conversion',
        },
      ],
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Recipes'),
    },
    {
      id: 'recipes/overview',
      label: 'Overview',
      type: 'doc',
    },
    {
      id: 'recipes/nextjs-prisma',
      label: 'Nextjs + Prisma',
      type: 'doc',
    },
    {
      id: 'recipes/nextjs-inngest',
      label: 'Nextjs + Inngest',
      type: 'doc',
    },
    {
      id: 'recipes/nextjs-triggerdev',
      label: 'Nextjs + Trigger.dev',
      type: 'doc',
    },
    {
      id: 'recipes/nextjs-render',
      label: 'Nextjs + Render',
      type: 'doc',
    },
    {
      id: 'recipes/expressjs-temporal',
      label: 'Expressjs + Temporal',
      type: 'doc',
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Resources'),
    },
    {
      id: 'roadmap',
      label: 'Roadmap & Contributing',
      type: 'doc',
    },
    {
      label: 'Security & Legal',
      type: 'category',
      link: {
        title: 'Security & Legal',
        description: 'Security & Legal',
        type: 'generated-index',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'security_legal',
        },
      ],
    },
    {
      id: 'api/introduction',
      label: 'API Reference',
      type: 'doc',
    },
  ],
  api: [
    { type: 'doc', id: 'api/introduction' },

    // section
    {
      type: 'html',
      value: sidebarHeader('Management API'),
    },
    {
      type: 'category',
      label: 'Management API',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items: require('./docs/api/v2/mgmt/sidebar.js'),
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Metadata API'),
    },
    {
      type: 'category',
      label: 'Metadata API',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      items: require('./docs/api/v2/metadata/sidebar.js'),
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Actions API'),
    },
    { type: 'doc', id: 'api/v2/actions/actions-api' },
    {
      type: 'category',
      label: 'Entity Records',
      link: { type: 'doc', id: 'api/v2/actions/entity-records' },
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'api/v2/actions/create-entity-record',
          label: 'Create Entity record',
          className: 'api-method post',
        },
        {
          type: 'doc',
          id: 'api/v2/actions/get-entity-record',
          label: 'Get Entity Record',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/v2/actions/update-entity-record',
          label: 'Update entity record',
          className: 'api-method patch',
        },
      ],
    },
    {
      type: 'category',
      label: 'Object Records',
      link: { type: 'doc', id: 'api/v2/actions/object-records' },
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'api/v2/actions/create-standard-object-record',
          label: 'Create Standard Object record',
          className: 'api-method post',
        },
        {
          type: 'doc',
          id: 'api/v2/actions/get-standard-object-record',
          label: 'Get Standard Object record',
          className: 'api-method get',
        },
        {
          type: 'doc',
          id: 'api/v2/actions/update-standard-object-record',
          label: 'Update Standard Object record',
          className: 'api-method patch',
        },
      ],
    },
    {
      type: 'category',
      label: 'Common Schema Records',
      items: [
        {
          type: 'category',
          label: 'CRM API',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          items: require('./docs/api/v2/crm/sidebar.js'),
        },
        {
          type: 'category',
          label: 'Engagement API',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          items: require('./docs/api/v2/engagement/sidebar.js'),
        },
      ],
    },
    {
      type: 'category',
      label: 'Associations',
      collapsed: true,
      items: [
        { type: 'doc', id: 'api/v2/actions/get-associations', label: 'List associations', className: 'api-method get' },
        {
          type: 'doc',
          id: 'api/v2/actions/create-association',
          label: 'Create association',
          className: 'api-method put',
        },
      ],
    },

    // section
    {
      type: 'html',
      value: sidebarHeader('Passthrough API'),
    },
    {
      type: 'category',
      label: 'Passthrough',
      link: { type: 'doc', id: 'api/v2/actions/passthrough' },
      collapsed: true,
      items: [
        {
          type: 'doc',
          id: 'api/v2/actions/send-passthrough-request',
          label: 'Send passthrough request',
          className: 'api-method post',
        },
      ],
      className: 'hidden',
    },
    {
      type: 'doc',
      id: 'api/v2/actions/send-passthrough-request',
      label: 'Send passthrough request',
      className: 'api-method post',
    },
  ],
};

module.exports = sidebars;
