import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from './Searchbar';
import { replaceSpaceURL } from '../../../utils/urlTransform';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../../utils/urlTransform', () => ({
  replaceSpaceURL: jest.fn(),
}));

describe('Searchbar', () => {
  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(navigate);
    replaceSpaceURL.mockImplementation((searchTerm) =>
      searchTerm.replace(/\s+/g, '-')
    );
  });

  it('should render the input field and button', () => {
    render(<Searchbar />);

    expect(screen.getByTestId('input')).toBeInTheDocument();
    expect(screen.getByTestId('searchbar-button')).toBeInTheDocument();
  });

  it('should update the search term when typing in the input', () => {
    render(<Searchbar />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test search' } });

    expect(input.value).toBe('test search');
  });

  it('should navigate to the correct URL when form is submitted', () => {
    render(<Searchbar />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.submit(screen.getByTestId('input'));

    expect(replaceSpaceURL).toHaveBeenCalledWith('test search');

    expect(navigate).toHaveBeenCalledWith('/items?search=test-search');
  });

  it('should clear the input after submitting the form', () => {
    render(<Searchbar />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test search' } });
    fireEvent.submit(screen.getByTestId('input'));

    expect(input.value).toBe('');
  });
});
