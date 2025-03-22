import {useState} from 'react';
import {ValidatorViewType, ValidatorViewProps} from './types';

/**
 * Estados del flujo:
 * 1 - "Scan a Container to Initialize..."
 * 2 - "Syncing with CirculBin"
 * 3 - "Synchronized"
 * 4 - "Start scanning Items..."
 * 5 - "X items scanned..."
 * 6 - "Success screen"
 */
const withValidatorController = (View: ValidatorViewType) =>
  function Controller(): JSX.Element {
    const [wizardStep, setWizardStep] = useState<number>(1); // Controlls current step
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Datos del contenedor (cuando escaneamos CirculBin)
    const [containerQR, setContainerQR] = useState<string>('');

    // Datos de ítems
    const [itemsQR, setItemsQR] = useState<string[]>([]);
    // Ejemplo: total Circoins. Lo podrías calcular en base a los ítems:
    const [totalCircoins, setTotalCircoins] = useState<number>(0);

    // Escanear contenedor CirculBin:
    const handleScanContainer = async (containerId: string) => {
      try {
        const response = await fetch(
          `/api/get-container?containerId=${containerId}`
        );
        const data = await response.json();

        if (data.success) {
          console.log('Container data:', data);
        }
      } catch (e) {
        console.error('Error sending transaction', e);
      }

      return;
      // Paso 1 => 2 => 3 => 4
      if (wizardStep === 1) {
        // Si detectamos un QR, pasamos a "Syncing with CirculBin"
        setWizardStep(2);
        // "Leemos la información", simulado con un setTimeout
        setIsLoading(true);
        setTimeout(() => {
          // Una vez "sincronizado"
          setContainerQR(containerId);
          setIsLoading(false);
          setWizardStep(3);
          // Esperamos 1 segundo y pasamos a step 4
          setTimeout(() => {
            setWizardStep(4);
          }, 1000);
        }, 2000);
      }
    };

    // Empieza a escanear ítems (paso 4 => 5)
    // Cada ítem leído disparará beep + se acumula en itemsQR
    const handleScanItem = (data: string) => {
      if (wizardStep >= 4 && wizardStep < 6) {
        // Reproducir beep (opcional):
        const audio = new Audio('/assets/beep.mp3');
        audio.play().catch(console.error);

        // Acumula el item
        setItemsQR((prev) => [...prev, data]);
        // Suma circoins, p.ej. 5 por item:
        setTotalCircoins((prev) => prev + 5);
        /// TODO: add screen to register containers multiple (Bulk). (first generate 20 codes manually)
        /// TODO: call contract for recycling each item.
        /// TODO: add screen to verify multiple containers (Bulk).

        // Cambiamos a paso 5, si aún no está
        if (wizardStep < 5) {
          setWizardStep(5);
        }
      }
    };

    // Acción final: enviar info al backend, mostrar success
    const finishScanning = () => {
      setIsLoading(true);
      // Simular llamada al backend
      setTimeout(() => {
        console.log('Se envió al backend la siguiente info:');
        console.log('Contenedor QR:', containerQR);
        console.log('Ítems escaneados:', itemsQR);
        console.log('Total Circoins:', totalCircoins);

        // Pasamos al paso 6 (success)
        setIsLoading(false);
        setWizardStep(6);
      }, 1500);
    };

    // Función para re-escanear / resetear
    const scanAgain = () => {
      // Reiniciamos todo el flujo
      setWizardStep(1);
      setContainerQR('');
      setItemsQR([]);
      setTotalCircoins(0);
      setIsLoading(false);
    };

    const viewProps: ValidatorViewProps = {
      wizardStep,
      isLoading,
      containerQR,
      itemsQR,
      totalCircoins,
      handleScanContainer,
      handleScanItem,
      finishScanning,
      scanAgain,
    };

    return <View {...viewProps} />;
  };

export default withValidatorController;
