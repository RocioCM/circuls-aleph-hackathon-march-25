import React from 'react';

export type ProducerViewProps = {
  codes: {code: number; deposit: number}[];
  code: number | '';
  deposit: number;
  setCode: (value: number | '') => void;
  setCodes: (params: any) => void;
  setDeposit: (value: number) => void;
  handleAdd: () => void;
  handleSubmit: () => void;
};

export type ProducerViewType = React.FC<ProducerViewProps>;
