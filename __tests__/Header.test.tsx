import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '../src/components/Header';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'nav.home': 'Home',
      'nav.portfolio': 'Portfolio',
      'nav.marketplace': 'Marketplace',
      'nav.about': 'About',
      'nav.openMenu': 'Open navigation menu',
      'nav.closeMenu': 'Close navigation menu',
    };
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock @/i18n/routing
jest.mock('../src/i18n/routing', () => ({
  Link: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => '/',
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

// Mock Routes config
jest.mock('../src/config/routes', () => ({
  Routes: {
    projects: { list: '/projetos' },
    fractions: { list: '/fracoes' },
    about: '/sobre-nos',
  },
}));

// Mock logo image
jest.mock('../src/app/images/logo.png', () => '/logo.png', { virtual: true });

describe('Header Component - Mobile Menu', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  it('renders hamburger button on mobile', () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    expect(hamburgerButton).toBeInTheDocument();
  });

  it('opens drawer when hamburger button is clicked', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  it('drawer contains all navigation links', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
    });

    // Check for all nav links in the drawer
    const links = screen.getAllByText('Home');
    expect(links.length).toBeGreaterThan(0);
    expect(screen.getAllByText('Portfolio').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Marketplace').length).toBeGreaterThan(0);
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
  });

  it('closes drawer when close button is clicked', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const closeButton = screen.getByLabelText('Close navigation menu');
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes drawer when backdrop is clicked', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const backdrop = document.querySelector('.fixed.inset-0.bg-black\\/70');
    expect(backdrop).toBeInTheDocument();
    
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes drawer when Escape key is pressed', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    fireEvent.keyDown(document, { key: 'Escape' });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('closes drawer when a nav link is clicked', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    // Find a link inside the drawer
    const dialog = screen.getByRole('dialog');
    const portfolioLink = dialog.querySelector('a[href="/projetos"]');
    
    if (portfolioLink) {
      fireEvent.click(portfolioLink);
    }

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('contains language toggle in drawer', async () => {
    render(<Header />);
    const hamburgerButton = screen.getByLabelText('Open navigation menu');
    
    fireEvent.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    const dialog = screen.getByRole('dialog');
    const languageButtons = dialog.querySelectorAll('button');
    const hasLanguageButton = Array.from(languageButtons).some(
      button => button.textContent === 'PT'
    );
    expect(hasLanguageButton).toBe(true);
  });
});

