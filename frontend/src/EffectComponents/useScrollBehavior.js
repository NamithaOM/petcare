import { useEffect } from 'react';

function useScrollBehavior() {
  useEffect(() => {
    const toggleScrolled = () => {
      const body = document.querySelector('body');
      const header = document.querySelector('#header');
      if (
        header &&
        (header.classList.contains('scroll-up-sticky') ||
          header.classList.contains('sticky-top') ||
          header.classList.contains('fixed-top'))
      ) {
        window.scrollY > 100
          ? body.classList.add('scrolled')
          : body.classList.remove('scrolled');
      }
    };

    const toggleScrollTop = () => {
      const scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        window.scrollY > 100
          ? scrollTop.classList.add('active')
          : scrollTop.classList.remove('active');
      }
    };

    const handleScroll = () => {
      toggleScrolled();
      toggleScrollTop();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
    };
  }, []);
}

export default useScrollBehavior;