import { useEffect, useState } from "react";
import { LoginViewType, LoginViewProps, User } from "./types";
import { toast } from "react-toastify";
import { MiniKit, WalletAuthInput } from "@worldcoin/minikit-js";
import { Button } from "@worldcoin/mini-apps-ui-kit-react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/userContext";

const walletAuthInput = (nonce: string): WalletAuthInput => {
  return {
    nonce,
    requestId: "0",
    expirationTime: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    notBefore: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
    statement:
      "This is my statement and here is a link https://worldcoin.com/apps",
  };
};

const withLoginController = (View: LoginViewType) =>
  function Controller(): JSX.Element {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user, setUser } = useUser();
    const router = useRouter();

    const handleLogout = async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
        });
        setUser(null);
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    const handleSubmit = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/nonce`);
        const { nonce } = await res.json();
        const { finalPayload } = await MiniKit.commandsAsync.walletAuth(
          walletAuthInput(nonce)
        );
        if (finalPayload.status === "error") {
          setIsLoading(false);
          return;
        } else {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              payload: finalPayload,
              nonce,
            }),
          });
          if (response.status === 200) {
            setUser(MiniKit.user);
            console.log("User:", MiniKit.user);
            router.push("recycler/home");
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Login error:", error);
        setIsLoading(false);
      }
    };

    const viewProps: LoginViewProps = {
      handleSubmit,
      isLoading,
    };

    return <View {...viewProps} />;
  };

export default withLoginController;
