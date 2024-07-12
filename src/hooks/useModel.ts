import { ChatCompletionMessageParam, CreateWebWorkerMLCEngine, WebWorkerMLCEngine } from "@mlc-ai/web-llm";
import { useState, useEffect } from "react";

export function useModalLLM() {
  const selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC';
  const [info, setInfo] = useState<string>("");
  const [config, setConfig] = useState<WebWorkerMLCEngine>();
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const init = async () => {
    const engineConf = await CreateWebWorkerMLCEngine(
      new Worker(new URL('../../worker.ts', import.meta.url),{type: "module"}),selectedModel,{
        initProgressCallback: (infoProgress) => {
          setInfo(infoProgress.text);
          setDisabled(false);
          setLoading(true);
          if(infoProgress.progress === 1){
            setDisabled(true);
            setLoading(false);
          }
        }
      }
    )
    setConfig(engineConf);
    setMessages([{ role: "system", content: "¡Hola! Soy un ChatGPT que se ejecuta completamente en tu navegador. ¿En qué puedo ayudarte hoy?" }])
  }
  const handleUserMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: string = getUserMessage(e);
    updateUserMessages(userMessage);
    
    const addMessage: ChatCompletionMessageParam[] = [{ role: "user", content: userMessage }];
    if (config === undefined) return "";
    setDisabled(false);
    const chunks = await config.chat.completions.create({ messages: addMessage, stream: true});
    for await (const chuck of chunks) {
      const choices = chuck.choices[0];
      const content = choices.delta.content ?? ""
      setMessages(previousMessages => [...previousMessages, { role: "assistant", content: content }]); 
    }

    const fullReply = await config.getMessage();
    if(fullReply !== null) {
      setDisabled(true);
    }
    
  };

  const getUserMessage = (e: React.FormEvent<HTMLFormElement>): string => {
    return e.currentTarget.message.value;
  }

  const updateUserMessages = (userMessage: string) => {
    setMessages(previousMessages => [...previousMessages, { role: "user", content: userMessage }]);
  }

  useEffect(() => {
    init();
  }, []);
  return {
    info,
    messages,
    loading,
    disabled,
    handleUserMessage
  }
}