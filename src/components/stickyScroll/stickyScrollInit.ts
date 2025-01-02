import { stickyMenu } from './parts/handleStickyMenu.js';
import { stickyMenuScrollSpy } from './parts/handleStickyMenuScrollSpy.js';

document.addEventListener('DOMContentLoaded', () => {
  const handleScroll = () => {
    stickyMenu();
    stickyMenuScrollSpy();
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
});
