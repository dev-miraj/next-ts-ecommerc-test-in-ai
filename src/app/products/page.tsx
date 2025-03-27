"use client";

import {
  setFilters,
  setLoading,
  setProducts,
} from "@/store/slices/productSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, loading, error, filters } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    // TODO: Implement API call to fetch products
    // For now, we'll use mock data
    const mockProducts = [
      {
        id: "1",
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 199.99,
        image: "/products/headphones.svg",
        category: "Electronics",
        stock: 50,
        rating: 4.5,
        reviews: 128,
        featured: true,
      },
      {
        id: "2",
        name: "Smart Watch",
        description: "Feature-rich smartwatch with health tracking",
        price: 299.99,
        image: "/products/smartwatch.svg",
        category: "Electronics",
        stock: 30,
        rating: 4.8,
        reviews: 256,
        featured: true,
      },
      {
        id: "3",
        name: "Denim Jacket",
        description: "Classic denim jacket with modern fit",
        price: 89.99,
        image: "/products/denim-jacket.svg",
        category: "Clothing",
        stock: 45,
        rating: 4.3,
        reviews: 89,
        featured: false,
      },
      {
        id: "4",
        name: "Running Shoes",
        description: "Comfortable running shoes with advanced cushioning",
        price: 129.99,
        image: "/products/running-shoes.svg",
        category: "Clothing",
        stock: 60,
        rating: 4.6,
        reviews: 167,
        featured: true,
      },
      {
        id: "5",
        name: "The Art of Programming",
        description: "Comprehensive guide to modern programming practices",
        price: 49.99,
        image: "/products/programming-book.svg",
        category: "Books",
        stock: 25,
        rating: 4.9,
        reviews: 78,
        featured: false,
      },
      {
        id: "6",
        name: "Leather Wallet",
        description: "Genuine leather wallet with RFID protection",
        price: 39.99,
        image: "/products/wallet.svg",
        category: "Accessories",
        stock: 100,
        rating: 4.4,
        reviews: 145,
        featured: false,
      },
      {
        id: "7",
        name: "Tablet Pro",
        description: "High-performance tablet for creative professionals",
        price: 799.99,
        image: "/products/tablet.svg",
        category: "Electronics",
        stock: 15,
        rating: 4.7,
        reviews: 203,
        featured: true,
      },
      {
        id: "8",
        name: "Summer Dress",
        description: "Lightweight floral dress perfect for summer",
        price: 59.99,
        image: "/products/dress.svg",
        category: "Clothing",
        stock: 40,
        rating: 4.5,
        reviews: 112,
        featured: false,
      },
      {
        id: "9",
        name: "Gaming Mouse",
        description:
          "Professional gaming mouse with RGB lighting and programmable buttons",
        price: 79.99,
        image: "/products/gaming-mouse.svg",
        category: "Electronics",
        stock: 35,
        rating: 4.7,
        reviews: 189,
        featured: true,
      },
      {
        id: "10",
        name: "Scented Candle Set",
        description: "Luxury aromatherapy candles with natural essential oils",
        price: 34.99,
        image: "/products/candle-set.svg",
        category: "Accessories",
        stock: 75,
        rating: 4.6,
        reviews: 92,
        featured: false,
      },
      {
        id: "11",
        name: "Yoga Mat",
        description: "Premium non-slip yoga mat with carrying strap",
        price: 45.99,
        image: "/products/yoga-mat.svg",
        category: "Accessories",
        stock: 55,
        rating: 4.8,
        reviews: 156,
        featured: true,
      },
      {
        id: "12",
        name: "Mechanical Keyboard",
        description: "RGB mechanical gaming keyboard with custom switches",
        price: 149.99,
        image: "/products/keyboard.svg",
        category: "Electronics",
        stock: 20,
        rating: 4.9,
        reviews: 234,
        featured: true,
      },
    ];

    dispatch(setProducts(mockProducts));
    dispatch(setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {/* Filters and Sort Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {items.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.category || ""}
          onChange={(e) => {
            dispatch(setFilters({ category: e.target.value || null }));
          }}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>

        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filters.sortBy || "price_asc"}
          onChange={(e) => {
            dispatch(setFilters({ sortBy: e.target.value as any }));
          }}
        >
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items
          .filter(
            (product) =>
              !filters.category || product.category === filters.category
          )
          .map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
      </div>

      {items.filter(
        (product) => !filters.category || product.category === filters.category
      ).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found.</p>
        </div>
      )}
    </div>
  );
}
