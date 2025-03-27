"use client";

import { addItem } from "@/store/slices/cartSlice";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface ProductDetailsProps {
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

export default function ProductDetails({
  id,
  name,
  description,
  price,
  image,
  category,
  stock,
  rating,
  reviews,
}: ProductDetailsProps) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    dispatch(addItem({ id, name, price, image, quantity }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full h-full">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="text-gray-600">
                  {rating} ({reviews} reviews)
                </span>
              </div>
              <span className="text-gray-600">Category: {category}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${price.toFixed(2)}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="px-3 py-1 border-r hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="w-16 text-center focus:outline-none"
                  min={1}
                  max={stock}
                />
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="px-3 py-1 border-l hover:bg-gray-100"
                  disabled={quantity >= stock}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
            <p
              className={`text-sm ${
                stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {stock > 0
                ? `${stock} units available`
                : "Currently out of stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
