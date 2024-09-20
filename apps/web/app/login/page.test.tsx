import { render, screen, fireEvent } from '@testing-library/react';
import Login from './page';

describe('Page Component', () => {
    beforeEach(() => {
        render(<Login />);
    }); test('renders the page with the correct elements', () => {
       
        const logo = screen.getByAltText(/SynCoOp logo/i);
        expect(logo).toBeInTheDocument();

        
        const welcomeHeading = screen.getByText(/Welcome!/i);
        expect(welcomeHeading).toBeInTheDocument();

        
        const emailInput = screen.getByLabelText(/Email Address/i);
        expect(emailInput).toBeInTheDocument();

        
        const passwordInput = screen.getByLabelText(/Password/i);
        expect(passwordInput).toBeInTheDocument();

       
        const loginButton = screen.getByRole('button', { name: /Login/i });
        expect(loginButton).toBeInTheDocument();

       
        const forgotPasswordLink = screen.getByText(/Forgot password?/i);
        expect(forgotPasswordLink).toBeInTheDocument();
    });
   
});