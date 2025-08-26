import React, { useEffect, useState } from "react";

export default function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  useEffect(() => {
    fetch("http://localhost:4005/api/inputs")
      .then(res => res.json())
      .then(data => {
        setInput1(data.input1);
        setInput2(data.input2);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    try {
      await fetch("http://localhost:4005/api/inputs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input1, input2 })
      });
      alert("все ок");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input value={input1} onChange={e => setInput1(e.target.value)} placeholder="значение1" />
      <br /><br />
      <input value={input2} onChange={e => setInput2(e.target.value)} placeholder="значение2" />
      <br /><br />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}
