import './styles/main.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import ProductList from './pages/ProductList/ProductList.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/items" element={<ProductList />} />
          <Route path="/items/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
