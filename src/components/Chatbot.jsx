import React, { useState } from "react";

// components goes here


const Chatbot = ({ products }) => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! 👋 Ask me about products (e.g. cheap, movies...)" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    let reply = "Sorry, I didn’t find anything.";

    const text = input.toLowerCase();

    // 🎯 Smart product search
    if (text.includes("cheap")) {
      const cheapProducts = products.filter(p => p.product_cost < 1000);
      if (cheapProducts.length > 0) {
        reply = "Cheap products:\n" + cheapProducts
          .slice(0, 3)
          .map(p => `- ${p.product_name} (Ksh ${p.product_cost})`)
          .join("\n");
      }
    }

    else if (text.includes("expensive")) {
      const expensive = products.filter(p => p.product_cost > 5000);
      if (expensive.length > 0) {
        reply = "Expensive products:\n" + expensive
          .slice(0, 3)
          .map(p => `- ${p.product_name} (Ksh ${p.product_cost})`)
          .join("\n");
      }
    }

    else {
      // 🔍 Search by name or description
      const results = products.filter(p =>
        p.product_name.toLowerCase().includes(text) ||
        p.product_description.toLowerCase().includes(text)
      );

      if (results.length > 0) {
        reply = "Here are some results:\n" + results
          .slice(0, 3)
          .map(p => `- ${p.product_name} (Ksh ${p.product_cost})`)
          .join("\n");
      }
    }

    const botMessage = { sender: "bot", text: reply };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px"
    }}>
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          Shopping Assistant 🤖
        </div>

        <div className="card-body" style={{ height: "300px", overflowY: "auto", whiteSpace: "pre-line" }}>
          {messages.map((msg, index) => (
            <div key={index} className={`text-${msg.sender === "user" ? "end" : "start"}`}>
              <p className={`p-2 rounded ${
                msg.sender === "user" ? "bg-primary text-white" : "bg-light"
              }`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        <div className="card-footer d-flex">
          <input
            type="text"
            className="form-control"
            placeholder="Ask about products..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn btn-success ms-2" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;