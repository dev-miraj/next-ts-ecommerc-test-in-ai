"use client";

import { addItem } from "@/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { viewProduct } from "../utils/metaPixel";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  reviews: number;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  category,
  stock,
  rating,
  reviews,
}: ProductCardProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Track product view
    viewProduct({ id, name, price });
  }, [id, name, price]);

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, image, quantity: 1 }));
    // Track add to cart event
    addToCart({ id, name, price, quantity: 1 });
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link
        href={`/products/${id}`}
        className="block aspect-square overflow-hidden"
      >
        <Image
          src={image}
          alt={name}
          width={300}
          height={300}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            <span className="text-sm text-gray-600">
              {rating} ({reviews})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={`text-sm ${
              stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock > 0 ? `${stock} in stock` : "Out of stock"}
          </span>
          <button
            onClick={handleAddToCart}
            disabled={stock === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
