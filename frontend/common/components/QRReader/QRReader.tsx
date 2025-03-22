import React from "react";
import { OnResultFunction, QrReader as ReactQrReader } from "react-qr-reader";

interface QRReaderProps {
  onResult: OnResultFunction;
  className?: string;
  containerStyle?: React.CSSProperties;
  videoContainerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  ViewFinder?: React.FC<any>;
}

const QRReader: React.FC<QRReaderProps> = ({
  onResult,
  className,
  containerStyle,
  videoContainerStyle,
  videoStyle,
  ViewFinder,
}) => {
  return (
    <div
      className={`absolute inset-0 ${className || ""}`}
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        ...containerStyle,
      }}
    >
      <ReactQrReader
        constraints={{ facingMode: "environment" }}
        scanDelay={300}
        videoId="qr-video"
        onResult={onResult}
        containerStyle={{
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          ...videoContainerStyle,
        }}
        videoContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        videoStyle={{
          minWidth: "100%",
          minHeight: "100%",
          objectFit: "cover",
          margin: 0,
          padding: 0,
          ...videoStyle,
        }}
      />
      {ViewFinder && <ViewFinder />}
    </div>
  );
};

export default QRReader;
