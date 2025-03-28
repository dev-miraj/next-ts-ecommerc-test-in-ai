"use client";

import { completePurchase, initPixel } from "@/app/utils/metaPixel";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export default function OrderSuccessPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartTotal = useAppSelector((state) => state.cart.total);

  useEffect(() => {
    // Initialize Meta Pixel and track purchase event
    initPixel();

    // Show success toast
    toast.success("আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে", {
      duration: 5000,
      position: "top-center",
      style: {
        background: "#10B981",
        color: "#fff",
        fontSize: "16px",
        padding: "16px",
      },
    });

    // Track purchase event after initialization
    setTimeout(() => {
      completePurchase({
        total: cartTotal,
        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      });
    }, 1000);

    // Clear cart
    dispatch(clearCart());
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="mb-8">
          <svg
            className="w-16 h-16 text-green-500 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">অর্ডার সফল হয়েছে!</h2>
        <p className="mt-2 text-sm text-gray-600">
          আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ
          করব।
        </p>
        <button
          onClick={() => router.push("/products")}
          className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          আরও কেনাকাটা করুন
        </button>
      </div>
    </div>
  );
}
