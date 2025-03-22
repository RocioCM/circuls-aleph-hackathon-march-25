import { useRouter } from "next/navigation";
import ChevronIcon from "../ChevronIcon";

interface Props {
  onClick?: () => void;
}

const BackButton: React.FC<Props> = ({ onClick }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleBack}
      className="absolute z-10 rounded-rm w-[4rem] h-[4rem] bg-transparent shrink-0 "
    >
      <ChevronIcon type="left" color="white" />
    </button>
  );
};

export default BackButton;
