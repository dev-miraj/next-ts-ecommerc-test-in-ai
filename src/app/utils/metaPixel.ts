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
  try {
    if (!FB_PIXEL_ID) {
      console.warn("Meta Pixel ID is not defined");
      return;
    }

    if (initializedPixels.has(FB_PIXEL_ID)) {
      console.debug("Meta Pixel already initialized");
      return;
    }

    // Initialize pixel code
    !(function (f: any, b, e, v: any, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
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
      if (!s || !s.parentNode) {
        console.error("Unable to find script insertion point");
        return;
      }
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    fbq("init", FB_PIXEL_ID);
    initializedPixels.add(FB_PIXEL_ID);
    console.debug("Meta Pixel initialized successfully");
  } catch (error) {
    console.error("Error initializing Meta Pixel:", error);
  }
};

// Track fired events to prevent duplicates
const firedEvents = new Set<string>();

// Generate unique event key
const getEventKey = (eventName: string, params?: object) => {
  return `${eventName}:${JSON.stringify(params || {})}`;
};

// Track page views
export const pageView = () => {
  try {
    if (!FB_PIXEL_ID || !window.fbq) {
      console.warn("Meta Pixel not initialized for PageView event");
      return;
    }
    const eventKey = getEventKey("PageView");
    if (firedEvents.has(eventKey)) return;

    window.fbq("track", "PageView");
    firedEvents.add(eventKey);
  } catch (error) {
    console.error("Error tracking PageView:", error);
  }
};

// Track when products are viewed
export const viewProduct = (product: {
  id: string;
  name: string;
  price: number;
}) => {
  try {
    if (!FB_PIXEL_ID || !window.fbq) {
      console.warn("Meta Pixel not initialized for ViewContent event");
      return;
    }
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
  } catch (error) {
    console.error("Error tracking ViewContent:", error);
  }
};

// Track when products are added to cart
export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  quantity: number;
}) => {
  try {
    if (!FB_PIXEL_ID || !window.fbq) {
      console.warn("Meta Pixel not initialized for AddToCart event");
      return;
    }
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
  } catch (error) {
    console.error("Error tracking AddToCart:", error);
  }
};

// Track when purchase is completed
export const completePurchase = (orderDetails: {
  total: number;
  items: Array<{ id: string; quantity: number }>;
}) => {
  try {
    if (!FB_PIXEL_ID || !window.fbq) {
      console.warn("Meta Pixel not initialized for Purchase event");
      return;
    }
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
  } catch (error) {
    console.error("Error tracking Purchase:", error);
  }
};
