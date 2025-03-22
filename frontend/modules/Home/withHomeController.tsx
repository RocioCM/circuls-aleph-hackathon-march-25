import { useEffect, useState } from "react";
import {
  HomeViewType,
  HomeViewProps,
  RecyclingHistoryItem,
  Metrics,
} from "./types";
import { WHATSAPP_LINK } from "@/common/constants/contact";

import { toast } from "react-toastify";

const withHomeController = (View: HomeViewType) =>
  function Controller(): JSX.Element {
    const [metrics, setMetrics] = useState<Metrics>({
      co2: 0,
      trees: 0,
      water: 0,
      energy: 0,
    });
    const [historialData, setHistorialData] = useState<RecyclingHistoryItem[]>([
      {
        id: 1,
        status: "Reciclado",
        createdAt: "2021-09-01",
        updatedAt: "2021-09-01",
      },
      {
        id: 2,
        status: "Reciclado",
        createdAt: "2021-09-01",
        updatedAt: "2021-09-01",
      },
      {
        id: 3,
        status: "Reciclado",
        createdAt: "2021-09-01",
        updatedAt: "2021-09-01",
      },
    ]);

    const fetchHistory = async () => {
      // const { ok, data } = await HomeServices.getHistory();
      // if (ok) {
      //   setHistorialData(data ?? []);
      // } else {
      //   toast.error("Lo sentimos, ocurrió un error al cargar tu historial");
      // }
    };

    const fetchMetrics = async () => {
      // const { ok, data } = await HomeServices.getMetrics();
      // if (ok) {
      //   setMetrics(data);
      // } else {
      //   toast.error("Lo sentimos, ocurrió un error al cargar tus métricas");
      // }
    };

    const handleWhatsAppClick = () => {};

    const handleInstagramClick = () => {};

    const handleLinkedInClick = () => {};

    useEffect(() => {
      fetchMetrics();
      fetchHistory();
    }, []);

    const viewProps: HomeViewProps = {
      metrics,
      historialData,
      mainBalance: "100",
      balanceSubtitle: "Currently $2034,14",
      onSendClick: () => {},
      onWithdrawClick: () => {},
      onScanClick: () => {},
      handleWhatsAppClick,
      handleInstagramClick,
      handleLinkedInClick,
    };

    return <View {...viewProps} />;
  };

export default withHomeController;
