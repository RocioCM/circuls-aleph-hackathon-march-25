import withLoginController from "./withLoginController";
import { LoginViewType } from "./types";
import Button from "@/common/components/Button";
import BackButton from "@/common/components/BackButton";
import Img from "@/common/components/Img";
import Card from "@/common/components/Card";
import View from "@/common/components/View";

const LoginView: LoginViewType = ({ handleSubmit, isLoading }) => {
  return (
    <View
      className="p-7 relative flex flex-col gap-2 justify-end"
      bgImg="/assets/bg-green-bottom.jpeg"
    >
      <h1 className="font-main font-normal text-[2.25rem] leading-tight pr-6 mb-20">
        Acá reciclar es <br />
        simple, rápido y <br />
        vale la pena <br />
        <span className="text-p1 border border-p1 rounded-full px-3">
          100%
        </span>{" "}
        tu <br /> esfuerzo
      </h1>
      <Card
        shadow="big"
        rounded="l"
        padding="xl"
        className="w-full h-max mt-6 relative mb-20"
      >
        <Img
          src="/assets/icon-recycle-auth-full.png"
          alt="Huella de carbono"
          width="150"
          height="150"
          className="w-[10rem] h-auto object-contain absolute -top-[8rem] -right-7 -z-[1]"
        />
        <Img
          src="/assets/icon-recycle-auth-front.png"
          alt="Huella de carbono"
          width="150"
          height="150"
          className="w-[10rem] h-auto object-contain absolute -top-[8rem] -right-7"
        />
        <form className="flex flex-col gap-s">
          <h3 className="p-2 text-sm text-center">
            Inicia sesion con tu WorldId
          </h3>
          <Button
            disabled={isLoading}
            width="w-[90%]"
            type="submit"
            handleClick={handleSubmit}
            isLoading={isLoading}
            className="mx-auto mt-6 mb-2"
            label="Continuar"
            iconEnd="/assets/icon-right-arrow.svg"
          />
        </form>
      </Card>
    </View>
  );
};

export default withLoginController(LoginView);
