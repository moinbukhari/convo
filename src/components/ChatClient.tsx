import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { type ChatMessageProps } from "./ChatMessage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizonal } from "lucide-react";
import { useState, useEffect, useRef, type ChangeEvent } from "react";

interface ChatClientProps {
  language: string;
  scenario: string;
}

export const ChatClient = ({ language, scenario }: ChatClientProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const isLoading = false;
  const [input, setInput] = useState("");

  //give correct type to e and handleInputChange
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input, language: language },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader language={language} scenario={scenario} />
      <ChatMessages messages={messages} isLoading={false} language={language} />

      <div className="border-t border-primary/10 py-4 flex items-center gap-x-2">
        <Input
          disabled={isLoading}
          value={input}
          onChange={handleInputChange}
          placeholder="Type a Message"
          className="rounded-lg bg-primary/10"
        />

        <Button
          disabled={isLoading}
          variant={"ghost"}
          onClick={handleSendMessage}
        >
          <SendHorizonal className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};
