// src/components/Home.jsx
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Luxury Sofa Set',
    price: 25000,
    description: 'Elegant 3-seater sofa with premium fabric upholstery',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 2,
    name: 'Modern Dining Table',
    price: 15000,
    description: '6-seater dining table with tempered glass top',
    imageUrl: '/api/placeholder/400/300'
  },
  {
    id: 3,
    name: 'King Size Bed',
    price: 20000,
    description: 'Comfortable king size bed with storage',
    imageUrl: '/api/placeholder/400/300'
  }
];

function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 bg-blue-50 rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to Belgaum Furniture</h1>
        <p className="text-xl text-gray-600 mb-8">Discover Premium Quality Furniture for Your Home</p>
        <Link
          to="/purchase"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">₹{product.price}</span>
                  <Link
                    to="/purchase"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
            <p className="text-gray-600">Premium materials and expert craftsmanship</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Quick and reliable delivery service</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Warranty</h3>
            <p className="text-gray-600">Extended warranty on all products</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-600 text-white p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Home?</h2>
        <p className="text-xl mb-8">Join our satisfied customers and bring home the best furniture today!</p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Register Now
          </Link>
          <Link
            to="/purchase"
            className="bg-blue-700 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;