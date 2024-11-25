import './ProductDetailsSkeleton.scss';

const ProductDetailsSkeleton = () => {
  return (
    <div className="ml-product-details-skeleton">
      <div className="ml-product-details-skeleton__container">
        <div className="ml-product-details-skeleton__image">
          <div className="ml-product-details-skeleton__image-img"></div>
        </div>
        <div className="ml-product-details-skeleton__summary">
          <div className="ml-product-details-skeleton__summary-condition"></div>
          <div className="ml-product-details-skeleton__summary-title"></div>
          <div className="ml-product-details-skeleton__summary-price"></div>
          <div className="ml-product-details-skeleton__summary-btn"></div>
        </div>
        <div className="ml-product-details-skeleton__info">
          <div className="ml-product-details-skeleton__info-title"></div>
          <div className="ml-product-details-skeleton__info-description"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
