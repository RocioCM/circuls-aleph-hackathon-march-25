import withScannerController from "./withScannerController";
import { ScannerViewType } from "./types";
import QRReader from "@/common/components/QRReader/QRReader";
import Button from "@/common/components/Button";
import Card from "@/common/components/Card";
import Img from "@/common/components/Img";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import BackButton from "@/common/components/BackButton";
import QRScanner from "@/common/components/QRScanner/QRScanner";

const ScannerView: ScannerViewType = ({
  wizardStep,
  containerQR,
  itemsQR,
  totalCircoins,
  scanningLock,
  handleScanContainer,
  handleScanItem,
  finishScanning,
  scanAgain,
}) => {
  const router = useRouter();
  const wizardStepRef = useRef(wizardStep);
  useEffect(() => {
    wizardStepRef.current = wizardStep;
  }, [wizardStep]);
  // Callback para procesar el resultado del QRReader:
  const handleResult = (
    result: any | null | undefined,
    error: Error | null | undefined
  ) => {
    if (error || !result) return;

    // Si el scanner está bloqueado, ignoramos la lectura
    if (scanningLock) {
      console.log("Scanner locked. Ignoring QR read.");
      return;
    }

    const qrText = result.getText();

    // Según el paso, procesamos contenedor o ítems:
    switch (wizardStepRef.current) {
      case 1:
        handleScanContainer(qrText);
        break;
      case 4:
      case 5:
        handleScanItem(qrText);
        break;
      default:
        console.log("Ignoring QR:", qrText);
    }
  };

  // Renderizado condicional del contenido inferior según el wizardStep
  const renderFooterContent = () => {
    switch (wizardStep) {
      case 1:
        return (
          <div className="flex items-center justify-between">
            <p className="text-center text-xs font-light">
              Scan a CirculBin to Initialize...
            </p>
            <Img
              src="/assets/scanblack.png"
              alt="Scanner"
              width={20}
              height={20}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-between">
            <p className="text-center text-xs font-light">
              Syncing with CirculBin
            </p>
            <Img
              src="/assets/circulsverde.png"
              alt="circulBin"
              width={35}
              height={35}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-between">
            <p className="text-center text-xs font-light">Synchronized</p>
            <Img
              src="/assets/sincronized.png"
              alt="Synchronized"
              width={25}
              height={25}
            />
          </div>
        );
      case 4:
        return (
          <div className="flex items-center justify-between">
            <p className="text-center text-xs font-light">
              Start scanning Items...
            </p>
            <Img
              src="/assets/scanblack.png"
              alt="Scanner"
              width={20}
              height={20}
            />
          </div>
        );
      case 5:
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black">
                <span className="text-white font-bold">{itemsQR.length}</span>
              </div>
              <span className="text-xs font-light">Items scanned</span>
            </div>

            <div className="flex items-center gap-m">
              <div className="flex items-center gap-[0.125rem]">
                <span className="text-xs text-black font-medium">Total =</span>
                <Img
                  src="/assets/circulsnegro.png"
                  alt="circulBin"
                  width={12}
                  height={12}
                />
                <span className="text-xs text-black font-medium">
                  {totalCircoins.toFixed(2)}
                </span>
              </div>

              <Button
                onClick={finishScanning}
                iconEnd={"/assets/rightArrow.png"}
                className="bg-green-600 text-white px-4 py-2 rounded-[100px] w-16 h-6"
                width="w-20"
              >
                <p className="text-xs">Finish</p>
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <BackButton />
      {/* Cámara ocupando todo el fondo */}
      <QRScanner onResult={handleResult} className="absolute inset-0" />

      {/* Spinner centrado cuando scanningLock = true */}
      {scanningLock && wizardStep < 6 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Pantalla de ÉXITO (step 6) */}
      {wizardStep === 6 && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 z-30">
          <div className="rounded-full w-24 h-24 flex items-center justify-center border-4 border-green-500 mb-4">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Thanks for recycling!</h2>
          <p className="mb-4 text-gray-600">
            Total rewards:{" "}
            <span className="font-semibold">{totalCircoins.toFixed(2)}</span>
          </p>
          <p className="text-xs text-gray-400 text-center mb-6">
            Your rewards are pending to validate! We’ll send you a push
            notification when they’re ready
          </p>
          <div className="flex flex-col gap-3 w-full max-w-sm items-center">
            <Button
              className="bg-green-600 text-white "
              width="w-[150px]"
              onClick={scanAgain}
            >
              Scan Again
            </Button>
            <Button
              className="border border-gray-300  bg-white text-green-600"
              width="w-[150px]"
              onClick={() => router.push("/recycler/home")}
            >
              Back Home →
            </Button>
          </div>
        </div>
      )}

      {/* Caja inferior flotante (si wizardStep < 6) */}
      {wizardStep < 6 && (
        <div className="absolute bottom-0 w-full z-10 px-4 pb-6">
          <Card className="bg-white w-full max-w-xl mx-auto p-m rounded-[0.625rem] h-12  justify-center">
            {renderFooterContent()}
          </Card>
        </div>
      )}
    </div>
  );
};

export default withScannerController(ScannerView);
