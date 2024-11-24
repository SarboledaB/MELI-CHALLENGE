import './ProductDetails.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productService from '../../services/products/products.js';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const results = await productService.getProduct(id);
        setProduct(results.item);
      }
    }
    fetchData();
  }, [id]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARG',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="ml-product-details">
      <div className="ml-product-details__container">
        <div className="ml-product-details__info">
          <img src={product.picture} alt={product.title} />
          <h1>Descripcion del producto</h1>
          <p>{product.description}</p>
        </div>
        <div className="ml-product-details__summary">
          <span>{product.condition}</span>
          <h1>{product.title}</h1>
          <h2>{formatCurrency(product.price?.amount) ?? ''}</h2>
          <button>COMPRAR</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
