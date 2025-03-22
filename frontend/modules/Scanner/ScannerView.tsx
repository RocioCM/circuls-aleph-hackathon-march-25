import withScannerController from "./withScannerController";
import { ScannerViewType } from "./types";
import Button from "@/common/components/Button";
import BackButton from "@/common/components/BackButton";
import Card from "@/common/components/Card";
import QRReader from "@/common/components/QRReader/QRReader";

const ScannerView: ScannerViewType = ({
  currentStep,
  containerQR,
  itemsQR,
  isLoading,
  handleScanContainer,
  handleScanItem,
  finishScanning,
}) => {
  // Callback para procesar el resultado del QRReader
  const handleResult = (
    result: any | null | undefined,
    error: Error | null | undefined
  ) => {
    if (error) {
      console.error("Error al leer el QR:", error);
      return;
    }
    if (result) {
      const qrText = result.getText();
      if (currentStep === 1) {
        handleScanContainer(qrText);
      } else {
        handleScanItem(qrText);
      }
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* El componente QRReader ocupa toda la pantalla */}
      <QRReader onResult={handleResult} />

      {/* Botón de retroceso, flotando en la esquina superior izquierda */}
      <div className="absolute top-4 left-4 z-20">
        <BackButton />
      </div>

      {/* Tarjeta flotante de instrucciones, en la parte superior */}
      <div className="absolute top-4 w-full flex justify-center z-20 px-4">
        <Card className="bg-white/70 backdrop-blur-sm max-w-xl w-full p-3 text-center">
          {currentStep === 1 ? (
            <>
              <h1 className="text-xl font-bold">Escanea el Contenedor</h1>
              <p className="text-sm text-gray-800">
                Posiciona el QR del contenedor frente a la cámara.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">Escanea Botellas o Latas</h1>
              <p className="text-sm text-gray-800">
                Ítems escaneados: {itemsQR.length}. Continúa escaneando.
              </p>
            </>
          )}
        </Card>
      </div>

      {/* Aviso flotante para el contenedor escaneado (solo en paso 1) */}
      {currentStep === 1 && containerQR && (
        <div className="absolute bottom-4 w-full px-4 z-20">
          <Card className="bg-white/70 backdrop-blur-sm max-w-xl mx-auto p-3 text-center">
            <p className="text-lg font-semibold">Contenedor escaneado</p>
            <p className="text-sm text-gray-800 break-all">{containerQR}</p>
            <p className="text-sm">Ahora, escanea los ítems.</p>
          </Card>
        </div>
      )}

      {/* Lista de ítems escaneados y botón de finalización (solo en paso 2) */}
      {currentStep === 2 && (
        <div className="absolute bottom-4 w-full px-4 z-20">
          <Card className="bg-white/70 backdrop-blur-sm max-w-xl mx-auto p-3 mb-3 text-center">
            <h2 className="text-lg font-bold">
              Ítems escaneados ({itemsQR.length})
            </h2>
            {itemsQR.length > 0 ? (
              <ul className="mt-2 text-sm text-gray-800">
                {itemsQR.map((item, idx) => (
                  <li key={idx} className="break-all">
                    • {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm">Aún no se han escaneado ítems.</p>
            )}
          </Card>
          <Button
            onClick={finishScanning}
            className="bg-blue-600 text-white w-full max-w-xl mx-auto block"
            disabled={isLoading}
          >
            Finalizar
          </Button>
        </div>
      )}
    </div>
  );
};

export default withScannerController(ScannerView);
