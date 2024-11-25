import PropTypes from 'prop-types';
import './Breadcrumb.scss';

const Breadcrumb = ({ categories }) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  const categoriesArray = categories.toString().split(',');

  return (
    <nav
      aria-label="breadcrumb"
      className="ml-breadcrumb"
      data-testid="breadcrumb"
    >
      {categoriesArray.map((item, index) => (
        <span
          key={index}
          className="ml-breadcrumb__category"
          data-testid="breadcrumb-category"
        >
          {item}
          {index < categoriesArray.length - 1 && (
            <span className="ml-breadcrumb__category-divider">{`>`}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

Breadcrumb.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default Breadcrumb;
