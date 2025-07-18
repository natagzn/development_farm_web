// App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { TonWalletConnect } from "./components/TonWalletConnect";

// @ts-ignore
const tg = window.Telegram?.WebApp;

function App() {
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [serverMessage, setServerMessage] = useState<string>("");

  useEffect(() => {
    if (tg?.initDataUnsafe?.user) {
      setTelegramUser(tg.initDataUnsafe.user);
    }

    tg?.ready();
    tg?.expand();
  }, []);

  const fetchProtected = async () => {
  const token = localStorage.getItem("auth_token");
  try {
    const res = await fetch("http://localhost:3001/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    console.log("Захищені дані:", data);
setServerMessage("Захищені дані: " + JSON.stringify(data, null, 2));

  } catch (err) {
    console.error("Не вдалося отримати захищені дані:", err);
    setServerMessage("Помилка під час з’єднання з сервером");
  }
};

  return (
    <div className="App">
      <h1>Привіт, {telegramUser?.first_name || "невідомий"} 👋</h1>

      <h1>Авторизуйтесь через TON Wallet</h1>
      <TonWalletConnect telegramUser={telegramUser} />

      <hr />
      <button onClick={fetchProtected}>me</button>
       {serverMessage && (
        <p>
          <strong>Сервер відповів:</strong> {serverMessage}
        </p>
      )}

    </div>
  );
}

export default App;
