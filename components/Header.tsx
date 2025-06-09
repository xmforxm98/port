import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  title?: string;
}

export function Header({ title = "YONGWOO.KIM" }: HeaderProps) {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center justify-between px-4">
        <div className="font-medium">
          {title}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}