import '../App.css';
type UserMessageProps = {
  messages: {
    content: string;
  },
  key: number;
}
export function UserMessage({messages, key}: UserMessageProps) {
  const {content} = messages;
  
  return (
    <div key={key} className="boxUserMessage"><p className="messageUser">{content}</p></div> 
  )
}