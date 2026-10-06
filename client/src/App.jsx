import React, { useEffect, useState } from "react";
import "./index.scss";

export default function App({ apiUrl = new URL("/api/inputs", window.location.protocol + "//" + window.location.hostname + ":4005").href }) {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data) => {
        setInput1(data.input1);
        setInput2(data.input2);
      })
      .catch(console.error);
  }, [apiUrl]);

  const handleSave = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input1, input2 }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      alert("Данные сохранены");
    } catch (e) {
      console.error(e);
      alert("Не удалось сохранить данные");
    }
  };

  return (
    <div className="app1-wrapper">
      <input
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
        placeholder="Значение 1"
      />
      <input
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
        placeholder="Значение 2"
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
