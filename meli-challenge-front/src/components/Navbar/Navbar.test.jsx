import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Navbar', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
  });

  it('should render the logo and navigate to the homepage when clicked', () => {
    render(<Navbar />);

    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();

    fireEvent.click(logo);

    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('should render the searchbar component', () => {
    render(<Navbar />);

    const searchbar = screen.getByTestId('searchbar');
    expect(searchbar).toBeInTheDocument();
  });
});
