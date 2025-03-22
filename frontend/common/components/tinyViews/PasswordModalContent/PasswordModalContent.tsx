import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '@/common/components/Button';
import useLoginContext from '@/common/libraries/auth';

interface Props {
  email: string;
}

const PasswordModalContent: React.FC<Props> = ({ email }) => {
  const { sendRecoverPasswordMail } = useLoginContext();
  const [resendCountDown, setResendCountDown] = useState(0);
  const [isFirstTry, setIsFirstTry] = useState(true);

  useEffect(() => {
    if (resendCountDown > 0) {
      const timer = setTimeout(() => {
        setResendCountDown(Math.max(resendCountDown - 1, 0));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCountDown]);

  const handleSendMail = async () => {
    const { ok } = await sendRecoverPasswordMail(email);
    if (ok) {
      toast.success('¡Ya enviamos el email! Revisa tu bandeja de entrada.');
      setResendCountDown(40);
      setIsFirstTry(false);
    } else {
      toast.error(
        'No hemos podido enviar el email. Inténtalo de nuevo más tarde.'
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 min-h-[70vh] justify-center">
      <h2 className="font-title text-[2.25rem] font-bold leading-none mt-6">
        ¿Olvidaste tu contraseña?
      </h2>
      <p className="text-[1.375rem]">
        Te enviaremos un email a {email} para restablecer tu contraseña.
      </p>
      <Button
        label={
          isFirstTry
            ? 'Enviar email'
            : 'Reenviar email' +
              (resendCountDown > 0
                ? ` (00:${resendCountDown.toString().padStart(2, '0')})`
                : '')
        }
        disabled={resendCountDown > 0}
        iconStart="/assets/icon-email.svg"
        width="w-[90%]"
        className="my-6"
        handleClick={handleSendMail}
      />
      <p className="text-center text-n3">
        ¿No lo recibiste? 😟
        <br />
        ¡No olvides revisar la carpeta de spam!
      </p>
    </div>
  );
};

export default PasswordModalContent;
