import '../style.css';

/** @type {import('@storybook/html-vite').Preview} */
const preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
  },
};

export default preview;
