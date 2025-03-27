"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FB_PIXEL_ID, initPixel, pageView } from "../utils/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize pixel only once
    initPixel();
    // Track page views
    pageView();
  }, [pathname, searchParams]);

  if (!FB_PIXEL_ID) return null;

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  );
}
