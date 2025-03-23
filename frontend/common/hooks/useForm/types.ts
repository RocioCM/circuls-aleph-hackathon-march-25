export type FieldValue = any;

export type FormHandleChange = (
  name: string,
  value: FieldValue,
  isManualChange?: boolean
) => void;
