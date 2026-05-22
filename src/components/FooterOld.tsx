import React from 'react';

const Footer = () => {
  return (
    <footer className="py-16 px-[5%] text-center border-t border-border mt-auto">
      <p className="text-text-secondary text-sm font-display tracking-widest uppercase">
        &copy; {new Date().getFullYear()} FRAÇÃO ILUSTRE. VANGUARDA EM CONSTRUÇÃO.
      </p>
    </footer>
  );
};

export default Footer;
