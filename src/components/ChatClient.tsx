import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { type ChatMessageProps } from "./ChatMessage";
import { type FormEvent, useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { ChatForm } from "./ChatForm";


interface ChatClientProps {
  language: string;
  scenario: string;
}

export const ChatClient = ({ language, scenario }: ChatClientProps) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  //give correct type to e and handleInputChange
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: `/api/chat`,
      onFinish(message) {
        const systemMessage: ChatMessageProps = {
          role: "assistant",
          content: message.content,
          language:language,
        };

        // if (systemMessage.content) {
        //   let utterance = new SpeechSynthesisUtterance(systemMessage.content);

        //   utterance.voice = voicesArray[7];
        //   speechSynthesis.speak(utterance);
        // }

        setMessages((current) => [...current, systemMessage]);

        setInput("");
      },

    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
      const userMessage: ChatMessageProps = {
        role: "user",
        content: input,
      };
  
      setMessages((current) => [...current, userMessage]);
  
      handleSubmit(e);
    };

  return (
    <div className="flex h-full flex-col space-y-2 p-4">
      <ChatHeader language={language} scenario={scenario} />
      <ChatMessages messages={messages} isLoading={isLoading} language={language} />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />

    </div>
  );
};
