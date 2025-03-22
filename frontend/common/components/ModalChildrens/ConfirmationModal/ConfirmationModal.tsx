import { useEffect, useState } from 'react';
import { ImageProps } from 'next/image';
import Modal, { ModalProps } from '@/common/components/Modal';
import Button from '@/common/components/Button';
import Img from '@/common/components/Img';
import cn from '@/common/utils/classNames';

interface Props extends ModalProps {
  handleConfirm?: () => any;
  handleCancel: () => any;
  icon?: ImageProps['src'] | null;
  title: string;
  subtitle?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  disableConfirm?: boolean;
  hideCancel?: boolean;
  hideButtons?: boolean;
  isDangerousAction?: boolean;
}

const CONTAINER_STYLES = 'w-[380px] w-max-full items-center gap-3xl';

const ICON_STYLES = 'w-[4rem] h-[4rem]';
const TITLE_STYLES = 'font-bold text-center';
const SUBTITLE_STYLES = 'text-center';

const TITLES_CTN_STYLES = 'gap-s';
const BTN_CTN_STYLES = 'gap-s';

const ConfirmationModal = ({
  icon,
  title,
  subtitle,
  confirmLabel = 'Aceptar',
  cancelLabel = 'Cancelar',
  handleConfirm = () => {},
  handleCancel = () => {},
  disableConfirm = false,
  hideCancel = false,
  hideButtons = false,
  isDangerousAction = false,
  children,
  ...props
}: Props) => {
  const [dangerousActionCountDown, setDangerousActionCountDown] = useState(5);

  useEffect(() => {
    if (isDangerousAction && dangerousActionCountDown > 0) {
      const timer = setTimeout(() => {
        setDangerousActionCountDown(Math.max(dangerousActionCountDown - 1, 0));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [dangerousActionCountDown]);

  return (
    <Modal
      handleCancel={handleCancel}
      skippable
      hideCloseButton={!hideCancel}
      big={false}
      contentClassName={cn('flex flex-col', CONTAINER_STYLES)}
      {...props}
    >
      {icon && (
        <Img
          src={icon}
          alt="icon"
          className={cn('object-contain mx-auto', ICON_STYLES)}
        />
      )}
      <div className={cn('flex flex-col w-full', TITLES_CTN_STYLES)}>
        <h3 className={TITLE_STYLES}>{title}</h3>
        {subtitle && <h6 className={SUBTITLE_STYLES}>{subtitle}</h6>}
      </div>

      {children}

      {!hideButtons && (
        <div className={cn('flex flex-col w-full', BTN_CTN_STYLES)}>
          <Button
            label={
              isDangerousAction && dangerousActionCountDown > 0
                ? `${confirmLabel} (${dangerousActionCountDown})`
                : confirmLabel
            }
            handleClick={handleConfirm}
            disabled={
              (isDangerousAction && dangerousActionCountDown > 0) ||
              disableConfirm
            }
            width="full"
            className={
              isDangerousAction && dangerousActionCountDown === 0
                ? '!bg-fe1 !shadow-e1'
                : ''
            }
          />
          {!hideCancel && (
            <Button
              label={cancelLabel}
              handleClick={handleCancel}
              variant="simple"
              width="full"
            />
          )}
        </div>
      )}
    </Modal>
  );
};

export default ConfirmationModal;
