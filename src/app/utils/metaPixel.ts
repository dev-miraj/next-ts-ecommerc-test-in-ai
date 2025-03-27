"use client";

export const FB_PIXEL_ID = "591986443663743";

declare global {
  interface Window {
    fbq: any;
  }
}

// Track initialized pixels to prevent multiple initializations
const initializedPixels = new Set<string>();

// Initialize Facebook Pixel
export const initPixel = () => {
  if (!FB_PIXEL_ID || initializedPixels.has(FB_PIXEL_ID)) return;

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
  initializedPixels.add(FB_PIXEL_ID);
};

// Track fired events to prevent duplicates
const firedEvents = new Set<string>();

// Generate unique event key
const getEventKey = (eventName: string, params?: object) => {
  return `${eventName}:${JSON.stringify(params || {})}`;
};

// Track page views
export const pageView = () => {
  if (!FB_PIXEL_ID) return;
  const eventKey = getEventKey("PageView");
  if (firedEvents.has(eventKey)) return;

  window.fbq("track", "PageView");
  firedEvents.add(eventKey);
};

// Track when products are viewed
export const viewProduct = (product: {
  id: string;
  name: string;
  price: number;
}) => {
  if (!FB_PIXEL_ID) return;
  const params = {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: Number(product.price.toFixed(2)),
    currency: "USD",
  };
  const eventKey = getEventKey("ViewContent", params);
  if (firedEvents.has(eventKey)) return;

  window.fbq("track", "ViewContent", params);
  firedEvents.add(eventKey);
};

// Track when products are added to cart
export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  if (!FB_PIXEL_ID) return;
  const params = {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: Number((product.price * product.quantity).toFixed(2)),
    currency: "USD",
    contents: [
      {
        id: product.id,
        quantity: product.quantity,
      },
    ],
  };
  const eventKey = getEventKey("AddToCart", params);
  if (firedEvents.has(eventKey)) return;

  window.fbq("track", "AddToCart", params);
  firedEvents.add(eventKey);
};

// Track when purchase is completed
export const completePurchase = (orderDetails: {
  total: number;
  items: Array<{ id: string; quantity: number }>;
}) => {
  if (!FB_PIXEL_ID) return;
  const params = {
    value: Number(orderDetails.total.toFixed(2)),
    currency: "USD",
    contents: orderDetails.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
    })),
    content_type: "product",
  };
  const eventKey = getEventKey("Purchase", params);
  if (firedEvents.has(eventKey)) return;

  window.fbq("track", "Purchase", params);
  firedEvents.add(eventKey);
};
