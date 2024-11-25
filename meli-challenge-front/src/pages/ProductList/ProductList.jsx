import './ProductList.scss';
import { useContext, useEffect, useState } from 'react';
import productService from '../../services/products/products.js';
import { useLocation } from 'react-router-dom';
import ProductItem from './ProductItem/ProductItem.jsx';
import { addSpaceURL } from '../../utils/urlTransform.js';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb.jsx';
import ProductListSkeleton from './ProductListSkeleton/ProductListSkeleton.jsx';
import { CategoriesContext } from '../../hooks/CategoriesProvider.jsx';

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState(null);
  const { categories, setCategories } = useContext(CategoriesContext);

  useEffect(() => {
    async function fetchData() {
      const urlParams = new URLSearchParams(window.location.search);
      const search = urlParams.get('search');

      if (search) {
        const results = await productService.searchProducts(
          addSpaceURL(search)
        );
        setProducts(results.items);
        setCategories(results.categories);
      } else {
        setProducts([]);
        setCategories([]);
      }
    }
    fetchData();
  }, [location]);

  if (!products) {
    return <ProductListSkeleton />;
  }

  return (
    <div className="ml-product-list">
      <Breadcrumb categories={categories} />
      <div className="ml-product-list__container">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
