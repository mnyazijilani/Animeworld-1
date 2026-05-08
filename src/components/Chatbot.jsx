import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const initialMessage = {
  id: 1,
  text: "Hi! I'm AW, your anime movie guide. Ask me about Demon Slayer, Suzume, Attack on Titan, horror picks, sad movies, or beginner anime movies.",
  sender: "bot",
  timestamp: new Date(),
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const replyTimeoutRef = useRef(null);
  const nextMessageIdRef = useRef(2);
  const { cartItems, cartCount } = useCart();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current);
      }
    };
  }, []);

  const getNextMessageId = () => {
    const id = nextMessageIdRef.current;
    nextMessageIdRef.current += 1;
    return id;
  };

  const createMessage = (text, sender) => ({
    id: getNextMessageId(),
    text,
    sender,
    timestamp: new Date(),
  });

  const randomResponse = (responses) =>
    responses[Math.floor(Math.random() * responses.length)];

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("hey")
    ) {
      return randomResponse([
        "Hello! Welcome to AnimeWorld, where we can talk anime movies all day.",
        "Hi there! Want something emotional like Suzume, intense like Attack on Titan, or stylish like Demon Slayer?",
        "Hey! I can help you choose an anime movie mood or guide you to a section.",
      ]);
    }

    if (
      message.includes("demon slayer") ||
      message.includes("tanjiro") ||
      message.includes("kimetsu")
    ) {
      return "Demon Slayer is a great pick if you want emotional storytelling, strong visuals, and sword-fight energy. It fits especially well if you like heroic action with heart.";
    }

    if (message.includes("suzume")) {
      return "Suzume is perfect when you want something cinematic, emotional, and reflective. It has a softer atmosphere with a lot of beauty and feeling.";
    }

    if (
      message.includes("attack on titan") ||
      message.includes("aot") ||
      message.includes("titan")
    ) {
      return "Attack on Titan works best when you want something intense, dark, and high-stakes. It is one of the strongest choices for suspense and survival energy.";
    }

    if (
      message.includes("sad") ||
      message.includes("cry") ||
      message.includes("emotional")
    ) {
      return "If you want something emotional, try the Sad Movies page. Suzume is one of the strongest fits for that mood.";
    }

    if (
      message.includes("horror") ||
      message.includes("scary") ||
      message.includes("dark")
    ) {
      return "If you want darker or more intense anime movie energy, check the Horror Movies page. Attack on Titan-inspired picks usually land best there.";
    }

    if (
      message.includes("beginner") ||
      message.includes("start with") ||
      message.includes("first anime")
    ) {
      return "If you are just starting, use the Beginner Picks page. Demon Slayer and Suzume are both easy-entry anime favorites.";
    }

    if (message.includes("latest") || message.includes("new")) {
      return "The Latest Movies page is the best place to start if you want the freshest picks on the site.";
    }

    if (
      message.includes("product") ||
      message.includes("movie") ||
      message.includes("anime") ||
      message.includes("item") ||
      message.includes("buy") ||
      message.includes("shop")
    ) {
      return randomResponse([
        "Browse the home page for anime-themed movie picks, then use the navbar search if you already know the title or mood you want.",
        "You can explore themed sections like Sad Movies, Horror Movies, Latest Movies, and Beginner Picks.",
        "If you want a recommendation, tell me the mood you want and I’ll point you to the best anime movie section.",
      ]);
    }

    if (message.includes("cart") || message.includes("basket")) {
      if (cartCount === 0) {
        return "Your cart is empty right now. Add a few items and I can help you review them.";
      }

      return `You currently have ${cartCount} item${cartCount === 1 ? "" : "s"} in your cart across ${cartItems.length} product${cartItems.length === 1 ? "" : "s"}.`;
    }

    if (message.includes("help") || message.includes("what can you do")) {
      return "I can recommend anime movie moods, explain the Demon Slayer, Suzume, and Attack on Titan themes, guide you to movie pages, check your cart, and help with payment.";
    }

    if (
      message.includes("pay") ||
      message.includes("payment") ||
      message.includes("mpesa")
    ) {
      return randomResponse([
        "We accept M-Pesa payments for a simple and secure checkout experience.",
        "Payment is handled with M-Pesa. You can proceed to checkout and enter your phone number there.",
        "You can complete your order using M-Pesa during checkout.",
      ]);
    }

    if (message.includes("thank")) {
      return "You're welcome! Enjoy the anime movie hunt.";
    }

    return randomResponse([
      "Try asking about Demon Slayer, Suzume, Attack on Titan, horror movies, sad movies, or beginner anime picks.",
      "I can best help with anime movie recommendations, movie sections, your cart, and payment.",
      "Ask me which anime movie mood fits you and I’ll guide you from there.",
    ]);
  };

  const queueBotReply = (userText, delay = 900) => {
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current);
    }

    setIsTyping(true);

    replyTimeoutRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        createMessage(getBotResponse(userText), "bot"),
      ]);
      setIsTyping(false);
      replyTimeoutRef.current = null;
    }, delay);
  };

  const handleSendMessage = () => {
    const trimmedMessage = inputMessage.trim();

    if (!trimmedMessage || isTyping) {
      return;
    }

    setMessages((prev) => [...prev, createMessage(trimmedMessage, "user")]);
    setInputMessage("");
    queueBotReply(trimmedMessage, 1000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickReply = (text) => {
    setMessages((prev) => [...prev, createMessage(text, "user")]);
    queueBotReply(text, 500);
  };

  const quickActions = [
    {
      text: "Sad Movies",
      action: () => {
        setIsOpen(false);
        navigate("/movies/sad");
      },
    },
    {
      text: "Horror",
      action: () => {
        setIsOpen(false);
        navigate("/movies/horror");
      },
    },
    {
      text: "Beginner",
      action: () => {
        setIsOpen(false);
        navigate("/movies/beginner");
      },
    },
    {
      text: "View Cart",
      action: () => {
        setIsOpen(false);
        navigate("/cart");
      },
    },
    {
      text: "Help",
      action: () => handleQuickReply("help"),
    },
  ];

  return (
    <>
      <div
        className="position-fixed bottom-0 end-0 m-3"
        style={{ zIndex: 1050 }}
      >
        <button
          type="button"
          className="btn btn-success rounded-circle p-3 shadow-lg chatbot-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          style={{ width: "60px", height: "60px", fontSize: "24px" }}
          aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
        >
          {isOpen ? "✕" : "💬"}
        </button>
        {cartCount > 0 && !isOpen && (
          <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
            {cartCount}
          </span>
        )}
      </div>

      {isOpen && (
        <div
          className="position-fixed bottom-0 end-0 m-3 bg-white border shadow-lg rounded-top chatbot-window"
          style={{
            width: "350px",
            maxWidth: "calc(100vw - 1.5rem)",
            height: "500px",
            maxHeight: "calc(100vh - 6rem)",
            zIndex: 1049,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div className="bg-success text-white p-3 rounded-top d-flex align-items-center">
            <div className="me-2">
              <span style={{ fontSize: "20px" }}>🤖</span>
            </div>
            <div>
              <h6 className="mb-0">AnimeWorld Bot</h6>
              <small>Your anime movie guide</small>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white ms-auto"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            />
          </div>

          <div
            className="flex-grow-1 p-3 overflow-auto"
            style={{ maxHeight: "350px" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 d-flex ${
                  message.sender === "user"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded chatbot-message ${
                    message.sender === "user"
                      ? "bg-success text-white"
                      : "bg-light text-dark"
                  }`}
                  style={{ maxWidth: "80%", whiteSpace: "pre-line" }}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="mb-3 d-flex justify-content-start">
                <div className="bg-light text-dark p-2 rounded">
                  <div className="d-flex align-items-center">
                    <span>AnimeWorld Bot is typing</span>
                    <div className="ms-2 typing-dots">
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                      <span className="dot">.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="px-3 pb-2">
            <div className="d-flex gap-1 mb-2 flex-wrap">
              {quickActions.map((action) => (
                <button
                  key={action.text}
                  type="button"
                  className="btn btn-outline-success btn-sm"
                  onClick={action.action}
                >
                  {action.text}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 border-top">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(event) => setInputMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
              />
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
