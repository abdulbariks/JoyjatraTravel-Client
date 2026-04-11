import ChatsLayoutShell from "@/components/admin/chats/ChatsLayoutShell";

export default function Chatslayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChatsLayoutShell>{children}</ChatsLayoutShell>;
}
