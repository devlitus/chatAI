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

    <span>
      {content}
    </span>



  )
}