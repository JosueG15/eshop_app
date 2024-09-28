export type KeyboardTypeOptions =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad";

export type ErrorForm = {
  [key: string]: {
    message: string;
  };
};

export interface Field {
  name: string;
  label: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  isPhoneInput?: boolean;
  required?: boolean;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rules?: object;
}
