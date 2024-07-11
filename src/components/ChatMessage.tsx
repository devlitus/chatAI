
import '../App.css'
type ChatMessageProps = {
  messages: {
    content: string;
    role: string;
  },
}

export function ChatMessage({ messages }: ChatMessageProps) {
  const { content } = messages;
  return (
      <span className="boxAssistantMessage">
        {content}
      </span>

    
  )
}