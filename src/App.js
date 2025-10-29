import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CategoryFilter from './components/CategoryFilter';
import Toast from './components/Toast';
import LoadingSpinner from './components/LoadingSpinner';
import { sampleProducts, categories } from './data/sampleProducts';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Simulate realistic loading time
    const loadProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        // Use sample data with a friendly message
        setProducts(sampleProducts);
        setToast({
          message: 'Using demo products - backend not connected',
          type: 'info'
        });
      } finally {
        // Add minimum loading time for better UX
        setTimeout(() => setLoading(false), 800);
      }
    };
    
    loadProducts();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      ));
      showToast(`Added another ${product.name} to cart!`);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      showToast(`${product.name} added to cart!`);
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, qty: newQty } : item
      ));
    }
  };

  const removeFromCart = (id) => {
    const item = cart.find(item => item.id === id);
    setCart(cart.filter(item => item.id !== id));
    if (item) {
      showToast(`${item.name} removed from cart`, 'info');
    }
  };

  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.qty, 0);
    
    showToast(`🎉 Order placed! ${itemCount} items for ₹${total.toLocaleString()}`);
    setCart([]);
    setShowCart(false);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f8f9fa' }}>
      <Header
        cartCount={cartCount}
        onCartToggle={() => setShowCart(!showCart)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main style={{ padding: '2rem' }}>
        {/* Welcome message */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}>
            <h2 style={{ margin: '0 0 0.5rem 0' }}>Welcome to VibeCart! 🛍️</h2>
            <p style={{ margin: 0, opacity: 0.9 }}>Discover amazing products at great prices</p>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: '#7f8c8d'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>No products found</h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>
              Try adjusting your search or category filter
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                style={{
                  marginTop: '1rem',
                  background: '#3498db',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Show All Products
              </button>
            )}
          </div>
        )}
      </main>

      {showCart && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.6)',
              zIndex: 999,
              backdropFilter: 'blur(2px)'
            }}
            onClick={() => setShowCart(false)}
          />
          <Cart
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClose={() => setShowCart(false)}
            onCheckout={handleCheckout}
          />
        </>
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
