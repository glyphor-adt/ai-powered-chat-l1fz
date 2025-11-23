import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  createdAt?: Date; // Optional timestamp for message
  status?: 'sent' | 'delivered' | 'read'; // Optional status indicator
  avatarUrl?: string; // Optional avatar URL
  userName?: string; // Optional user name for display
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  createdAt,
  status,
  avatarUrl,
  userName,
}) => {
  const isUserMessage = role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3 py-2',
        isUserMessage ? 'justify-end' : 'justify-start'
      )}
    >
      {/* AI Avatar */}
      {!isUserMessage && (
        <div className="flex-shrink-0">
          <Avatar>
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt="AI Avatar" />
            ) : (
              <AvatarFallback>
                <MessageSquare className="w-4 h-4" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'rounded-md px-3 py-2 text-sm',
          isUserMessage
            ? 'bg-primary/10 text-primary-foreground'
            : 'bg-secondary/10 text-secondary-foreground',
          'w-fit max-w-[80%]'
        )}
      >
        {userName && !isUserMessage && <div className="font-semibold text-xs mb-1">{userName}</div>}
        <p className="whitespace-pre-wrap">{content}</p>
        {createdAt && (
          <div className="text-xs text-muted-foreground mt-1">
            {createdAt.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
        {/* TODO: Implement Status indicators using icons */}
        {/* {status && (
          <div className="text-xs text-muted-foreground">
            {status}
          </div>
        )} */}
      </div>

      {/* User Avatar */}
      {isUserMessage && (
        <div className="flex-shrink-0">
          <Avatar>
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt="User Avatar" />
            ) : (
              <AvatarFallback>
                {userName ? userName.substring(0, 2).toUpperCase() : 'U'}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;