import React from 'react';
import withValidatorController from './withValidatorController';
import {ValidatorViewType} from './types';
import Button from '@/common/components/Button';
import Card from '@/common/components/Card';
import QRReader from '@/common/components/QRReader/QRReader';

const ValidatorView: ValidatorViewType = ({
  wizardStep,
  isLoading,
  itemsQR,
  totalCircoins,
  handleScanContainer,
  handleScanItem,
  finishScanning,
  scanAgain,
}) => {
  // Callback para procesar el resultado del QRReader:
  const handleResult = (
    result: any | null | undefined,
    error: Error | null | undefined
  ) => {
    if (error) {
      console.error('Error reading QR:', error);
      return;
    }
    if (result) {
      const qrText = result.getText();
      // Dependiendo del step, escaneamos contenedor o ítems
      if (wizardStep === 1) {
        handleScanContainer(qrText);
      } else if (wizardStep >= 4 && wizardStep < 6) {
        handleScanItem(qrText);
      }
    }
  };

  // Renderizado condicional del texto en el "footer" flotante
  const renderFooterContent = () => {
    switch (wizardStep) {
      case 1:
        return (
          <p className="text-center text-sm">Scan a Container to start...</p>
        );
      case 2:
        return <p className="text-center text-sm">Syncing with CirculBin</p>;
      case 3:
        return <p className="text-center text-sm">Synchronized</p>;
      case 4:
        return <p className="text-center text-sm">Start scanning Items...</p>;
      case 5:
        return (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {itemsQR.length} Items scanned
              </span>
              <span className="text-sm text-gray-500">
                Total: {totalCircoins?.toFixed(2)}
              </span>
            </div>
            <Button
              disabled={isLoading}
              onClick={finishScanning}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Finish
            </Button>
          </div>
        );
      default:
        return null; // para step 6 o cualquier otra
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      <QRReader onResult={handleResult} className="absolute inset-0" />

      {/* Pantalla de ÉXITO (step 6) cubre todo */}
      {wizardStep === 6 && (
        <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 z-30">
          {/* Ícono check grande */}
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
            Total rewards:{' '}
            <span className="font-semibold">{totalCircoins.toFixed(2)}</span>
          </p>
          <p className="text-xs text-gray-400 text-center mb-6">
            Your rewards are pending to validate! We’ll send you a push
            notification when they’re ready
          </p>
          <div className="flex flex-col gap-3 w-full max-w-sm">
            <Button className="bg-green-600 text-white" onClick={scanAgain}>
              Scan Again
            </Button>
            <Button
              className="border border-gray-300 text-gray-700"
              onClick={() => console.log('Back Home')}
            >
              Back Home →
            </Button>
          </div>
        </div>
      )}

      {/* Caja inferior flotante (si wizardStep < 6) */}
      {wizardStep < 6 && (
        <div className="absolute bottom-0 w-full z-20 px-4 pb-6">
          <Card className="bg-white w-full max-w-xl mx-auto p-m rounded-[0.625rem]">
            {renderFooterContent()}
          </Card>
        </div>
      )}
    </div>
  );
};

export default withValidatorController(ValidatorView);
