import './ProductItem.scss';
import PropTypes from 'prop-types';
import freeShipping from '../../../assets/ic_shipping.png';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARG',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div
      data-testid="product-item"
      className="ml-product-item"
      onClick={() => navigate(`/items/${product.id}`)}
    >
      <img
        src={product.picture}
        alt={product.title}
        className="ml-product-item__image"
        data-testid="product-item-image"
      />
      <div className="ml-product-item__details">
        <h3>
          $ {formatCurrency(product.price.amount)}
          {
            product.free_shipping ?? <img src={freeShipping} alt={product.title} />
          }
        </h3>
        <p className="ml-product-item__title">{product.title}</p>
      </div>
      <div className="ml-product-item__condition">
        <small>{product.condition}</small>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
      amount: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }),
    free_shipping: PropTypes.bool.isRequired,
    condition: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;
