import logoML from '../../assets/Logo_ML.png';
import './Navbar.scss';
import Searchbar from './Searchbar/Searchbar.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="ml-navbar">
      <div className="ml-navbar__container">
        <img src={logoML} alt="Logo" onClick={() => navigate(`/`)} data-testid="logo"/>
        <Searchbar/>
      </div>
    </nav>
  );
};

export default Navbar;
