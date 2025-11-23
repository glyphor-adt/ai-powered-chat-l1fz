import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4 bg-secondary dark:bg-secondary-foreground rounded-md">
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={handleInputChange}
        className="flex-grow text-foreground bg-background focus:ring-ring focus:ring-offset-background"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline on Enter
            handleSendMessage();
          }
        }}
      />
      <Button onClick={handleSendMessage} disabled={message.trim() === ""} className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary-foreground dark:text-primary">
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};

export default ChatInput;