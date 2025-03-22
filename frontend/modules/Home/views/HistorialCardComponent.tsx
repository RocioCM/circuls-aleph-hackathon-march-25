// components/Home/HistorialCard.tsx
import React, { useMemo, useState } from 'react';
import Img from '@/common/components/Img';
import { RecyclingHistoryItem } from '../types';

interface HistorialCardComponentProps {
  history: RecyclingHistoryItem[];
}

const HistorialCardComponent: React.FC<HistorialCardComponentProps> = ({
  history,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const getMessage = (status: string) => {
    return 'Recolector en camino 🚛';
  };

  const getStatusColor = (status: string) => {
    return status === 'success' ? 'bg-green-500' : 'bg-red-500';
  };

  const formattedHistory = useMemo(() => {
    return history.map((item) => ({
      ...item,
      id: item.id,
      status: item.status,
      dotColor: getStatusColor(item.status),
      message: getMessage(item.status),
      date: new Date(item.createdAt).toLocaleDateString(),
    }));
  }, [history]);

  return (
    <div className="bg-[#1B4332] text-white rounded-[2rem] p-4 px-6 pt-12 mb-4">
      {/* Cabecera con título e ícono de plus */}
      <div
        className="flex justify-between items-center mb-9 cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-xl font-bold">Tu historial</h2>
        <Img
          src="/assets/plus.png"
          alt="Plus"
          width={25}
          height={25}
          className={`${
            isOpen ? 'rotate-45' : ''
          } transition-transform duration-300`}
        />
      </div>

      {/* Contenido del historial, visible solo si está abierto */}
      {isOpen && (
        <div className="space-y-4 mb-8 animate__animated animate__fadeInDown">
          {formattedHistory.length > 0 ? (
            formattedHistory.map((item) => (
              <div key={item.id}>
                <div className="flex items-center gap-3">
                  <div
                    className={`shrink-0 w-3 h-3 rounded-full ${item.dotColor}`}
                  ></div>
                  <span className="flex-grow text-base">{item.message}</span>
                </div>
                <span className="text-sm text-white/60">{item.date}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-white/80">
              Aún no tienes reciclajes. ¡Empieza a reciclar hoy!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistorialCardComponent;
