import { useState, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");


  useEffect(() => {
    const loadMessages = async () => {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: "user123" }),
      });

      const data = await res.json();
      setMessages(data);
    };

    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", message: input };
    setMessages([...messages, newMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: "user123", message: input }),
    });

    const { reply } = await res.json();
    setMessages([...messages, newMessage, { sender: "ai", message: reply }]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-gray-100">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"} mb-2`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 border rounded-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Text message here..."
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Send</button>
      </div>
    </div>
  );
}