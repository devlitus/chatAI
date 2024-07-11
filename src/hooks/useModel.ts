import { ChatCompletionMessageParam, CreateMLCEngine, MLCEngine } from "@mlc-ai/web-llm";
import { useState, useEffect } from "react";

export function useModalLLM() {
  const selectedModel = 'Llama-3-8B-Instruct-q4f32_1-MLC';
  const [info, setInfo] = useState<string>("");
  const [config, setConfig] = useState<MLCEngine>();
  const [messages, setMessages] = useState<{ role: string, content: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const init = async () => {
    const engineConf = await CreateMLCEngine(selectedModel, {
      initProgressCallback: (infoProgress) => {
        setInfo(infoProgress.text);
      },
    });
    setMessages([{ role: "system", content: "¡Hola! Soy un ChatGPT que se ejecuta completamente en tu navegador. ¿En qué puedo ayudarte hoy?" }])
    setConfig(engineConf);
  }
  const handleUserMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage: string = getUserMessage(e);
    updateUserMessages(userMessage);
    const addMessage: ChatCompletionMessageParam[] = [{ role: "user", content: userMessage }];
    if (config === undefined) return "";
    const chunks = await config.chat.completions.create({ messages: addMessage, stream: true});
    for await (const chuck of chunks) {
      const choices = chuck.choices[0];
      const content = choices.delta.content ?? ""
      setMessages(previousMessages => [...previousMessages, { role: "assistant", content: content }]); 
    }
    
  };

  const getUserMessage = (e: React.FormEvent<HTMLFormElement>): string => {
    return e.currentTarget.message.value;
  }

  const updateUserMessages = (userMessage: string) => {
    setMessages(previousMessages => [...previousMessages, { role: "user", content: userMessage }]);
    setLoading(true);
  }

  useEffect(() => {
    init();
  }, []);
  return {
    info,
    messages,
    loading,
    handleUserMessage
  }
}