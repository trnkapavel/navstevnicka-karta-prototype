import { GameProvider } from "@/lib/game-context";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
