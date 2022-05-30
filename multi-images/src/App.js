import AllProducts from "./components/AllProducts";
import UploadProduct from "./components/UploadProduct";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SingleProductPage from "./components/SingleProductPage";

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/products" element={<AllProducts />} />
            <Route exact path="/products/:id" element={<SingleProductPage />} />
            <Route exact path="/upload" element={<UploadProduct />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
