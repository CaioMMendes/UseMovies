"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface ImageLoaderProps extends Pick<ImageProps, "loader"> {}

const ImageWithFallback = (props: ImageProps) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);
  //   const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  //     return `https://example.com/${src}?w=${width}&q=${quality || 75}`;
  //   };

  return (
    <Image
      {...rest}
      alt={rest.alt}
      src={imgSrc}
      //   loader={imageLoader}
      onError={() => {
        setImgSrc("/image-not-found.png");
      }}
    />
  );
};

export default ImageWithFallback;
