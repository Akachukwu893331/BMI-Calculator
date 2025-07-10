export default function ChatBubble({ role, content }: { role: string; content: string }) {
  const isUser = role === 'user';
  return (
    <div className={`p-2 rounded-md my-1 ${isUser ? 'bg-blue-100 self-end' : 'bg-gray-100'}`}>
      <strong>{isUser ? 'You' : 'AI'}:</strong> {content}
    </div>
  );
}
