"use client"
import { useState } from "react";
import OpenAI from "openai";
import { nanoid } from "nanoid";

import { SparklesIcon as ChatIcon } from "@heroicons/react/24/outline";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Skeleton } from "~/components/ui/skeleton";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

interface Message {
  id: string;
  message: string;
  role: "user" | "ai"
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // To handle loading state

  const handleSubmit = async () => {
    if (!message) return;

    // Add user's message to the chat
    const userMessage: Message = { role: "user", id: nanoid(), message };
    setMessages([...messages, userMessage]);

    setLoading(true); // Set loading to true during the request

    try {
      // Send user's message to OpenAI and get response
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or another model you prefer
        messages: [{ role: "user", content: message }],
      });

      // Extract the AI response
      const aiMessage = response?.choices?.[0]?.message?.content ?? "No response";

      // Add AI response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", id: nanoid(), message: aiMessage },
      ]);
    
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", id: nanoid(), message: "Error: Could not fetch response." },
      ]);
    } finally {
      setLoading(false); // Set loading back to false
      setMessage(""); // Clear input field
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600">
          <ChatIcon className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col h-full">
          <SheetTitle>Chat with AI</SheetTitle>
          <SheetDescription>
            Ask anything, and AI will respond.
          </SheetDescription>

          <div
            id="chat-messages"
            className="flex-1 overflow-y-scroll border-t border-gray-200 pt-5 space-y-2"
          >
            {messages.map((msg) => (
              <p key={msg.id} className="text-sm text-gray-500">
                {loading && msg.role === "ai" ? (
                    <div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                ) : (
                    <div className="flex items-start">
                        {msg.role === "ai" && <ChatIcon className="h-6 w-6 mr-2 mb-1" />}
                        {msg.message}
                    </div>
                )
                  }
              </p>
            ))}
          </div>

          <div id="chat-form" className="flex flex-col space-y-2 pt-5">
            <Textarea
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Update state on change
              disabled={loading} // Disable input while loading
            />
            <div className="flex justify-end">
              <Button variant="ghost" onClick={() => setMessages([])}>
                Clear
              </Button>
              <Button
                variant="default"
                onClick={handleSubmit}
                disabled={loading} // Disable button while loading
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}