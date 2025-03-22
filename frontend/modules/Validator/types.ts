import React from 'react';

export interface ValidatorViewProps {
  pendingContainerIds: null | number[];
  selectedContainerIds: number[];
  handleClickContainer: (containerId: number) => void;
  handleBulkReject: () => void;
  handleBulkAccept: () => void;
}

export type ValidatorViewType = React.FC<ValidatorViewProps>;
