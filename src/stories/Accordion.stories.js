import pageHtml from '../../index.html?raw';
import starIconUrl from '../../images/icon-star.svg';

const sourceDocument = new DOMParser().parseFromString(pageHtml, 'text/html');
const sourceMain = sourceDocument.querySelector('main#main');

if (!sourceMain) {
  throw new Error('Missing main#main in index.html');
}

function renderAccordion({ initialState }) {
  const wrapper = document.createElement('div');
  wrapper.className = 'cover';
  // Reuse the original classes, content, IDs, and accessibility relationships.
  wrapper.innerHTML = sourceMain.outerHTML;
  wrapper.querySelector('.header-icon').src = starIconUrl;

  const accordion = wrapper.querySelector('#accordionGroup');
  if (!accordion) throw new Error('Missing accordion group');

  accordion.querySelectorAll('h2').forEach((heading) => {
    const button = heading.querySelector('.accordion-trigger');
    if (!button) throw new Error('Missing accordion trigger');

    const panelId = button.getAttribute('aria-controls');
    const panel = panelId
      ? accordion.querySelector(`#${CSS.escape(panelId)}`)
      : null;
    if (!panel) throw new Error(`Missing accordion panel: ${panelId}`);

    const setExpanded = (expanded) => {
      button.setAttribute('aria-expanded', String(expanded));
      panel.hidden = !expanded;
    };

    const originalExpanded = button.getAttribute('aria-expanded') === 'true';
    setExpanded(
      initialState === 'all-open'
        ? true
        : initialState === 'all-closed'
          ? false
          : originalExpanded,
    );

    // Native button Enter/Space activation bubbles to this heading as a click.
    heading.addEventListener('click', () => {
      setExpanded(button.getAttribute('aria-expanded') !== 'true');
    });
  });

  return wrapper;
}

/** @type {import('@storybook/html-vite').Meta} */
const meta = {
  title: 'Components/Accordion',
  render: renderAccordion,
  argTypes: {
    initialState: {
      name: '초기 펼침 상태',
      description: 'Controls 변경 시 초기 상태로 다시 렌더링합니다.',
      control: {
        type: 'select',
        labels: {
          original: '원본 상태',
          'all-open': '전체 열림',
          'all-closed': '전체 닫힘',
        },
      },
      options: ['original', 'all-open', 'all-closed'],
    },
  },
  args: { initialState: 'original' },
};

export default meta;
export const Default = {};
export const AllClosed = { args: { initialState: 'all-closed' } };
export const AllOpen = { args: { initialState: 'all-open' } };
