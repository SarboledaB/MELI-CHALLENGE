import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { CategoriesProvider, CategoriesContext } from './CategoriesProvider';

describe('CategoriesProvider', () => {
  it('provides default values for categories and setCategories', () => {
    const TestComponent = () => {
      const { categories, setCategories } = useContext(CategoriesContext);
      return (
        <div>
          <p data-testid="categories">{categories.length}</p>
        </div>
      );
    };

    render(
      <CategoriesProvider>
        <TestComponent />
      </CategoriesProvider>
    );

    expect(screen.getByTestId('categories').textContent).toBe('0');
  });
});
