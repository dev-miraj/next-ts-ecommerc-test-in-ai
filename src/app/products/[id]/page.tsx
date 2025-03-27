import ProductDetails from "@/app/components/ProductDetails";
import { Metadata } from "next";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // TODO: Fetch product data from API
  const mockProduct = {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
  };

  return {
    title: `${mockProduct.name} | Next.js E-commerce`,
    description: mockProduct.description,
    openGraph: {
      title: mockProduct.name,
      description: mockProduct.description,
      type: "website",
      images: [
        {
          url: "/products/headphones.svg",
          width: 800,
          height: 600,
          alt: mockProduct.name,
        },
      ],
      siteName: "Next.js E-commerce",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  // TODO: Implement API call to fetch product details
  const mockProduct = {
    id: params.id,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    image: "/products/headphones.svg",
    category: "Electronics",
    stock: 50,
    rating: 4.5,
    reviews: 128,
  };

  return <ProductDetails {...mockProduct} />;
}
