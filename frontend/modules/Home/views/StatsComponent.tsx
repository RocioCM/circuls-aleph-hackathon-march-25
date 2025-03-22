// components/Home/ReciclajeCard.tsx
import React from "react";
import Img from "@/common/components/Img";

interface StatsComponentProps {
  tree: number;
  water: number;
  energy: number;
}

const StatsComponent: React.FC<StatsComponentProps> = ({
  tree,
  water,
  energy,
}) => {
  return (
    // Contenedor principal con posición relative para posicionar elementos superpuestos
    <div className="relative bg-[#1B4332] text-white rounded-[1.8rem] mb-[6.0rem]">
      {/* Contenedor de estadísticas posicionado sobre el div de la cabecera */}

      <div className="grid grid-cols-3 gap-4 bg-[#1B4332] px-8 py-8 rounded-[2rem] shadow-lg h-[15.0rem] ">
        <div className="text-center ">
          <div>
            <Img
              src="/assets/tree.png"
              alt="Árboles salvados"
              width={32}
              height={32}
              className="mx-auto"
            />
            <div className="text-3xl font-semibold mt-[0.5rem]">{tree}</div>
          </div>

          <div className="text-base text-white/80 leading-tight mt-5">
            Árboles salvados
          </div>
        </div>
        <div className="text-center">
          <div>
            <Img
              src="/assets/water.png"
              alt="Agua ahorrada"
              width={32}
              height={32}
              className="mx-auto"
            />
            <div className="text-3xl font-semibold mt-[0.5rem]">{water}</div>
          </div>

          <div className="text-base text-white/80 leading-tight mt-5">
            Agua ahorrada
          </div>
        </div>
        <div className="text-center">
          <div>
            <Img
              src="/assets/light.png"
              alt="Espacio ahorrado en vertederos"
              width={32}
              height={32}
              className="mx-auto"
            />
            <div className="text-3xl font-semibold mt-[0.5rem]">{energy}</div>
          </div>

          <div className="text-base text-white/80 leading-tight mt-5">
            Espacio ahorrado en vertederos
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
