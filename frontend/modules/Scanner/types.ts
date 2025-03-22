import { Dispatch, SetStateAction } from "react";

export interface ScannerViewProps {
  currentStep: number;
  containerQR: string;
  itemsQR: string[];
  isLoading: boolean;
  handleScanContainer: (data: string) => void;
  handleScanItem: (data: string) => void;
  finishScanning: () => void;
}

export type ScannerViewType = (props: ScannerViewProps) => JSX.Element;
