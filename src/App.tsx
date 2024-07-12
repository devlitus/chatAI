import { useModalLLM } from "./hooks/useModel";
import './App.css';
import { MessagesList } from "./components/MessageList";
import { SendFormMessage } from './components/SendFormMessage';


function App() {
  const { info,loading, disabled, messages, handleUserMessage } = useModalLLM();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleUserMessage(e);
  }

  return (
    <>
      <div>
        <p>{info}</p>
        <p>{loading && 'loading...'}</p>
        <h1 className='title'>AI Chatbot</h1>
      </div>
      <div className='main'>
        <MessagesList messages={messages} />
        <SendFormMessage handleSubmit={handleSubmit} disabled={disabled} />
      </div>
    </>

  )
}
export default App