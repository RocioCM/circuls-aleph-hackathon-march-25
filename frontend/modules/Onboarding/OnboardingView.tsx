import withOnboardingController from './withOnboardingController';
import { OnboardingViewType } from './types';
import View from '@/common/components/View';
import Card from '@/common/components/Card';
import Stepper from '@/common/components/Stepper';
import { STEPS } from './constants';
import Button from '@/common/components/Button';
import Img from '@/common/components/Img';
import cn from '@/common/utils/classNames';

const OnboardingView: OnboardingViewType = ({
  step,
  totalSteps,
  showQuoteSlide,
  handleBack,
  handleNext,
  handleBackQuote,
  handleFinish,
}) => {
  const currentStep = STEPS[step];
  return (
    <>
      <View
        bgImg="/assets/bg-green.jpeg"
        className="p-4 flex flex-col justify-end !overflow-hidden relative"
      >
        <Card
          paddingX="xl"
          className="relative backdrop-blur-2xl !bg-[#ffffff80] flex flex-col gap-4 !py-[4rem] rounded-3xl"
        >
          <Img
            key={currentStep.key}
            src={currentStep.iconUrl}
            alt="Ilustración"
            className="absolute bottom-full left-0 right-0 mx-auto h-[15rem] w-auto animate__animated animate__slideInRight"
            width={300}
            height={300}
          />
          <h1 className="font-medium">{currentStep.title}</h1>
          <p className="text-base text-n3 mb-4">{currentStep.description}</p>
          <div className="flex justify-between mb-8">
            <Button variant="simple" label="Volver" onClick={handleBack} />
            <Button
              label={currentStep.buttonLabel}
              onClick={handleNext}
              iconEnd="/assets/icon-right-arrow.svg"
              width="w-max min-w-[13rem]"
            />
          </div>
          <Stepper currentStep={step} totalSteps={totalSteps} hideLabels />
        </Card>
      </View>

      <View
        bgImg={null}
        className={cn(
          'bg-p2 !fixed top-0 transition-[left] duration-300 ease-out px-[2.6rem] py-[5rem] flex flex-col gap-12 justify-center text-n0',
          showQuoteSlide ? 'left-0' : 'left-full'
        )}
      >
        <p className="text-base leading-relaxed mt-12">
          “Desde Circul creemos que la lucha contra el cambio climatico se da
          desde la creatividad y el desarrollo de tecnologias que le permitan a
          todos aportar, esta es la primera. Esperamos cada granito de arena que
          puedan aportar. Un saludo grande de parte de todo el equipo.”
        </p>
        <div className="flex gap-4 items-center">
          <Img
            src="/assets/logo.png"
            alt="Foto del equipo"
            className="rounded-full h-10 w-10 object-cover border border-n0 text-transparent"
            width={100}
            height={100}
          />
          <p className="text-sm font-bold">Equipo de Circul</p>
        </div>
        <div className="flex justify-between mt-4">
          <Button
            variant="simple"
            className="!text-n0"
            label="Volver"
            onClick={handleBackQuote}
          />
          <Button
            label="Continuar"
            onClick={handleFinish}
            iconEnd="/assets/icon-right-arrow.svg"
            width="w-max min-w-[13rem]"
          />
        </div>
      </View>
    </>
  );
};

export default withOnboardingController(OnboardingView);
