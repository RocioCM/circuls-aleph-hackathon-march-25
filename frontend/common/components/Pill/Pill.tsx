import { useState } from 'react';
import Button from '../Button';
import Img from '../Img';
import cn from '@/common/utils/classNames';
import { ImageProps } from 'next/image';
import BasePill from './BasePill';

interface Props {
  title: string;
  content: React.ReactNode;
  icon?: ImageProps['src'];
  colorClosed: string;
  colorExpanded: string;
  templateId?: number;
  height?: string;
  className?: string;
}

const TEMPLATES_COUNT = 3;

const Pill: React.FC<Props> = ({
  title,
  content,
  icon,
  className,
  colorClosed,
  colorExpanded,
  templateId = 0,
  height = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentColor = isOpen ? colorExpanded : colorClosed;

  return (
    <BasePill
      bgColor={currentColor}
      className={className}
      onClick={() => setIsOpen(true)}
    >
      <div
        className={cn(
          'flex gap-l flex-1 px-6 py-4 relative z-[1]',
          icon
            ? 'flex-col justify-center pr-[9.5rem]'
            : 'flex-row justify-between items-center',
          height || 'h-max'
        )}
      >
        {!isOpen && (
          <Img
            src={`/assets/pill-effect-${templateId % TEMPLATES_COUNT}.svg`}
            alt="Background"
            width={300}
            height={200}
            className="absolute left-0 top-0 w-auto h-full object-fill bg-left text-transparent"
          />
        )}

        <h2 className="text-[1.375rem] font-bold leading-[1.13]">{title}</h2>
        <Button
          className="!bg-n1 !text-n10 !p-xs !w-3xl !h-3xl shrink-0"
          handleClick={() => setIsOpen(!isOpen)}
        >
          <Img
            src="/assets/icon-add-gray.svg"
            alt={isOpen ? 'Cerrar' : 'Abrir'}
            width={24}
            height={24}
            className={cn(
              'w-5 h-5 object-contain transition-transform duration-500',
              isOpen ? 'rotate-[135deg]' : ''
            )}
          />
        </Button>
        {icon && (
          <Img
            src={icon}
            alt="Ilustración"
            width={200}
            height={200}
            className="object-contain absolute top-0 right-2 w-[9rem] h-full"
          />
        )}
      </div>

      {isOpen && (
        <div className="pl-6 pr-10 pt-6 pb-10 animate__animated animate__fadeInDown">
          {content}
        </div>
      )}
    </BasePill>
  );
};

export default Pill;
