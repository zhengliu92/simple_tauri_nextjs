import { cn } from "@/lib/utils";
import React, { useState } from "react";

export function ImageMagnifier({
  src,
  className,
  width,
  height,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 1.5,
}: {
  src: string;
  className?: string;
  width?: string;
  height?: string;
  magnifierHeight?: number;
  magnifieWidth?: number;
  zoomLevel?: number;
}) {
  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [zoomLevels, setZoomLevels] = useState(zoomLevel);

  return (
    <div
      className={cn(className)}
      style={{
        height: height,
        width: width,
      }}
    >
      <img
        src={src}
        width={100}
        height={100}
        onClick={() => {
          setShowMagnifier(!showMagnifier);
          setZoomLevels(zoomLevel);
        }}
        onWheel={(e) => {
          if (e.deltaY > 0) {
            if (zoomLevels <= 1.2) {
              return;
            }
            setZoomLevels(zoomLevels - 0.1);
          } else {
            if (zoomLevels >= 5) {
              return;
            }
            setZoomLevels(zoomLevels + 0.1);
          }
        }}
        style={{ height: height, width: width }}
        className={cn(
          "object-cover",
          showMagnifier ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onMouseEnter={(e) => {
          setZoomLevels(zoomLevel);
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();
          setSize([width, height]);
          // setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // update cursor position
          const elem = e.currentTarget;
          const { top, left } = elem.getBoundingClientRect();

          // calculate cursor position on the image
          const x = e.pageX - left - window.scrollX;
          const y = e.pageY - top - window.scrollY;
          setXY([x, y]);
        }}
        onMouseLeave={() => {
          setZoomLevels(zoomLevel);
          // close magnifier
          setShowMagnifier(false);
        }}
        alt={"img"}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent magnifier blocks the mousemove event of img
          pointerEvents: "none",
          // set size of magnifier
          height: `${magnifierHeight}px`,
          width: `${magnifieWidth}px`,
          // move element center to cursor pos
          top: `${y - magnifierHeight / 2}px`,
          left: `${x - magnifieWidth / 2}px`,
          opacity: "1", // reduce opacity so you can verify position
          border: "1px solid lightgray",
          backgroundColor: "white",
          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevels}px ${
            imgHeight * zoomLevels
          }px`,

          //calculate position of zoomed image.
          backgroundPositionX: `${-x * zoomLevels + magnifieWidth / 2}px`,
          backgroundPositionY: `${-y * zoomLevels + magnifierHeight / 2}px`,
        }}
      ></div>
    </div>
  );
}
