"use client";
import { useState } from "react";
import OpenAI from "openai";
import { nanoid } from "nanoid";

import { SparklesIcon as ChatIcon } from "@heroicons/react/24/outline";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";


// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface Message {
  id: string;
  message: string;
  role: "user" | "ai";
}

export default function AssistantComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!message) return;

    // Add user's message to the chat
    const userMessage: Message = { role: "user", id: nanoid(), message };
    setMessages([...messages, userMessage]);

    setLoading(true);

    try {
      // Send message to OpenAI and get response
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      });

      const aiMessage = response?.choices?.[0]?.message?.content ?? "No response";

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", id: nanoid(), message: aiMessage }
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", id: nanoid(), message: "Error: Could not fetch response." }
      ]);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <p key={msg.id} className="text-sm">
            <span className={msg.role === "ai" ? "text-blue-500" : "text-black"}>
              {msg.role === "ai" ? "AI: " : "You: "}
            </span>
            {msg.message}
          </p>
        ))}
      </div>

      {/* Sticky Form */}
      <div className="sticky bottom-0 w-full p-4 border-t border-gray-200">
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={loading}
          className="w-full h-24 mb-2"
        />
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={() => setMessages([])}>
            Clear
          </Button>
          <Button variant="default" onClick={handleSubmit} disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}