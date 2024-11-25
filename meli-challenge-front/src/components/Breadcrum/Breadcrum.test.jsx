import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrum';

describe('Breadcrumb component', () => {
  it('should render null if categories is an empty array', () => {
    const { container } = render(<Breadcrumb categories={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render the categories correctly when passed as an array', () => {
    const categories = ['Home', 'Products', 'Electronics'];
    render(<Breadcrumb categories={categories} />);

    const breadcrumbItems = screen.getAllByTestId('breadcrumb-category');

    expect(breadcrumbItems).toHaveLength(categories.length);

    categories.forEach((category) => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it('should render breadcrumb with a single category', () => {
    const categories = ['Home'];
    render(<Breadcrumb categories={categories} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
