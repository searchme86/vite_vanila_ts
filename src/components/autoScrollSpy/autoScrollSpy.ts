// Types
type NullableHTMLElement = HTMLDivElement | null;
type NullableNodeList = NodeListOf<HTMLSpanElement> | null;

// Global Variables
const menu = document.getElementById('menu') as NullableHTMLElement;
const links: NullableNodeList = menu
  ? menu.querySelectorAll('.text_menu')
  : null;
const sections = document.querySelectorAll(
  '.section_content'
) as NodeListOf<HTMLDivElement>;

let isMouseDown = false;
let startX: number | undefined;
let scrollLeft: number;

// Utility: Scroll to section
const scrollToSection = (sectionId: string): void => {
  const section = document.querySelector(
    `.${sectionId}`
  ) as HTMLDivElement | null;

  // console.log('section', section);
  if (section) {
    window.scrollTo({ top: section.offsetTop, behavior: 'smooth' });
  }
};

// Utility: Update Active Section
const updateActiveSection = () => {
  let currentSectionId = '';
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 0 && rect.bottom > 0) {
      currentSectionId = section.classList[1]; // Use the second class for ID
    }
  });

  links?.forEach((link) => {
    const targetId = link.getAttribute('data-target');
    if (targetId === currentSectionId) {
      link.classList.add('active');
      scrollMenuToActiveLink(link);
    } else {
      link.classList.remove('active');
    }
  });
};

// Utility: Scroll Menu to Active Link
const scrollMenuToActiveLink = (link: HTMLSpanElement) => {
  const activeLinkRect = link.getBoundingClientRect();
  const menuRect = menu?.getBoundingClientRect();

  if (menu && menuRect) {
    if (
      activeLinkRect.left < menuRect.left ||
      activeLinkRect.right > menuRect.right
    ) {
      link.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }
};

// Event Handlers: Menu Click Events
const setupMenuClickHandler = () => {
  links?.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      if (targetId) {
        scrollToSection(targetId);
        links.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
};

// Event Handlers: Scroll Events
const setupScrollSpy = () => {
  document.addEventListener('scroll', updateActiveSection);
  window.addEventListener('resize', updateActiveSection);
};

// Event Handlers: Menu Drag Events
const setupMenuDragHandler = () => {
  if (!menu) return;

  const onMouseDown = (e: MouseEvent | TouchEvent) => {
    isMouseDown = true;
    const pageX = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    startX = pageX - menu.offsetLeft;
    scrollLeft = menu.scrollLeft;
    menu.style.cursor = 'grabbing';
  };

  const onMouseMove = (e: MouseEvent | TouchEvent) => {
    if (!isMouseDown || !startX) return;
    e.preventDefault();
    const pageX = 'pageX' in e ? e.pageX : e.touches[0].pageX;
    const walk = (pageX - startX - menu.offsetLeft) * 2;
    menu.scrollLeft = scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    isMouseDown = false;
    menu.style.cursor = 'default';
  };

  // Mouse Events
  menu.addEventListener('mousedown', onMouseDown);
  menu.addEventListener('mousemove', onMouseMove);
  menu.addEventListener('mouseup', onMouseUpOrLeave);
  menu.addEventListener('mouseleave', onMouseUpOrLeave);

  // Touch Events
  menu.addEventListener('touchstart', onMouseDown);
  menu.addEventListener('touchmove', onMouseMove);
  menu.addEventListener('touchend', onMouseUpOrLeave);
};

// Initialization
const init = () => {
  setupMenuClickHandler();
  setupScrollSpy();
  setupMenuDragHandler();
  updateActiveSection(); // Run once on load
};

// Start
init();
