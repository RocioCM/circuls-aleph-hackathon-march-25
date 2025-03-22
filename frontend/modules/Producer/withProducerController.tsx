import {useState} from 'react';
import {ProducerViewType, ProducerViewProps} from './types';
import {toast} from 'react-toastify';

const withProducerController = (View: ProducerViewType) =>
  function Controller(): JSX.Element {
    const [codes, setCodes] = useState<{code: number; deposit: number}[]>([]);
    const [code, setCode] = useState<number | ''>('');
    const [deposit, setDeposit] = useState<number>(100);

    const handleAdd = () => {
      if (code && !codes.some(({code: c}) => c === code)) {
        setCodes((prev) => [...prev, {code, deposit}]);
        setCode('');
      }
    };

    const handleSubmit = async () => {
      if (codes.length) {
        for (const c of codes) {
          await sendTransaction(c.code, c.deposit);
        }
      }
      toast.success('Codes uploaded to blockchain');
    };

    const sendTransaction = async (code: number, deposit: number) => {
      try {
        const response = await fetch('/api/register-container', {
          method: 'POST',
          body: JSON.stringify({
            args: [code, deposit],
          }),
        });
        const data = await response.json();

        if (data.success) {
          setCodes((prevCodes) => prevCodes.filter((c) => c.code !== code));
        }
      } catch (e) {
        console.error('Error sending transaction', e);
      }
    };

    const viewProps: ProducerViewProps = {
      codes,
      code,
      deposit,
      setCode,
      setCodes,
      setDeposit,
      handleAdd,
      handleSubmit,
    };

    return <View {...viewProps} />;
  };

export default withProducerController;
