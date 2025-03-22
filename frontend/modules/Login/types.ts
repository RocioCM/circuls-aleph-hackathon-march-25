// -------- VIEW / CONTROLLER -------- //

export interface LoginViewProps {
  handleSubmit: () => void;
  isLoading: boolean;
}

export type LoginViewType = React.FC<LoginViewProps>;

export interface LoginControllerProps {}

export type User = {
  walletAddress: string;
  username: string | null;
  profilePictureUrl: string | null;
};

// ---------- SERVICES ---------- //

export interface Login {
  name: string;
}
