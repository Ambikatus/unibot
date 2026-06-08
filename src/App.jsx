import React, { useState, useEffect } from "react";
import { Bot, User } from "lucide-react";

function App() {
  const [messages, setMessages] = useState([
  {
    sender: "bot",
    text: "¡Hola! 👋 Soy UniBot...",
    time: new Date().toLocaleTimeString()
  }
]);

  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
  const history = localStorage.getItem("chatHistory");

  if (history) {
    setMessages(JSON.parse(history));
  }
}, []);
useEffect(() => {
  localStorage.setItem(
    "chatHistory",
    JSON.stringify(messages)
  );
}, [messages]);

  const getResponse = (message) => {
    const msg = message.toLowerCase();

    // Programación
    if (
      msg.includes("python") ||
      msg.includes("java") ||
      msg.includes("javascript") ||
      msg.includes("programacion")
    ) {
      return "La programación permite crear software mediante instrucciones llamadas algoritmos. Lenguajes populares incluyen Python, Java y JavaScript.";
    }

    // Bases de datos
    if (
      msg.includes("mysql") ||
      msg.includes("sql") ||
      msg.includes("base de datos")
    ) {
      return "Una base de datos es un conjunto organizado de información. MySQL es uno de los sistemas gestores de bases de datos más utilizados.";
    }

    // Inteligencia Artificial
    if (
  msg.includes("inteligencia artificial") ||
  msg.includes("ia") ||
  msg.includes("machine learning")
)
{
  const respuestasIA = [
    "La Inteligencia Artificial permite que las máquinas aprendan de los datos.",
    "La IA se utiliza en salud, educación, finanzas y ciberseguridad.",
    "Machine Learning es una rama de la Inteligencia Artificial.",
    "La IA ayuda a automatizar procesos y mejorar la toma de decisiones."
  ];

  return respuestasIA[
    Math.floor(Math.random() * respuestasIA.length)
  ];
}

    // IHC
    if (
      msg.includes("ihc") ||
      msg.includes("ux") ||
      msg.includes("ui") ||
      msg.includes("usabilidad")
    ) {
      return "La Interacción Humano-Computadora estudia cómo las personas interactúan con sistemas tecnológicos para mejorar la experiencia del usuario.";
    }

    // Matemáticas
    if (
      msg.includes("matematicas") ||
      msg.includes("álgebra") ||
      msg.includes("algebra") ||
      msg.includes("ecuacion")
    ) {
      return "Las matemáticas son fundamentales para resolver problemas científicos, tecnológicos y de ingeniería.";
    }

    // Redes
    if (
      msg.includes("redes") ||
      msg.includes("tcp") ||
      msg.includes("ip") ||
      msg.includes("socket")
    ) {
      return "Las redes permiten la comunicación entre dispositivos mediante protocolos como TCP/IP.";
    }

    // Ciberseguridad
    if (
      msg.includes("ciberseguridad") ||
      msg.includes("seguridad informatica") ||
      msg.includes("hacker")
    ) {
      return "La ciberseguridad busca proteger sistemas, redes y datos frente a amenazas digitales.";
    }

    // Técnicas de estudio
    if (
      msg.includes("estudiar") ||
      msg.includes("tecnica de estudio") ||
      msg.includes("examen")
    ) {
      return "Puedes utilizar técnicas como Pomodoro, mapas conceptuales, resúmenes y práctica constante para mejorar tu aprendizaje.";
    }

    // APA
    if (
      msg.includes("apa") ||
      msg.includes("referencias") ||
      msg.includes("citar")
    ) {
      return "En APA 7 una referencia básica sigue el formato: Autor. (Año). Título. Editorial o fuente.";
    }

    // Productividad
    if (
      msg.includes("productividad") ||
      msg.includes("organizar") ||
      msg.includes("tareas")
    ) {
      return "Puedes organizar tus actividades usando herramientas como Notion, Trello o Google Calendar.";
    }

    // Universidad
    if (
      msg.includes("universidad") ||
      msg.includes("carrera") ||
      msg.includes("estudiante")
    ) {
      return "La organización y la disciplina son factores clave para el éxito académico universitario.";
    }

    // Saludo
    if (
      msg.includes("hola") ||
      msg.includes("buenas") ||
      msg.includes("saludos")
    ) {
      return "¡Hola! ¿En qué tema académico puedo ayudarte hoy?";
    }

    // Despedida
    if (
      msg.includes("adios") ||
      msg.includes("hasta luego") ||
      msg.includes("gracias")
    ) {
      return "¡Mucho éxito en tus estudios! 📚";
    }

    return "Lo siento, no tengo información sobre ese tema. Intenta preguntar sobre programación, bases de datos, IA, IHC, matemáticas, ciberseguridad, normas APA o técnicas de estudio.";
  };

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = input;

  setMessages((prev) => [
    ...prev,
    {
      sender: "user",
      text: userMessage,
      time: new Date().toLocaleTimeString(),
    },
  ]);

  setInput("");

  try {
    const response = await fetch("/api/chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: userMessage,
  }),
});

    const data = await response.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: data.reply,
        time: new Date().toLocaleTimeString(),
      },
    ]);
  } catch (error) {
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "No pude conectar con la IA.",
        time: new Date().toLocaleTimeString(),
      },
    ]);
  }
};

  return (
    <div
      style={{
        backgroundColor: darkMode ? "#0f172a" : "#eef3ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: darkMode ? "#1e293b" : "white",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          overflow: "hidden"
        }}
      >
        <div
  style={{
    background: "linear-gradient(135deg, #2563eb, #1e40af)",
    color: "white",
    padding: "20px",
    textAlign: "center"
  }}
>
  <h2>🎓 UniBot</h2>
  <p>Asistente Académico Inteligente</p>
</div>
        <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    padding: "5px 10px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer"
  }}
