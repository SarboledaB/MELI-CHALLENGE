import './ProductListSkeleton.scss';

const ProductListSkeleton = () => {
  const template = (
    <div className="ml-product-list-skeleton__item">
      <div className="ml-product-list-skeleton__item-img"></div>
      <div className="ml-product-list-skeleton__item-details">
        <div className="ml-product-list-skeleton__item-details-price"></div>
        <div className="ml-product-list-skeleton__item-details-title"></div>
      </div>
    </div>
  );

  const repeatedTemplates = Array(4).fill(template);

  return (
    <div className="ml-product-list-skeleton">
      <div className="ml-product-list-skeleton__container">
        {repeatedTemplates.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
