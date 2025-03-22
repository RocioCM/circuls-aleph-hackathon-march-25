import React from 'react';
import {ProducerViewType} from './types';
import InputDropdown from '@/common/components/Inputs/InputDropdown';
import Button from '@/common/components/Button';
import InputNumber from '@/common/components/Inputs/InputNumber';
import withProducerController from './withProducerController';

const ProducerView: ProducerViewType = ({
  code,
  setCode,
  deposit,
  setDeposit,
  codes,
  setCodes,
  handleSubmit,
  handleAdd,
}) => {
  return (
    <main className="h-screen w-full max-w-[700px] px-3xl py-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Producer</h1>
      <p className="mb-4">
        On this page, the producer will be able to generate unique codes for
        their products. When saving this form, the codes are stored in the
        blockchain associated with their respective deposit.
      </p>
      <div className="flex gap-4 items-end">
        <InputNumber
          placeholder="123456"
          label="Unique ID"
          showFloatingLabel={false}
          name="code"
          value={code}
          handleChange={(_, value) => setCode(value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <InputDropdown
          inputLabel="Deposit"
          handleChange={(_, value) => setDeposit(value)}
          value={deposit}
          name="deposit"
          options={[
            {label: '1 Circoin', value: 100},
            {label: '1.25 Circoins', value: 125},
            {label: '1.5 Circoins', value: 150},
          ]}
          className="!w-[40%]"
        />
        <Button
          onClick={handleAdd}
          className="!w-max !h-[3.75rem] !rounded-rs"
          variant="secondary"
          disabled={!code}
        >
          Add
        </Button>
      </div>

      <div className="mt-4">
        <h2>Códigos:</h2>
        <ul>
          {codes.map((c) => (
            <li
              key={c.code}
              className="bg-lime-100 p-2 my-2 rounded-md flex items-center"
            >
              <span>
                {c.code} - {c.deposit} Circoins
              </span>
              <button
                className="ml-auto"
                onClick={() => {
                  setCodes((prev: {code: number; deposit: number}[]) =>
                    prev.filter((item) => item.code !== c.code)
                  );
                }}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Button
        className="mt-12 !sticky bottom-4"
        width="full"
        variant="primary"
        handleClick={handleSubmit}
        disabled={!codes.length}
      >
        Upload to blockchain
      </Button>
    </main>
  );
};

export default withProducerController(ProducerView);
