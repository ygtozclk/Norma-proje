import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  kicker: string;
  title: string;
  className?: string;
};

export default function SectionHeader({ kicker, title, className }: SectionHeaderProps) {
  const match = kicker.match(/^(\d+)(\s*—\s*)(.+)$/);

  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="font-mono text-sm tracking-widest text-muted-foreground uppercase">
        {match ? (
          <>
            <span className="text-azure">{match[1]}</span>
            {match[2]}
            {match[3]}
          </>
        ) : (
          kicker
        )}
      </p>
      <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-display font-bold tracking-tight">
        {title}
      </h2>
    </div>
  );
}
