"use client";

import { useState, useEffect } from "react";
import OpenAI from "openai";
import { nanoid } from "nanoid";
import ReactMarkdown from "react-markdown"; 

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Use server-side calls only to avoid CORS issues.
});

// Interface for the chat messages
interface Message {
  id: string;
  message: string;
  role: "user" | "assistant";
}

export default function AssistantComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentAssistantMessage, setCurrentAssistantMessage] = useState<string>("");

  // Store assistant and thread details
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [threadId, setThreadId] = useState<string | null>(null);

  // Initialize assistant and thread on mount
  useEffect(() => {
    const initializeAssistant = async () => {
      try {
        // Step 1: Create an Assistant
        const assistant = await openai.beta.assistants.create({
          name: "Helper Assistant",
          instructions: "You are a helpful assistant that answers any questions.",
          model: "gpt-4", // or another model like gpt-4o if available
        });

        setAssistantId(assistant.id);

        // Step 2: Create a Thread
        const thread = await openai.beta.threads.create();
        setThreadId(thread.id);
      } catch (error) {
        console.error("Error initializing assistant:", error);
      }
    };

    initializeAssistant();
  }, []);

  // Function to handle sending user input
  const handleSubmit = async () => {
    if (!message || !assistantId || !threadId) return;
  
    // Add the user's message to the chat
    const userMessage: Message = { id: nanoid(), message, role: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setLoading(true);
  
    try {
      // Step 3: Add a Message to the Thread
      await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
      });
  
      // Step 4: Create a Run (generate assistant's response)
      const assistantMessage: Message = { id: nanoid(), message: "", role: "assistant" };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
  
      openai.beta.threads.runs.stream(threadId, {
        assistant_id: assistantId,
      })
        .on("textDelta", (textDelta) => {
          // Update the most recent assistant message in the messages array
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            if (lastMessage) {
              lastMessage.message += textDelta.value; // Append the new text chunk
            }
            return updatedMessages;
          });
        })
        .on("end", () => {
          setLoading(false); // Set loading to false once the response is complete
        });
    } catch (error) {
      console.error("Error during conversation:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: nanoid(), role: "assistant", message: "Error: Could not fetch response." },
      ]);
      setLoading(false); // Ensure loading is set to false on error
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <p key={msg.id} className="text-sm">
            <span className={msg.role === "assistant" ? "text-blue-500" : "text-black"}>
              {msg.role === "assistant" ? "AI: " : "You: "}
            </span>
            <ReactMarkdown>{msg.message}</ReactMarkdown>
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
          <Button variant="default" onClick={handleSubmit} disabled={loading || !assistantId || !threadId}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
}