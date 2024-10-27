/**
 * 
 _______  _______  _______  ___   _______  _______  _______  __    _  _______ 
|   _   ||       ||       ||   | |       ||       ||   _   ||  |  | ||       |
|  |_|  ||  _____||  _____||   | |  _____||_     _||  |_|  ||   |_| ||_     _|
|       || |_____ | |_____ |   | | |_____   |   |  |       ||       |  |   |  
|       ||_____  ||_____  ||   | |_____  |  |   |  |       ||  _    |  |   |  
|   _   | _____| | _____| ||   |  _____| |  |   |  |   _   || | |   |  |   |  
|__| |__||_______||_______||___| |_______|  |___|  |__| |__||_|  |__|  |___|  
 *
 */

// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Textarea } from "~/components/ui/textarea";
// import { Button } from "~/components/ui/button";
// import { nanoid } from "nanoid";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from 'remark-gfm'

// interface AssistantComponentProps {
//   assistantId: string;
// }

// interface ChatMessage {
//   id: string;
//   type: "user" | "assistant";
//   content: string;
// }

// interface AssistantResponse {
//     content: string;
//     response: string;
//   }

// export default function AssistantComponent({ assistantId }: AssistantComponentProps) {
//     const [isLoading, setIsLoading] = useState(false);
//     const [input, setInput] = useState("");
//     const [assistant, setAssistant] = useState({});
//     const [threadId, setThreadId] = useState<string | null>(null);
//     const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const handleSubmit = async () => {
//         setIsLoading(true);
//         if (!input.trim()) return;

//         // Add user's message to the chat
//         const newMessage: ChatMessage = {
//             id: nanoid(),
//             type: "user",
//             content: input,
//         };

//         setChatMessages((prevMessages) => [...prevMessages, newMessage]);
//         setInput("");

//         try {
//             const response = await fetch("/api/openai/ask-assistant", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     prompt: input,
//                     assistantId: assistantId
//                 }),
//             });

//             const result = await response.json() as AssistantResponse;

//             // Add assistant's response to the chat
//             const assistantMessage: ChatMessage = {
//                 id: nanoid(),
//                 type: "assistant",
//                 content: result.content ?? "No response from assistant.",
//             };

//             setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
//             setIsLoading(false);
//         } catch (error) {
//             console.error("Error communicating with assistant:", error);
//         }
//     };

//     // Scroll to the bottom whenever chatMessages changes
//     useEffect(() => {
//         if (messagesEndRef.current) {
//             messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//         }
//     }, [chatMessages]);

//     return (
//         <div className="flex flex-col h-screen">
//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4" id="chat-messages">
//                 {chatMessages.map((message) => (
//                     <div key={message.id} className={`p-2 rounded-lg ${message.type === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
//                         <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
//                     </div>
//                 ))}
//                 {chatMessages.length > 2 && (
//                     <div ref={messagesEndRef} />
//                 )}
//             </div>

//             {/* Sticky Form */}
//             <div className="sticky bottom-0 w-full p-4 bg-gray-50 border-t border-gray-200">
//                 <Textarea
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Type your message..."
//                     disabled={isLoading}
//                 />
//                 <div className="flex justify-end space-x-2 mt-2">
//                     <Button variant="ghost" onClick={() => setInput("")}>
//                         Clear
//                     </Button>
//                     <Button variant="default" onClick={handleSubmit}>
//                         {isLoading ? "Sending..." : "Send"}
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState,  } from "react";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import { nanoid } from "nanoid";
import ReactMarkdown from "react-markdown";

interface AssistantResponse {
  content: string;
  response: string;
  threadId?: string;
}

interface AssistantComponentProps {
  assistantId: string;
}

interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
}

export default function AssistantComponent({ assistantId }: AssistantComponentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!input.trim()) return;

    // Add user's message to the chat
    const newMessage: ChatMessage = {
      id: nanoid(),
      type: "user",
      content: input,
    };

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    // Clear input
    setInput("");

    try {
      // Send the message to the API, along with the threadId if available
      const response = await fetch("/api/openai/ask-assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ assistantId, prompt: input, threadId }),
      });

      const result = await response.json() as AssistantResponse;

      // If a new thread was created, update the threadId state
      if (result.threadId) {
        setThreadId(result.threadId);
      }

      // Add assistant's response to the chat
      const assistantMessage: ChatMessage = {
        id: nanoid(),
        type: "assistant",
        content: result.content || "No response from assistant.",
      };

      setIsLoading(false);
      setChatMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      setIsLoading(false);
      console.error("Error communicating with assistant:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((message) => (
          <div key={message.id} className={`p-2 rounded-lg ${message.type === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
      </div>

      {/* Sticky Form */}
      <div className="sticky bottom-0 w-full p-4 bg-gray-50 border-t border-gray-200">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <div className="flex justify-end space-x-2 mt-2">
          <Button variant="ghost" onClick={() => setInput("")}>
            Clear
          </Button>
          <Button variant="default" onClick={handleSubmit}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}