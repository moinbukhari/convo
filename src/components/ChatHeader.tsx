
import { ChevronLeft, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";

interface ChatHeaderProps{
    language: string;
    scenario: string;
}

export const ChatHeader = ( {language, scenario}: ChatHeaderProps) => {

    return(
        <div className="flex w-full justify-between items-center border-b border-primary/10 pb-4">
            <div className="flex gap-x-2 items-center">
                <Button size="icon" variant="ghost">
                    <ChevronLeft className="h-8 w-8"/>
                </Button>
                {/* <BotAvatar /> */}
                <div className="flex items-center pt-3">
                    <p className="font-bold">
                        {language}
                    </p>
                    <MessageSquare className="w-3 h-3 ml-1 text-muted-foreground"/>

                </div>

                <div className="text-xl font-semibold pl-[200px]">
                    {scenario}
                </div>

            </div>
            
        </div>
    )
}