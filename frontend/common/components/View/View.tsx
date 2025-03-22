import { ImageProps } from "next/image";
import Img from "../Img";
import cn from "@/common/utils/classNames";
import defaultBgImg from "@/public/assets/bg-main.jpeg";

interface Props {
  className?: string;
  children: React.ReactNode;
  bgImg?: ImageProps["src"] | null;
}

const View: React.FC<Props> = ({ className, children, bgImg, ...props }) => {
  return (
    <>
      {bgImg !== null && (
        <Img
          src={bgImg ? bgImg : defaultBgImg}
          className="fixed top-0 right-0 bottom-0 left-0 w-full h-full z-0 object-fill"
          alt="Background"
          width="400"
          height="800"
        />
      )}

      <main
        className={cn(
          "w-full h-screen overflow-auto relative z-0",
          "hide-scrollbar",
          className
        )}
        {...props}
      >
        {children}
      </main>
    </>
  );
};

export default View;
