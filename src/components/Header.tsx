"use client";

interface HeaderProps {
  title: string;
}

export function Header(props: HeaderProps) {
  return (
    <div className="flex items-center justify-center mt-16 mb-12">
      <img
        src="/arrowsDownUp.svg"
        alt="Ícone de flechas para cima e para baixo"
        className="w-[17px] h-[17px] mr-2"
        style={{ color: "var(--color-blue-700)" }}
      />
      <span
        className="{inter.className} font-bold"
        style={{ color: "var(--color-blue-700)" }}
      >
        {props.title}
        {/* CONVERT */}
      </span>
    </div>
  );
}
