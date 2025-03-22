import { Dispatch, SetStateAction } from "react";

export interface ScannerViewProps {
  wizardStep: number;

  containerQR: string;
  itemsQR: string[];
  totalCircoins: number;
  scanningLock: boolean;
  handleScanContainer: (data: string) => void;
  handleScanItem: (data: string) => void;
  finishScanning: () => void;
  scanAgain: () => void;
}

export type ScannerViewType = (props: ScannerViewProps) => JSX.Element;
