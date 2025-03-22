import React from "react";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";

export type OnResultFunction = (
  result?: { getText: () => string } | null,
  error?: Error | null,
  codeReader?: any
) => void;

interface QRReaderProps {
  onResult: OnResultFunction;
  className?: string;
  containerStyle?: React.CSSProperties;
  videoStyle?: React.CSSProperties;
  ViewFinder?: React.FC<any>;
}

const QRReader: React.FC<QRReaderProps> = ({
  onResult,
  className,
  containerStyle,
  videoStyle,
  ViewFinder,
}) => {
  return (
    <div
      className={`absolute inset-0  ${className || ""}`}
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        ...containerStyle,
      }}
    >
      <Scanner
        components={{
          // No implementamos tracker, así que le pasamos una función vacía
          tracker: () => {},
          audio: false,
          onOff: false,
          finder: false,
          torch: false,
          zoom: false,
        }}
        onScan={(detectedCodes: IDetectedBarcode[]) => {
          if (onResult && detectedCodes.length > 0) {
            const resultText = detectedCodes[0]?.rawValue || ""; // Extract the first detected code's raw value
            onResult({ getText: () => resultText } as any, null, null);
          }
        }}
        onError={(error: unknown) => {
          if (onResult) {
            onResult(
              null,
              error instanceof Error ? error : new Error("Unknown error"),
              null
            );
          }
        }}
        constraints={{ facingMode: "environment" }}
        styles={{
          video: {
            objectFit: "cover",
            height: "100%",

            margin: 0,
            padding: 0,
            ...videoStyle,
          },
          container: {
            width: "100%",
            height: "100%",

            margin: 0,
            padding: 0,
          },
          finderBorder: 20,
        }}
      />
      {ViewFinder && <ViewFinder />}
    </div>
  );
};

export default QRReader;
