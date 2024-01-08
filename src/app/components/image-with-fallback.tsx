"use client";
import { useState } from "react";
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

const ImageWithFallback = ({
  fallback = "image-not-found-poster.png",
  ...props
}: ImageWithFallbackProps) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  const imageLoader: ImageLoaderFunction = ({ src, width = 300, quality }) => {
    console.log(src);
    return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <Image
      {...rest}
      alt={rest.alt}
      src={imgSrc}
      // loader={imageLoader}

      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageWithFallback;
