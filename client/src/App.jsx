import React, { useEffect, useState } from "react";
import './index.scss';

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
      alert("Данные сохранены");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="wrapper">
      <input 
        value={input1} 
        onChange={e => setInput1(e.target.value)} 
        placeholder="Значение 1" 
      />
      <input 
        value={input2} 
        onChange={e => setInput2(e.target.value)} 
        placeholder="Значение 2" 
      />
      <button onClick={handleSave}>Сохранить</button>
    </div>
  );
}