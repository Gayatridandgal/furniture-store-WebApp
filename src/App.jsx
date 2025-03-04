import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Registration from './components/Registration';
import Feedback from './components/Feedback';
import PurchaseOrder from './components/PurchaseOrder';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/purchase" element={<PurchaseOrder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;