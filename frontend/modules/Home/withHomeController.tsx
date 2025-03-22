import { useEffect, useState, useCallback } from "react";
import {
  HomeViewType,
  HomeViewProps,
  RecyclingHistoryItem,
  Metrics,
} from "./types";
import { WHATSAPP_LINK } from "@/common/constants/contact";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  MiniKit,
  VerificationLevel,
  ISuccessResult,
  MiniAppVerifyActionErrorPayload,
  IVerifyResponse,
} from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";

export type VerifyCommandInput = {
  action: string;
  signal?: string;
  verification_level?: VerificationLevel; // Default: Orb
};

const verifyPayload: VerifyCommandInput = {
  action: "log-in", // This is your action ID from the Developer Portal
  signal: "",
  verification_level: VerificationLevel.Orb, // Orb | Device
};

const withHomeController = (View: HomeViewType) =>
  function Controller(): JSX.Element {
    const router = useRouter();

    const [handleVerifyResponse, setHandleVerifyResponse] = useState<
      MiniAppVerifyActionErrorPayload | IVerifyResponse | null
    >(null);
    const [verified, setVerified] = useState<boolean>(false);

    const handleVerify = useCallback(async () => {
      if (!MiniKit.isInstalled()) {
        console.warn("Tried to invoke 'verify', but MiniKit is not installed.");
        return;
      }

      const { finalPayload } = await MiniKit.commandsAsync.verify(
        verifyPayload
      );

      // no need to verify if command errored
      if (finalPayload.status === "error") {
        console.log("Command error");
        console.log(finalPayload);

        setHandleVerifyResponse(finalPayload);
        return finalPayload;
      }

      // Verify the proof in the backend
      const verifyResponse = await fetch(`/api/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult, // Parses only the fields we need to verify
          action: verifyPayload.action,
          signal: verifyPayload.signal, // Optional
        }),
      });

      // TODO: Handle Success!
      const verifyResponseJson = await verifyResponse.json();
      setHandleVerifyResponse(verifyResponseJson);
      if (verifyResponseJson.status === 200) {
        router.push("/recycler/scanner");
        console.log(finalPayload);
        setVerified(true);
      } else {
        toast.error(
          `Lo sentimos, ocurrió un error al verificar tu identidad ${JSON.stringify(
            handleVerifyResponse,
            null,
            2
          )}`
        );
      }

      return verifyResponseJson;
    }, []);

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

    const onSendClick = () => {
      router.push("/backoffice/producer");
    };

    const onWithdrawClick = () => {};

    const onScanClick = () => {
      handleVerify();
    };

    useEffect(() => {
      fetchMetrics();
      fetchHistory();
    }, []);

    const viewProps: HomeViewProps = {
      metrics,
      historialData,
      mainBalance: "100",
      balanceSubtitle: "Currently $2034,14",
      onSendClick,
      onWithdrawClick,
      onScanClick,
      handleWhatsAppClick,
      handleInstagramClick,
      handleLinkedInClick,
    };

    return <View {...viewProps} />;
  };

export default withHomeController;
