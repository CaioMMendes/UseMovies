"use client";
import React, { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageLoaderProps extends Pick<ImageProps, "loader"> {}
interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

interface ImageLoaderFunction {
  (params: ImageLoaderParams): string;
}

interface ImageWithFallbackProps extends ImageProps {
  fallback?: string;
}

const ImageWithFallback = React.forwardRef<
  HTMLImageElement,
  ImageWithFallbackProps
>(({ fallback = "/image-not-found-poster.png", src, alt, ...props }, ref) => {
  const [error, setError] = useState<boolean>(false);
  // const imageLoader: ImageLoaderFunction = ({ src, width = 300, quality }) => {
  //   return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  // };

  return (
    <Image
      {...props}
      src={error ? fallback : src}
      alt={alt}
      ref={ref}
      // loader={imageLoader}

      onError={() => setError(true)}
    />
  );
});
ImageWithFallback.displayName = "ImageWithFallback";
export default ImageWithFallback;
