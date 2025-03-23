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
import Toast from "@/common/components/Toast";
import { useUser } from "@/components/userContext";

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
    const { user } = useUser();
    const [pendingBalances, setPendingBalances] = useState<number | null>(null);
    const [userBalance, setUserBalance] = useState<number | null>(null);

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
      co2: 200,
      trees: 2,
      water: 10,
      energy: 50,
    });
    const [historialData, setHistorialData] = useState<RecyclingHistoryItem[]>([
      {
        id: 10,
        status: "2 Bottles recycled",
        createdAt: "2025-03-22",
        updatedAt: "2025-03-22",
      },
      {
        id: 20,
        status: "2 Bottles and 2 cans recycled",
        createdAt: "2025-03-22",
        updatedAt: "2025-03-22",
      },
      {
        id: 5,
        status: "1 Can recycled",
        createdAt: "2025-03-22",
        updatedAt: "2025-03-22",
      },
    ]);

    const fetchHistory = async () => {};

    const fetchMetrics = async () => {};

    const fetchUserPendingBalances = async () => {
      try {
        const response = await fetch(
          `/api/get-user-pending-balances?address=${user?.walletAddress}`
        );
        console.log("data", response);
        const data = await response.json();

        if (data.success) {
          setPendingBalances(data.data ?? 0);
        }
      } catch (e) {
        console.error("Error fetching user pending balances", e);
      }
    };

    const fetchUserBalance = async () => {
      try {
        const response = await fetch(
          `/api/get-user-balances?address=${user?.walletAddress}`
        );
        console.log("data", response);
        const data = await response.json();

        if (data.success) {
          setUserBalance(data.data ?? 0);
        }
      } catch (e) {
        console.error("Error fetching user pending balances", e);
      }
    };

    const onSendClick = () => {
      //toast.error("Funcionalidad en desarrollo");
      //router.push("/backoffice/producer");
    };

    const onWithdrawClick = () => {
      //toast.error("Funcionalidad en desarrollo");
    };

    const onScanClick = () => {
      handleVerify();
    };

    useEffect(() => {
      fetchMetrics();
      fetchHistory();
      fetchUserPendingBalances();
      fetchUserBalance();
    }, []);

    const viewProps: HomeViewProps = {
      metrics,
      historialData,
      mainBalance: userBalance?.toString() ?? "0",
      balanceSubtitle: `Currently $${((userBalance ?? 0) * 2).toString()} `,
      pendingBalances: pendingBalances ?? 0,
      onSendClick,
      onWithdrawClick,
      onScanClick,
    };

    return <View {...viewProps} />;
  };

export default withHomeController;
