import React from 'react';
import cn from '@/common/utils/classNames';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  bgColor: string;
  children: React.ReactNode;
}

const BasePill: React.FC<Props> = ({
  className,
  bgColor,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'w-full relative h-max rounded-rl text-n0 overflow-hidden',
        className
      )}
      {...props}
    >
      <div
        className="h-full w-[calc(100%-1.15rem)] absolute top-0 left-0 transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[#ffffff08] backdrop-blur-3xl"></div>

      <div className="relative">{children}</div>
    </div>
  );
};

export default BasePill;
