"use client";

export const FB_PIXEL_ID = "591986443663743";

declare global {
  interface Window {
    fbq: any;
  }
}

// Initialize Facebook Pixel
export const initPixel = () => {
  if (!FB_PIXEL_ID) return;

  // Initialize pixel code
  !(function (f: any, b, e, v: any, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js"
  );

  fbq("init", FB_PIXEL_ID);
};

// Track page views
export const pageView = () => {
  if (!FB_PIXEL_ID) return;
  window.fbq("track", "PageView");
};

// Track when products are viewed
export const viewProduct = (product: {
  id: string;
  name: string;
  price: number;
}) => {
  if (!FB_PIXEL_ID) return;
  window.fbq("track", "ViewContent", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.price,
    currency: "USD",
  });
};

// Track when products are added to cart
export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  if (!FB_PIXEL_ID) return;
  window.fbq("track", "AddToCart", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.price * product.quantity,
    currency: "USD",
    contents: [
      {
        id: product.id,
        quantity: product.quantity,
      },
    ],
  });
};

// Track when purchase is completed
export const completePurchase = (orderDetails: {
  total: number;
  items: Array<{ id: string; quantity: number }>;
}) => {
  if (!FB_PIXEL_ID) return;
  window.fbq("track", "Purchase", {
    value: orderDetails.total,
    currency: "USD",
    contents: orderDetails.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
    content_type: "product",
  });
};
