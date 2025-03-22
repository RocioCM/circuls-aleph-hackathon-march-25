import cn from '@/common/utils/classNames';

const CONTAINER_STYLE = 'gap-s w-max mx-auto';
const LABEL_STYLE = 'text-s text-n3 pt-xs';

const BASE_STYLE = 'h-2 w-2 shrink-0';
const PAST_STYLE = 'bg-p1';
const CURRENT_STYLE = 'bg-p1';
const FUTURE_STYLE = 'bg-n2';

interface Props {
  totalSteps: number;
  currentStep: number;
  labels?: string[];
  hideLabels?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * @param totalSteps Total number of steps in the stepper
 * @param currentStep Current step in the stepper, starting from 0. Must be less than totalSteps and greater than or equal to 0.
 * @param labels Optional. Array of strings to display as labels for each step. If not provided, the default label will be "Paso 1", "Paso 2", etc.
 * @param hideLabels Optional. If true, labels will not be displayed.
 */
const Stepper: React.FC<Props> = ({
  totalSteps,
  currentStep,
  labels = [],
  hideLabels = false,
  className = '',
  containerClassName = '',
}) => {
  return (
    <div
      className={cn(
        'flex flex-row flex-nowrap items-center',
        CONTAINER_STYLE,
        containerClassName
      )}
    >
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={cn(
            'relative rounded-rl flex justify-center transition-all',
            BASE_STYLE,
            index < currentStep
              ? PAST_STYLE
              : index === currentStep
              ? CURRENT_STYLE
              : FUTURE_STYLE,
            className
          )}
        >
          {!hideLabels && index === currentStep && (
            <span className={cn('absolute top-full w-max', LABEL_STYLE)}>
              {labels[currentStep] || `Paso ${currentStep + 1}`}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
