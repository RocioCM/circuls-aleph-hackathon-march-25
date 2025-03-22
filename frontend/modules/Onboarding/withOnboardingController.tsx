import { useState } from "react";
import { OnboardingViewType, OnboardingViewProps } from "./types";
import { useRouter } from "next/navigation";
import { STEPS } from "./constants";

const withOnboardingController = (View: OnboardingViewType) =>
  function Controller(): JSX.Element {
    const [step, setStep] = useState(0);
    const [showQuoteSlide, setShowQuoteSlide] = useState(false);
    const router = useRouter();

    const handleBack = () => {
      if (step > 0) {
        setStep(step - 1);
      } else {
        router.back();
      }
    };

    const handleNext = () => {
      if (step >= STEPS.length - 1) {
        setShowQuoteSlide(true);
      } else {
        setStep(step + 1);
      }
    };

    const handleBackQuote = () => {
      setShowQuoteSlide(false);
    };

    const handleFinish = () => {
      router.push("/recycler");
    };

    const viewProps: OnboardingViewProps = {
      step,
      totalSteps: STEPS.length,
      showQuoteSlide,
      handleBack,
      handleNext,
      handleFinish,
      handleBackQuote,
    };

    return <View {...viewProps} />;
  };

export default withOnboardingController;
