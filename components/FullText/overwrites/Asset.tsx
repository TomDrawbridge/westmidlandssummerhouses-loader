import React from 'react';

interface IAsset {
  src: string;
  description: string;
  dominantColor: string;
}

export const Asset: React.FC<IAsset> = ({ src, description, dominantColor }) => {
  return (
    <>
      {src && (
        <img
          style={{ backgroundColor: dominantColor }}
          loading="lazy"
          src={`${src}?w=960&h=960`}
          srcSet={`${src}?w=1920&h=1920 1920w, ${src}?w=1280&h=1280 1280w, ${src}?w=640&h=640 640w, ${src}?w=480&h=480 480w, ${src}?w=320&h=320 320w`}
          alt={description ?? ""}
        />
      )}
    </>
  );
};
