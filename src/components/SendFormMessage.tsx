type SendFormMessageProps = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export function SendFormMessage({ handleSubmit }: SendFormMessageProps) {
  return (
    <div className="boxForm">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="message" name="message" />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}