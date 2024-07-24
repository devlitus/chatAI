import { useEffect, useRef } from "react";

type SendFormMessageProps = {
  disabled: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SendFormMessage({disabled, handleSubmit }: SendFormMessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  useEffect(() => {
    autoResize();
   }, []);
  return (
    <div className="boxForm">
      <form  onSubmit={(e) => handleSubmit(e)}>
        <textarea ref={textareaRef} name="message" id="message" onChange={autoResize}></textarea>
        <button type="submit" disabled={!disabled}>Send</button>
      </form>
    </div>
  )
}