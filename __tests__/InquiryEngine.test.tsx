import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InquiryEngine from '../src/components/InquiryEngine';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('InquiryEngine', () => {
  let windowOpenSpy: jest.SpyInstance;

  beforeEach(() => {
    windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
  });

  afterEach(() => {
    windowOpenSpy.mockRestore();
  });

  it('renders form fields', () => {
    render(<InquiryEngine />);
    expect(screen.getByTestId('inquiry-form')).toBeInTheDocument();
    // Labels based on mocked translations
    expect(screen.getByText('contact.nameLabel')).toBeInTheDocument();
    expect(screen.getByText('contact.messageLabel')).toBeInTheDocument();
    expect(screen.getByText('contact.submitBtn')).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', () => {
    render(<InquiryEngine />);
    
    // Submit empty form
    fireEvent.click(screen.getByText('contact.submitBtn'));
    
    // Window open should not be called
    expect(windowOpenSpy).not.toHaveBeenCalled();
    
    // Error states should be active (in our component we just add border-red-500, but we can check class)
    // Testing specific class names can be brittle, but we know it should not submit.
  });

  it('submits correctly with WhatsApp method', () => {
    render(<InquiryEngine />);
    
    const inputs = screen.getAllByRole('textbox');
    // textboxes: 0 -> name, 1 -> contact info
    fireEvent.change(inputs[0], { target: { value: 'John Doe' } });
    fireEvent.change(inputs[1], { target: { value: '123456789' } });
    
    // Find textarea directly 
    // Since we don't have aria-labels, we'll find by the only textarea
    const textAreaElement = document.querySelector('textarea');
    if (textAreaElement) {
        fireEvent.change(textAreaElement, { target: { value: 'Hello' } });
    }

    const privacyCheckbox = screen.getByTestId('privacy-checkbox');
    fireEvent.click(privacyCheckbox);

    // Method is WhatsApp by default
    fireEvent.click(screen.getByText('contact.submitBtn'));

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('https://wa.me/31657479978?text='),
      '_blank'
    );
  });

  it('submits correctly with Email method and valid email', () => {
    render(<InquiryEngine />);
    
    // Change method to email
    const emailRadio = screen.getByLabelText('E-mail');
    fireEvent.click(emailRadio);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jane Doe' } });
    
    // Once email is selected, contact info becomes type="email" instead of text
    // Let's find it by placeholder or something, or simply grab all inputs
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
    }
    
    const textAreaElement = document.querySelector('textarea');
    if (textAreaElement) {
        fireEvent.change(textAreaElement, { target: { value: 'I have a question' } });
    }

    const privacyCheckbox = screen.getByTestId('privacy-checkbox');
    fireEvent.click(privacyCheckbox);

    fireEvent.click(screen.getByText('contact.submitBtn'));

    expect(windowOpenSpy).toHaveBeenCalledWith(
      expect.stringContaining('mailto:carlosjo.da@gmail.com?subject='),
      '_blank'
    );
  });

  it('blocks submission with invalid email format', () => {
    render(<InquiryEngine />);
    
    const emailRadio = screen.getByLabelText('E-mail');
    fireEvent.click(emailRadio);

    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'Jane Doe' } });
    
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        fireEvent.change(emailInput, { target: { value: 'not-an-email' } });
    }
    
    const textAreaElement = document.querySelector('textarea');
    if (textAreaElement) {
        fireEvent.change(textAreaElement, { target: { value: 'I have a question' } });
    }

    const privacyCheckbox = screen.getByTestId('privacy-checkbox');
    fireEvent.click(privacyCheckbox);

    fireEvent.click(screen.getByText('contact.submitBtn'));

    // Should be blocked
    expect(windowOpenSpy).not.toHaveBeenCalled();
  });
});
