import Header from 'components/Header';
import Notfound from 'components/NotFound';
import AlbumFeature from 'features/Album';
import ProductFeature from 'features/Products';
import CartFeature from 'features/Cart';
import TodoFeature from 'features/Todo';
import { useEffect } from 'react';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const productsList = await productsApi.getAll()
  //     console.log(productsList)
  //   }
  //   fetchProducts()
  // }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/todos');
    }
  }, [navigate, location.pathname]);

  return (
    <div className="App">
      <Header />
      <Outlet />
      <Routes>
        <Route path="todos/*" element={<TodoFeature />} />
        <Route path="albums/*" element={<AlbumFeature />} />
        <Route path="products/*" element={<ProductFeature />} />
        <Route path="cart/*" element={<CartFeature />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
