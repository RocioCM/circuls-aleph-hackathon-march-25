// -------- VIEW / CONTROLLER -------- //

export interface OnboardingViewProps {
  step: number;
  totalSteps: number;
  showQuoteSlide: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleFinish: () => void;
  handleBackQuote: () => void;
}

export type OnboardingViewType = React.FC<OnboardingViewProps>;

export interface OnboardingControllerProps {}

// ---------- SERVICES ---------- //

export interface Onboarding {
  name: string;
}
