import { useEffect, useState } from 'react';
import './App.css';

// @ts-ignore
const tg = window.Telegram?.WebApp;

function App() {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    if (tg?.initDataUnsafe?.user) {
      setUserName(tg.initDataUnsafe.user.first_name || 'невідомий');
    } else {
      setUserName('невідомий 2212');
    }

    tg?.ready();
    tg?.expand();
  }, []);

  return (
    <div className="App">
      <p>tg: {JSON.stringify(tg)}</p>
      <p>tg.initDataUnsafe.user: {JSON.stringify(tg?.initDataUnsafe?.user)}</p>


      <h1>Привіт, {userName} 👋</h1>
      <p>Це Telegram WebApp на React</p>
    </div>
  );
}

export default App;
