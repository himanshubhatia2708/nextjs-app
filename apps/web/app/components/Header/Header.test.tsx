import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';



describe('Header Component', () => {
    const dynamicInitials = '12';
    const userInitials = 'A';

    beforeEach(() => {
        render(<Header />);
    });

    test('renders the header', () => {
        const headerElement = screen.getByRole('banner');
        expect(headerElement).toBeInTheDocument();
    });

    test('renders the logo image', () => {
        const logoImage = screen.getByAltText('aidd icon');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', '/icons/aidd-icon-shell.svg');
    });

    test('renders the help button', () => {
        const helpButton = screen.getByRole('img', { name: 'help' });
        expect(helpButton).toBeInTheDocument();
    });

    test('renders the bell button', () => {
        const bellButton = screen.getByRole('img', { name: 'bell' });
        expect(bellButton).toBeInTheDocument();
    });

    test('renders the preferences button', () => {
        const preferencesButton = screen.getByRole('img', { name: 'preferences' });
        expect(preferencesButton).toBeInTheDocument();
    });

    test('renders the DynamicSvg with initials', () => {
        const dynamicSvg = screen.getByText(dynamicInitials);
        expect(dynamicSvg).toBeInTheDocument();
    });

    test('renders the UserIcon with initials', () => {
        const userIcon = screen.getByText(userInitials);
        expect(userIcon).toBeInTheDocument();
    });

    test('UserIcon is clickable', () => {
        const userIcon = screen.getByText(userInitials);
        userIcon.click();
    });
});