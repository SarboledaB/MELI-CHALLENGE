import { useState } from 'react';
import './Searchbar.scss';
import search from '../../../assets/ic_Search.png';
import { useNavigate } from 'react-router-dom';
import { replaceSpaceURL } from '../../../utils/urlTransform';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/items?search=${replaceSpaceURL(searchTerm)}`);
    setSearchTerm('');
  };

  return (
    <form
      className="ml-searchbar"
      onSubmit={handleSearch}
      data-testid="searchbar"
    >
      <input
        data-testid="input"
        type="text"
        placeholder="Nunca dejes de buscar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" data-testid="searchbar-button">
        <img src={search} alt="Logo" className="ml-search__logo" />
      </button>
    </form>
  );
};

export default Searchbar;
