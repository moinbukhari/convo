import { cn } from "@/lib/utils";
import { BotAvatar } from "./BotAvatar";
import {BeatLoader} from "react-spinners";
import { UserAvatar } from "./UserAvatar";

export interface ChatMessageProps {
    role: "system" | "user" | "assistant";
    content?: string;
    isLoading?: boolean;
    language?: string;
}


export const ChatMessage = ({
    role,
    content,
    isLoading,
    language,
  }: ChatMessageProps) => {
  
    return (
      <div
        className={cn(
          "group flex items-start gap-x-3 py-4 w-full",
          role === "user" && "justify-end"
        )}
      >
        {role !== "user" && language && <BotAvatar />}
        <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
          {isLoading ? <BeatLoader size={5} color={"black"}/> : content}
        </div>
        {role === "user" && <UserAvatar/>}
      </div>
    );
  };