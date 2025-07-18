// TonWalletConnect.tsx
import React, { useEffect } from "react";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";

export const TonWalletConnect = ({ telegramUser }: { telegramUser: any }) => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  useEffect(() => {
    if (wallet?.account?.address && telegramUser?.id) {
      fetch("http://localhost:3001/auth/ton-connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          publicKey: wallet.account.address,
          telegramUser,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Authorized!", data);
          localStorage.setItem("auth_token", data.token);
        })
        .catch((err) => {
          console.error("Auth error:", err);
        });
    }
  }, [wallet?.account?.address, telegramUser]);

  return <TonConnectButton />;
};
