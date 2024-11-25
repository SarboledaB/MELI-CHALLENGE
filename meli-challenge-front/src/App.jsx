import './styles/main.scss';
import Navbar from './components/Navbar/Navbar.jsx';
import ProductList from './pages/ProductList/ProductList.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx';
import { CategoriesProvider } from './hooks/CategoriesProvider.jsx';

function App() {
  return (
    <CategoriesProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/items" element={<ProductList />} />
          <Route path="/items/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
    </CategoriesProvider>
  );
}

export default App;
