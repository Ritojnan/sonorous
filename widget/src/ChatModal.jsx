import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  LuBadgePercent,
  LuLanguages,
  LuMaximize,
  LuMinimize,
  LuRefreshCcw,
  LuThumbsDown,
  LuThumbsUp,
  LuSendHorizonal as Send,
  LuX as X,
} from "react-icons/lu";
import { motion } from "framer-motion";
import { AiOutlineWechatWork } from "react-icons/ai";
import MDXRenderer from "./MDXRenderer.jsx";
import Carousel from "./Carousel.jsx";
import SpeechRecognitionButton from "./SpeechRecognitionButton.jsx";
import SpeechSynthesisButton from "./SpeechSynthesisButton.jsx";
import LanguageSelector from "./LanguageSelector.jsx";
import { twMerge } from "tailwind-merge";

const ChatModal = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: 'user' }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      addBotMessage(data.message, data.type || 'text');
    } catch (error) {
      console.error("Failed to fetch data from the server:", error);
      addBotMessage('Sorry, there was an error processing your request.', 'text');
    } finally {
      setLoading(false);
    }
  };

  const addBotMessage = (text, type) => {
    let index = 0;
  
    const addNextCharacter = () => {
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const newText = text.slice(0, index + 1);
        if (lastMessage && lastMessage.sender === 'bot' && lastMessage.typing) {
          // Update the existing bot message with new character
          return [
            ...prevMessages.slice(0, -1),
            { text: newText, sender: 'bot', type, typing: true },
          ];
        } else {
          // Add a new bot message with the first character
          return [
            ...prevMessages,
            { text: newText, sender: 'bot', type, typing: true },
          ];
        }
      });
  
      index++;
      if (index < text.length) {
        setTimeout(addNextCharacter, 5); // Adjust the timeout for typing effect
      } else {
        // Finalize the message
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          return [
            ...prevMessages.slice(0, -1),
            { text, sender: 'bot', type, typing: false },
          ];
        });
      }
    };
  
    addNextCharacter();
  };
  
  

  const handleLike = (index) => {
    console.log(`Liked message at index ${index}`);
  };

  const handleDislike = (index) => {
    console.log(`Disliked message at index ${index}`);
  };

  // <p>https://chromestatus.com/feature/4733392803332096#:~:text=This%20feature%20allows%20a%20user,and%20scrolls%20it%20into%20view */}

// Function to highlight and scroll to text
  function highlightAndScroll(text) {
    const range = document.createRange();
    const selection = window.getSelection();
    const textNode = document.body.innerText.includes(text) ? document.body : null;
    
    if (textNode) {
      range.selectNodeContents(textNode);
      selection.removeAllRanges();
      selection.addRange(range);
      document.querySelector(':target').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  // Parse the URL to get the text fragment
  const urlFragment = window.location.hash.split('text=')[1];
  if (urlFragment) {
    highlightAndScroll(decodeURIComponent(urlFragment));
  }

  function urlEncode(str) {
    return encodeURIComponent(str).replace(/'/g, '%27').replace(/"/g, '%22');
}

// Example usage
// const inputString = "Here is a simple JavaScript function to get the user's current location (latitude and longitude) using the Geolocation API. You can then use these coordinates to get the location name via a reverse geocoding API like Google Maps or OpenStreetMap.";
// const encodedString = urlEncode(inputString);
// console.log(encodedString);

  

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className={twMerge(
            "fixed bottom-4 right-4 text-white p-3 rounded-full shadow-lg hover:bg-blue-700"
          )}
          style={{ backgroundColor: config.primaryColor }}
        >
          <AiOutlineWechatWork className="h-6 w-6" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content asChild>
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-4 right-4 bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg p-4 ${
              isMaximized ? "h-[calc(100%-2rem)]" : ""
            } `}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center border-b pb-2 mb-4 gap-2">
                <h2 className="text-lg font-semibold">Chat</h2>
                <div className="flex items-center gap-2 ml-auto">
                  <LuBadgePercent className="h-6 w-6 text-black fill-yellow-300" />

                  {isMaximized ? (
                    <LuMinimize
                      className="h-6 w-6 text-gray-500"
                      onClick={() => setIsMaximized(false)}
                    />
                  ) : (
                    <LuMaximize
                      className="h-6 w-6 text-gray-500"
                      onClick={() => setIsMaximized(true)}
                    />
                  )}
                  <LuRefreshCcw className="h-6 w-6 text-gray-500" />
                  <Dialog.Close asChild>
                    <button>
                      <X className="h-6 w-6 text-gray-500" />
                    </button>
                  </Dialog.Close>
                </div>
              </div>

              <div className="flex-grow overflow-y-auto h-64">
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          msg.sender === "user"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                        }`}
                      >
                        <MDXRenderer content={msg.text} />
                        {msg.sender === "bot" && msg.type === "text" && (
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              className="bg-green-500 text-white px-2 py-1 rounded"
                              onClick={() => handleLike(index)}
                            >
                              <LuThumbsUp />
                            </button>
                            <button
                              className="bg-red-500 text-white px-2 py-1 rounded"
                              onClick={() => handleDislike(index)}
                            >
                              <LuThumbsDown />
                            </button>
                          </div>
                        )}
                        {msg.sender === "bot" && msg.type === "cta" && (
                          <div className="flex space-x-2 mt-2">
                            <button className="bg-blue-500 text-white px-2 py-1 rounded">
                              Action 1
                            </button>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded">
                              Action 2
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-center">
                      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              <div className="overflow-x-auto py-2 mb-4">
  <div className="flex space-x-2 whitespace-nowrap">
    <button className="bg-blue-500 text-white px-4 py-2 rounded-full">CTA 1</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">CTA 1</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">CTA 1</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">CTA 2</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">Lorem ipsum dolor sit amet.</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded">CTA 5</button>
  </div>
</div>

              <div className="mt-4 flex">
                <SpeechRecognitionButton
                  setInput={setInput}
                  selectedLanguage={selectedLanguage}
                />
                <SpeechSynthesisButton
                  message={messages[messages.length - 1]?.text || ""}
                />
                <input
                  type="text"
                  className="border p-2 w-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 focus:border-transparent"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && !loading && sendMessage()
                  }
                />
                <LanguageSelector
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                />
                <button
                  className={`bg-blue-500 text-white p-2 rounded-r-lg ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={!loading ? sendMessage : null}
                  disabled={loading}
                >
                  <Send className="h-6 w-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChatModal;
