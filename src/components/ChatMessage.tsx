import React from 'react';
import { MessageType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/logo.png" alt="Chatbot" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg p-3 text-sm shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {typeof message.text === 'string' ? (
            <p className="whitespace-pre-wrap">{message.text}</p>
        ) : (
            message.text
        )}
      </div>
       {isUser && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

export function BotTypingIndicator() {
    return (
        <div className="flex items-start gap-3 justify-start">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/logo.png" alt="Chatbot" />
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg p-3 text-sm shadow-sm">
                <div className="flex items-center justify-center space-x-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/50 delay-0 duration-1000"></span>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/50 delay-200 duration-1000"></span>
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-foreground/50 delay-400 duration-1000"></span>
                </div>
            </div>
        </div>
    );
} 