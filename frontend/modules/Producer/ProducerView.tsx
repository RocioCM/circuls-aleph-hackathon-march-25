import React, { useState } from "react";
import { ProducerViewType } from "./types";
import Input from "@/common/components/Inputs/Input";
import InputDropdown from "@/common/components/Inputs/InputDropdown";
import Button from "@/common/components/Button";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/common/constants/abi";
import { MiniKit } from "@worldcoin/minikit-js";
import InputNumber from "@/common/components/Inputs/InputNumber";

const ProducerView: ProducerViewType = ({}) => {
  const [codes, setCodes] = useState<{ code: number; deposit: number }[]>([]);
  const [code, setCode] = useState<number | "">("");
  const [deposit, setDeposit] = useState<number>(1);

  const handleAdd = () => {
    if (code && !codes.some(({ code: c }) => c === code)) {
      setCodes((prev) => [...prev, { code, deposit }]);
      setCode("");
    }
  };

  const handleSubmit = async () => {
    if (codes.length) {
      for (const c of codes) {
        await sendTransaction(c.code, c.deposit);
      }
    }
  };

  const sendTransaction = async (code: number, deposit: number) => {
    if (!MiniKit.isInstalled()) {
      console.log("MiniKit not installed");
      return;
    }

    const args = [code.toString(), deposit.toString()];

    console.log("args", args);
    // Primero, conecta la wallet si aún no lo está
    await connectWallet();

    const { commandPayload, finalPayload } =
      await MiniKit.commandsAsync.sendTransaction({
        transaction: [
          {
            address: CONTRACT_ADDRESS,
            abi: JSON.stringify(CONTRACT_ABI) as any,
            functionName: "registerContainer",
            args: args,
          },
        ],
      });
    console.log("commandPayload", commandPayload, finalPayload);

    // if (payload.status === 'error') {
    // 	console.error('Error sending transaction', payload)
    // } else {
    // 	setTransactionId(payload.transaction_id)
    // }
  };

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
            if (e.key === "Enter") {
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
            { label: "1 Circoin", value: 1 },
            { label: "1.25 Circoins", value: 1.25 },
            { label: "1.5 Circoins", value: 1.5 },
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
                  setCodes((prev) => prev.filter((item) => item !== c));
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

export default ProducerView;
