import { useState } from "react";
import { Bot, X } from "lucide-react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { sender: "bot", text: res.data.reply.trim() },
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "❌ Something went wrong." ,err},
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-xl z-40 flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-2 font-semibold">
            AI Chatbot
          </div>

          <div className="flex-1 p-2 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="p-2 border-t">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-2 rounded border focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
