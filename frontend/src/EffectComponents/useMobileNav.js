import { useEffect } from 'react';

function useMobileNav() {
  useEffect(() => {
    const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
    const body = document.querySelector('body');

    const toggleMobileNav = () => {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    };

    if (mobileNavToggleBtn) {
      mobileNavToggleBtn.addEventListener('click', toggleMobileNav);
    }

    return () => {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.removeEventListener('click', toggleMobileNav);
      }
    };
  }, []);
}

export default useMobileNav;