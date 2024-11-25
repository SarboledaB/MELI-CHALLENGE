import './ProductItem.scss';
import PropTypes from 'prop-types';
import freeShipping from '../../../assets/ic_shipping.png';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utils/priceTransform.js';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();

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
          {formatCurrency(product.price.amount, product.price.currency)}
          {product.free_shipping ? (
            <img src={freeShipping} alt="freeShipping-icon" data-testid="freeShipping-icon" />
          ) : ('')}
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
