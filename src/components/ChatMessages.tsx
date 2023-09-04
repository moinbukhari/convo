import { useState, useEffect, useRef, type ElementRef } from "react";
import { ChatMessage, type ChatMessageProps } from "./ChatMessage";

interface ChatMessagesProps {
  messages: ChatMessageProps[];
  isLoading: boolean;
  language: string;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  language,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto pr-4">
      <ChatMessage
        isLoading={fakeLoading}
        language={language}
        role="assistant"
        content={`Hola ¿Qué te gustaría ordenar?`}
      />

      {messages.map((message, i) => (
        <ChatMessage
          role={message.role}
          key={i}
          content={message.content}
          language={message.language}
        />
      ))}
      {isLoading && <ChatMessage language={language} role="assistant" isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
