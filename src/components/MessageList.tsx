import { ChatMessage } from "./ChatMessage"
import { UserMessage } from "./UserMessages"

type Message = {
  messages: { content: string, role: string }[]
}
export function MessagesList ({ messages }: Message) {

  return (
    <div>
      {messages.map((message, index) => {
        if (message.role === "user") {
          return <UserMessage key={index} messages={message} />
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