import './ProductDetails.scss';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import productService from '../../services/products/products.js';
import ProductDetailsSkeleton from './ProductDetailsSkeleton/ProductDetailsSkeleton';
import Breadcrum from '../../components/Breadcrum/Breadcrum.jsx';
import { CategoriesContext } from '../../hooks/CategoriesProvider.jsx';
import { formatCurrency } from '../../utils/priceTransform.js';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { categories } = useContext(CategoriesContext);

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const results = await productService.getProduct(id);
        setProduct(results.item);
      }
    }
    fetchData();
  }, [id]);

  if (!product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="ml-product-details">
      <Breadcrum categories={categories} />
      <div className="ml-product-details__container">
        <div className="ml-product-details__image">
          <img src={product.picture} alt={product.title} />
        </div>
        <div className="ml-product-details__summary">
          <span>
            {product.condition} {product.sold_quantity}
          </span>
          <h1>{product.title}</h1>
          <h2>
            {formatCurrency(product.price?.amount, product.price.currency) ??
              ''}
          </h2>
          <button>Comprar</button>
        </div>
        <div className="ml-product-details__info">
          <h1>Descripcion del producto</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
