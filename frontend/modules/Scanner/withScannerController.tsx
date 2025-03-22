import { useState, useRef, useEffect } from "react";
import { ScannerViewType, ScannerViewProps } from "./types";

/**
 * Estados del flujo:
 * 1 - "Scan a CirculBin to Initialize..."
 * 2 - "Syncing with CirculBin"
 * 3 - "Synchronized"
 * 4 - "Start scanning Items..."
 * 5 - "X items scanned..."
 * 6 - "Success screen"
 */
const withScannerController = (View: ScannerViewType) =>
  function Controller(): JSX.Element {
    const [wizardStep, setWizardStep] = useState<number>(1);
    const [scanningLock, setScanningLock] = useState<boolean>(false);
    const wizardStepRef = useRef(wizardStep);
    useEffect(() => {
      wizardStepRef.current = wizardStep;
    }, [wizardStep]);

    // Guardamos el contenedor en un ref para chequearlo de forma inmediata
    const containerQRRef = useRef<string>("");
    const [containerQR, setContainerQR] = useState<string>("");

    // Datos de ítems
    const [itemsQR, setItemsQR] = useState<string[]>([]);
    const [totalCircoins, setTotalCircoins] = useState<number>(0);

    // Set de QRs ya leídos (contener + ítems) para evitar lecturas duplicadas.
    const [scannedCodes] = useState<Set<string>>(new Set());

    /**
     * Bloquea el escáner durante ms milisegundos para evitar múltiples lecturas.
     */
    const lockScanner = (ms: number) => {
      setScanningLock(true);
      setTimeout(() => {
        setScanningLock(false);
      }, ms);
    };

    // Procesa el contenedor (válido solo en step 1)
    const handleScanContainer = (data: string) => {
      if (wizardStep !== 1) return;
      // Si ya se capturó el contenedor (inmediatamente en el ref), ignoramos
      if (containerQRRef.current !== "") return;
      if (scannedCodes.has(data)) return;

      scannedCodes.add(data);
      containerQRRef.current = data;
      setContainerQR(data);

      // Pasamos al paso 2: "Syncing with CirculBin"
      setWizardStep(2);

      // Bloqueamos el escáner durante 3s para evitar lecturas repetidas
      lockScanner(2000);

      // Simulamos la sincronización:
      // A los 2s pasa a "Synchronized" (step 3)
      // 1s después, pasa a "Start scanning Items..." (step 4)
      setTimeout(() => {
        setWizardStep(3);
        setTimeout(() => {
          setWizardStep(4);
        }, 1000);
      }, 2000);
    };

    // Procesa cada ítem (válido en pasos 4 y 5)
    const handleScanItem = (data: string) => {
      if (wizardStepRef.current < 4 || wizardStepRef.current >= 6) return;
      if (scanningLock) return;
      if (scannedCodes.has(data)) return;
      console.log("Scanning item:", data, wizardStepRef.current, scanningLock);
      scannedCodes.add(data);

      // Reproducir beep (puedes ajustar la ruta o método)
      const audio = new Audio("/assets/beep.mp3");
      audio.play().catch(console.error);

      setItemsQR((prev) => [...prev, data]);
      setTotalCircoins((prev) => prev + 5);

      // Si estaba en step 4, se pasa a 5 (para mostrar el resumen)
      if (wizardStepRef.current === 4) {
        setWizardStep(5);
      }
      // Bloqueamos el escáner durante 1s para evitar lecturas repetidas
      lockScanner(1000);
    };

    // Acción final: simula envío al backend y muestra éxito (step 6)
    const finishScanning = () => {
      console.log("Enviando al backend:");
      console.log("Contenedor:", containerQR);
      console.log("Ítems:", itemsQR);
      console.log("Circoins:", totalCircoins);

      setWizardStep(6);
    };

    // Reinicia todo el flujo
    const scanAgain = () => {
      setWizardStep(1);
      scannedCodes.clear();
      containerQRRef.current = "";
      setContainerQR("");
      setItemsQR([]);
      setTotalCircoins(0);
      setScanningLock(false);
    };

    const viewProps: ScannerViewProps = {
      wizardStep,
      containerQR,
      itemsQR,
      totalCircoins,
      scanningLock,
      handleScanContainer,
      handleScanItem,
      finishScanning,
      scanAgain,
    };

    return <View {...viewProps} />;
  };

export default withScannerController;
