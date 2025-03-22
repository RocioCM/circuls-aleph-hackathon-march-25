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
    <div className="grid grid-cols-3 gap-4  px-8 py-8  bg-gradient-to-r from-[#01B369] via-[#019155] to-[#019155] rounded-[20px] shadow-lg  ">
      <div className="text-center ">
        <div>
          <Img
            src="/assets/tree.png"
            alt="Árboles salvados"
            width={30}
            height={30}
            className="mx-auto"
          />
          <div className="text-xl font-medium mt-1 text-white">{tree}</div>
        </div>

        <div className="text-sm font-normal text-white leading-tight mt-1">
          Árboles salvados
        </div>
      </div>
      <div className="text-center">
        <div>
          <Img
            src="/assets/water.png"
            alt="Agua ahorrada"
            width={30}
            height={30}
            className="mx-auto"
          />
          <div className="text-xl font-medium mt-1 text-white">{water}</div>
        </div>

        <div className="text-sm font-normal text-white leading-tight mt-1">
          Agua ahorrada
        </div>
      </div>
      <div className="text-center">
        <div>
          <Img
            src="/assets/light.png"
            alt="Espacio ahorrado en vertederos"
            width={30}
            height={30}
            className="mx-auto"
          />
          <div className="text-xl font-medium mt-1 text-white">{energy}</div>
        </div>

        <div className="text-sm font-normal text-white leading-tight mt-1">
          Energía ahorrada
        </div>
      </div>
    </div>
  );
};

export default StatsComponent;
