import { useState } from "react";
import withHomeController from "./withHomeController";
import { HomeViewType } from "./types";

// Aquí importas tus componentes reales.
// Ej: import RecycleCardComponent from "./views/RecycleCardComponent";
import View from "@/common/components/View";
import BackButton from "@/common/components/BackButton";
import StatsComponent from "./views/StatsComponent";
import Img from "@/common/components/Img";

// Ejemplo rápido de ícono “chevron” rotando al abrir/cerrar:
const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 transition-transform transform ${
      isOpen ? "rotate-180" : "rotate-0"
    }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const HomeView: HomeViewType = ({
  metrics,
  historialData,
  mainBalance,
  balanceSubtitle,
  onSendClick,
  onWithdrawClick,
  onScanClick,
  handleWhatsAppClick,
  handleInstagramClick,
  handleLinkedInClick,
}) => {
  // Estados para plegar/desplegar secciones
  const [impactOpen, setImpactOpen] = useState<boolean>(true);
  const [activityOpen, setActivityOpen] = useState<boolean>(true);

  return (
    <View className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col p-4 pt-12 mt-5">
        {/* Sección de Saldo */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Img
              src="/assets/circulsnegro.png"
              alt="Circoins"
              width={35}
              height={35}
            />
            <h1 className="text-5xl font-bold">{mainBalance}</h1>
          </div>

          <p className="text-[0.5rem] text-gray-500">{balanceSubtitle}</p>
          <div className="h-[1px] w-60 bg-green-500 my-5"></div>
        </div>

        {/* Botones principales: Send, Withdraw, Scan */}
        <div className="flex justify-center gap-5 pb-5">
          {/* Botón Send */}
          <button
            onClick={onSendClick}
            className="flex flex-col items-center focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#808080] flex items-center justify-center">
              <Img
                src="/assets/arrowForward.png"
                alt="Send Icon"
                width={16}
                height={16}
              />
            </div>
            <p className="text-xs mt-1">Send</p>
          </button>

          {/* Botón Withdraw */}
          <button
            onClick={onWithdrawClick}
            className="flex flex-col items-center focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#808080] flex items-center justify-center">
              <Img
                src="/assets/arrowDown.png"
                alt="Withdraw Icon"
                width={16}
                height={16}
              />
            </div>
            <p className="text-xs mt-1">Withdraw</p>
          </button>

          {/* Botón Scan */}
          <button
            onClick={onScanClick}
            className="flex flex-col items-center focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <Img
                src="/assets/scan.png"
                alt="Scan Icon"
                width={16}
                height={16}
              />
            </div>
            <p className="text-xs mt-1">Scan</p>
          </button>
        </div>

        {/* Card: Period of recycling verification */}
        <div className="border rounded-rs flex items-center justify-between px-s py-m my-xl">
          <div className="flex items-center gap-m">
            <Img
              src="/assets/circulsverde.png"
              alt="Circoins"
              width={35}
              height={35}
            />
            <div className="flex flex-col">
              <p className="text-xs font-light">
                Period of recycling verification
              </p>
              <p className="text-[0.5rem] text-[#808080] font-light">
                15 minutes ago
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Img
              src="/assets/circulsnegro.png"
              alt="Circoins"
              width={12}
              height={12}
            />
            <p className="text-xs font-medium">$35,14</p>
          </div>
        </div>

        {/* Sección Impact (plegable) */}
        <div className="pb-xl">
          <button
            onClick={() => setImpactOpen(!impactOpen)}
            className="w-full flex items-center justify-between pb-xl focus:outline-none"
          >
            <span className="text-[#808080]  font-semibold text-base">
              Impact
            </span>
            <ChevronIcon isOpen={impactOpen} />
          </button>
          {impactOpen && (
            <StatsComponent
              tree={metrics.trees}
              water={metrics.water}
              energy={metrics.energy}
            />
          )}
        </div>

        {/* Sección Activity (plegable) */}
        <div>
          <button
            onClick={() => setActivityOpen(!activityOpen)}
            className="w-full flex items-center justify-between pb-xl focus:outline-none"
          >
            <span className="text-[#808080]  font-semibold text-base">
              Activity
            </span>
            <ChevronIcon isOpen={activityOpen} />
          </button>
          {activityOpen && (
            <div className="flex flex-col gap-3 mt-1">
              {historialData && historialData.length > 0 ? (
                historialData.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between  pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <Img
                        src="/assets/circulsverde.png"
                        alt="Circoins"
                        width={35}
                        height={35}
                      />
                      <div className="flex flex-col">
                        <p className="text-xs font-light">{item.status}</p>
                        <p className="text-[0.5rem] text-[#9D9D9D] font-light">
                          {item.updatedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <Img
                        src="/assets/circulsnegro.png"
                        alt="Circoins"
                        width={12}
                        height={12}
                      />
                      <p className="text-xs font-medium">{item.id}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No activity found</p>
              )}
              <button className="text-sm text-gray-500 hover:underline self-end">
                older history
              </button>
            </div>
          )}
        </div>
      </div>
    </View>
  );
};

export default withHomeController(HomeView);
