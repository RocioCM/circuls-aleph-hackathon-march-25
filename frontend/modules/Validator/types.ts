import React from 'react';

export interface ValidatorViewProps {
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

export type ValidatorViewType = React.FC<ValidatorViewProps>;
