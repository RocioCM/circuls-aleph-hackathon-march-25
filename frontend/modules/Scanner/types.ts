import { Dispatch, SetStateAction } from "react";

export interface ScannerViewProps {
  wizardStep: number;
  isLoading: boolean;
  containerQR: string;
  itemsQR: string[];
  totalCircoins: number;
  handleScanContainer: (data: string) => void;
  handleScanItem: (data: string) => void;
  finishScanning: () => void;
  scanAgain: () => void;
}

export type ScannerViewType = (props: ScannerViewProps) => JSX.Element;
