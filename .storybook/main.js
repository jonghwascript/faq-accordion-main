/** @type {import('@storybook/html-vite').StorybookConfig} */
const config = {
  stories: ['../src/stories/**/*.stories.js'],
  framework: { name: '@storybook/html-vite', options: {} },
  addons: ['@storybook/addon-docs'],
};

export default config;
