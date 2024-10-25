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
  dangerouslyAllowBrowser: true,
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
  const [threadId, setThreadId] = useState<string | null>(null);
  const [assistantExists, setAssistantExists] = useState<boolean>(false);

  // Replace this with your existing Assistant ID
  const assistantId = "asst_oG2FTE7yodQQu7iabvQIXNPN"; 

  // Initialize thread and verify assistant on mount
  useEffect(() => {
    const initializeThread = async () => {
      try {
        // Step 1: Verify that the Assistant exists
        const assistant = await openai.beta.assistants.retrieve(assistantId);
        if (assistant) {
          setAssistantExists(true); // Mark that the assistant is valid
        }

        // Step 2: Create a Thread
        const thread = await openai.beta.threads.create();
        setThreadId(thread.id); // Store the thread ID
      } catch (error) {
        console.error("Error initializing assistant or thread:", error);
      }
    };

    initializeThread();
  }, []);

  // Function to handle sending user input
  const handleSubmit = async () => {
    if (!message || !threadId || !assistantExists) return;
    

    // Add the user's message to the chat
    const label = message

    const userMessage: Message = { id: nanoid(), message, role: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage("");
    setLoading(true);

    const markdownPrompt = "\n\nPlease respond in structured Markdown formatting.";
    const combinedMessage = message + markdownPrompt; // Combine for API call

    try {
        // Step 3: Add a Message to the Thread
        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: combinedMessage,
        });

        // Step 4: Create a Run (generate assistant's response)
        const assistantMessage: Message = { id: nanoid(), message: "", role: "assistant" };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        let fullResponseText = ""; // Store the full response text

        // Stream the assistant's response
        openai.beta.threads.runs.stream(threadId, {
            assistant_id: assistantId,
        })
            .on("textDelta", (textDelta) => {
                // Append textDelta to fullResponseText
                if (textDelta.value !== undefined && textDelta.value.trim()) { // Check for non-empty segments
                    fullResponseText += textDelta.value; // Append to full response
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages];
                        const lastMessage = updatedMessages[updatedMessages.length - 1];
                        if (lastMessage) {
                            lastMessage.message = fullResponseText; // Update the most recent assistant message
                        }
                        return updatedMessages;
                    });
                }
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
    <div className="sticky bottom-0 w-full p-4 bg-gray-50 border-t border-gray-200">
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