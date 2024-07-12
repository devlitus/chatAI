type SendFormMessageProps = {
  disabled: boolean;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export function SendFormMessage({disabled, handleSubmit }: SendFormMessageProps) {
  return (
    <div className="boxForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="message" name="message" />
        <button type="submit" disabled={!disabled}>Send</button>
      </form>
    </div>
  )
}