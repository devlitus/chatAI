import { ChatMessage } from "./ChatMessage"
import { UserMessage } from "./UserMessages"

type Message = {
  messages: { content: string, role: string }[]
}
const id = window.crypto.getRandomValues(new Uint32Array(1))[0];
export function MessagesList ({ messages }: Message) {

  return (
    <div className="messageList">
      {messages.map((message, index) => {
        if (message.role === "user") {
          return <UserMessage key={id} messages={message} />
        } else {
          return (
            <>
              <ChatMessage key={index} messages={message} />
            </>

          )
        }
      })}
    </div>
  )
}