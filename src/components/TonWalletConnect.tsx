import React, { useEffect } from "react";
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet
} from "@tonconnect/ui-react";

export const TonWalletConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  useEffect(() => {
    if (wallet?.account?.address) {
      fetch("http://localhost:3001/auth/ton-connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          address: wallet.account.address
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Authorized!", data);
          localStorage.setItem("auth_token", data.token); 
        });
    }
  }, [wallet?.account?.address]);

  return <TonConnectButton />;
};
