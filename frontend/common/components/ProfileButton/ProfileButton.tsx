import { useRouter } from "next/navigation";
import Button from "../Button";
import Img from "../Img";

interface Props {}

const ProfileButton: React.FC<Props> = () => {
  const router = useRouter();

  const handleProfile = () => {
    router.push("/recycler/profile");
  };

  return (
    <Button
      className="ml-auto !bg-p2 !rounded-rm !p-s !shadow-e1"
      handleClick={handleProfile}
    >
      <Img
        src="/assets/icon-profile.svg"
        alt="Perfil"
        className="w-7 h-7 object-contain"
        width={50}
        height={50}
      />
    </Button>
  );
};

export default ProfileButton;
