'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Diamond Solitaire Ring',
      price: 2499,
      quantity: 1,
      image: '💍',
      category: 'Rings'
    },
    {
      id: '2',
      name: 'Pearl Necklace',
      price: 899,
      quantity: 1,
      image: '📿',
      category: 'Necklaces'
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl">✨</span>
              <span className="ml-2 text-xl font-semibold text-gray-900">Luxe Jewelry</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link href="/collections" className="text-gray-600 hover:text-gray-900">Collections</Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            </div>
            
            <div className="flex items-center">
              <Link href="/cart" className="text-red-900 font-medium">
                🛒 Cart ({cartItems.length})
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link 
              href="/collections"
              className="bg-red-900 text-white px-8 py-3 rounded-lg hover:bg-red-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Cart Items ({cartItems.length})
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-b-0">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">{item.image}</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        <p className="font-semibold text-red-900 mt-1">${item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-red-500">
                          <Heart className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  href="/collections"
                  className="text-red-900 font-medium hover:text-red-800 flex items-center"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {shipping > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <p className="text-sm text-yellow-800">
                      Add ${(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  </div>
                )}
                
                <button className="w-full bg-red-900 text-white py-3 rounded-lg hover:bg-red-800 transition-colors font-medium mb-3">
                  Proceed to Checkout
                </button>
                
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <span>🔒</span>
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">We accept:</p>
                  <div className="flex space-x-2">
                    <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                    <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                    <div className="w-10 h-6 bg-blue-800 rounded text-white text-xs flex items-center justify-center">AMEX</div>
                    <div className="w-10 h-6 bg-yellow-400 rounded text-black text-xs flex items-center justify-center">PP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Recently Viewed */}
        {cartItems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { name: 'Gold Bracelet', price: 599, image: '⭐' },
                { name: 'Diamond Earrings', price: 1299, image: '💎' },
                { name: 'Silver Ring', price: 299, image: '💍' },
                { name: 'Ruby Necklace', price: 1899, image: '📿' }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <span className="text-4xl">{item.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-red-900 font-semibold">${item.price}</p>
                    <button className="w-full mt-3 bg-gray-100 text-gray-700 py-2 rounded hover:bg-gray-200 transition-colors text-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-2xl">✨</span>
            <span className="ml-2 text-xl font-semibold">Luxe Jewelry</span>
          </div>
          <p className="text-red-200 mb-6">
            Crafting memories through exceptional jewelry since 1995
          </p>
          <div className="flex justify-center space-x-8">
            <Link href="/privacy" className="text-red-200 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-red-200 hover:text-white">Terms of Service</Link>
            <Link href="/contact" className="text-red-200 hover:text-white">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}