import { IKImage } from "imagekitio-react";

const Image = ({ src, className, w, h, alt }) => {
  const isExternal = src?.startsWith("http");

  if (isExternal) {
    return (
      <img
        src={src}
        className={className}
        width={w}
        height={h}
        alt={alt}
        loading="lazy"
      />
    );
  }

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
};

export default Image;
