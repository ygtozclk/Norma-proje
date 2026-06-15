import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("relative py-24 md:py-32", className)}>
      <div className="relative mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
