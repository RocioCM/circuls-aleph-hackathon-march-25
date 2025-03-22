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
      className="rounded-rm w-[3.125rem] h-[3.125rem] bg-n2 shrink-0 shadow-e1"
    >
      <ChevronIcon type="left" />
    </button>
  );
};

export default BackButton;
