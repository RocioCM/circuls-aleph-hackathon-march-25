// -------- VIEW / CONTROLLER -------- //

export interface HomeViewProps {
  metrics: Metrics;
  historialData: RecyclingHistoryItem[];

  // Variables de dinero (saldo)
  mainBalance: string; // ej: "100"
  balanceSubtitle: string; // ej: "Currently $2034,14"

  // Funciones de botones principales
  onSendClick: () => void;
  onWithdrawClick: () => void;
  onScanClick: () => void;
}

export interface Metrics {
  co2: number;
  trees: number;
  water: number;
  energy: number;
}

export type HomeViewType = React.FC<HomeViewProps>;

export interface HomeControllerProps {}

// ---------- SERVICES ---------- //

export interface RecyclingHistoryItem {
  id: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}
