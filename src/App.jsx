import React, { useState, useEffect } from "react";
import {
  Bot,
  User,
  Send,
  PlusCircle,
  Moon,
  Sun
} from "lucide-react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hola, soy UniBot. ¿En qué puedo ayudarte hoy?"
    }
  ]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
  const savedMessages =
    localStorage.getItem("unibotMessages");

  if (savedMessages) {
    setMessages(JSON.parse(savedMessages));
  }
}, []);

useEffect(() => {
  localStorage.setItem(
    "unibotMessages",
    JSON.stringify(messages)
  );
}, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setInput("");

    try {
      const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: userMessage
  })
});

console.log("STATUS:", response.status);

if (!response.ok) {
  throw new Error(`Error HTTP ${response.status}`);
}

const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.reply
        }
      ]);
    } catch (error) {
  console.error("ERROR:", error);

  setMessages((prev) => [
    ...prev,
    {
      sender: "bot",
      text: "❌ Error al conectar con la IA."
    }
  ]);
}
  };

  return (
    <div className={darkMode ? "container dark" : "container light"}>
      <aside className="sidebar">
        <h2>🎓 UniBot</h2>

        <button
  className="new-chat"
  onClick={() => {
    localStorage.removeItem(
      "unibotMessages"
    );

    setMessages([
      {
        sender: "bot",
        text:
          "👋 Hola, soy UniBot. ¿En qué puedo ayudarte hoy?"
      }
    ]);
  }}
>
          <PlusCircle size={18} />
          Nueva conversación
        </button>
        <button
  className="theme-button"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
  {darkMode ? " Modo Claro" : " Modo Oscuro"}
</button>

        <div className="topics">
          <button onClick={() => setInput("Explícame los fundamentos de programación")}>
  💻 Programación
</button>

<button onClick={() => setInput("¿Qué es la inteligencia artificial?")}>
  🤖 IA
</button>

<button onClick={() => setInput("¿Qué es una base de datos relacional?")}>
  🗄️ Bases de Datos
</button>
<button onClick={() => setInput("¿Qué es la ciberseguridad?")}>
  🔒 Ciberseguridad
</button>
        </div>
      </aside>

      <main className="chat-area">
        <header className="chat-header">
          Asistente Académico Inteligente
        </header>

        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === "user"
                  ? "message user"
                  : "message bot"
              }
            >
              {msg.sender === "user" ? (
                <User size={18} />
              ) : (
                <Bot size={18} />
              )}

              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        <div className="input-area">
          <input
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            placeholder="Escribe tu pregunta..."
          />

          <button onClick={sendMessage}>
            <Send size={18} />
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;