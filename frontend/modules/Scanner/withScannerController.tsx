import { useState } from "react";
import { ScannerViewType, ScannerViewProps } from "./types";

const withScannerController = (View: ScannerViewType) =>
  function Controller(): JSX.Element {
    // Paso 1: escanear contenedor; Paso 2: escanear ítems.
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [containerQR, setContainerQR] = useState<string>("");
    const [itemsQR, setItemsQR] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Guarda el QR del contenedor y cambia de paso.
    const handleScanContainer = (data: string) => {
      setContainerQR(data);
      setCurrentStep(2);
    };

    // Guarda cada QR de ítems escaneados.
    const handleScanItem = (data: string) => {
      setItemsQR((prev) => [...prev, data]);
    };

    // Acción final (puede ser un submit, redirección, etc.).
    const finishScanning = () => {
      console.log("Contenedor escaneado:", containerQR);
      console.log("Ítems escaneados:", itemsQR);
      alert("¡Proceso finalizado! Revisa la consola para más detalles.");
    };

    const viewProps: ScannerViewProps = {
      currentStep,
      containerQR,
      itemsQR,
      isLoading,
      handleScanContainer,
      handleScanItem,
      finishScanning,
    };

    return <View {...viewProps} />;
  };

export default withScannerController;
