"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FB_PIXEL_ID, initPixel, pageView } from "../utils/metaPixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let checkFbq: NodeJS.Timer;

    try {
      // Initialize pixel only once
      initPixel();

      // Wait for script to load before tracking page views
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds maximum wait

      checkFbq = setInterval(() => {
        attempts++;
        if (window.fbq) {
          try {
            pageView();
          } catch (error) {
            console.error("Error tracking page view:", error);
          }
          clearInterval(checkFbq);
        } else if (attempts >= maxAttempts) {
          console.error("Facebook Pixel failed to load after 5 seconds");
          clearInterval(checkFbq);
        }
      }, 100);
    } catch (error) {
      console.error("Error initializing Meta Pixel:", error);
    }

    return () => clearInterval(checkFbq);
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