>
  {darkMode ? "☀️ Claro" : "🌙 Oscuro"}
</button>
<button
  onClick={() => {
    localStorage.removeItem("chatHistory");
    window.location.reload();
  }}
  style={{
    marginLeft: "10px",
    padding: "5px 10px"
  }}
>
  🗑️ Limpiar Chat
</button>

        <div
          style={{
            height: "400px",
            overflowY: "auto",
            padding: "15px"
          }}
        >
          {messages.map((msg, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent:
        msg.sender === "user"
          ? "flex-end"
          : "flex-start",
      marginBottom: "10px"
    }}
  >
    {msg.sender === "bot" && (
      <Bot
        size={18}
        style={{ marginRight: "8px" }}
      />
    )}

    <div
      style={{
        backgroundColor:
          msg.sender === "user"
            ? "#2563eb"
            : "#f1f5f9",
        color:
          msg.sender === "user"
            ? "white"
            : "black",
        padding: "10px",
        borderRadius: "15px",
        maxWidth: "75%"
      }}
    >
      {msg.text}
      <br />
      <small>{msg.time}</small>
    </div>

    {msg.sender === "user" && (
      <User
        size={18}
        style={{ marginLeft: "8px" }}
      />
    )}
  </div>
))}
        </div>

        <div
          style={{
            display: "flex",
            padding: "15px",
            borderTop: "1px solid #ddd"
          }}
        >
          <div style={{ padding: "10px" }}>
            <p>Sugerencias de busqueda</p>
  <button
  onClick={() => setInput("programacion")}
  style={{
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    margin: "5px",
    backgroundColor: "#dbeafe",
    cursor: "pointer"
  }}
>
  💻 Programación
</button>

  <button
  onClick={() => setInput("Inteligencia Artifical")}
  style={{
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    margin: "5px",
    backgroundColor: "#dbeafe",
    cursor: "pointer"
  }}
>
  🤖 IA
</button>

  <button
  onClick={() => setInput("Base de Datos")}
  style={{
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    margin: "5px",
    backgroundColor: "#dbeafe",
    cursor: "pointer"
  }}
>
  🗄️ Base de Datos
</button>

  <button
  onClick={() => setInput("Ciberseguridad")}
  style={{
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    margin: "5px",
    backgroundColor: "#dbeafe",
    cursor: "pointer"
  }}
>
  🔒 Ciberseguridad
</button>
</div>
          <input
            type="text"
            value={input}
            placeholder="Escribe tu pregunta..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc"
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              cursor: "pointer"
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;