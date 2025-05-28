import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function useAOS() {
  useEffect(() => {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
      });
    }
  }, []);
}

export default useAOS;