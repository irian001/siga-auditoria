import { Skeleton } from "@/components/ui/skeleton";

type LoadingStateProps = {
  label?: string;
  lines?: number;
};

/** Carregamento estrutural simples — SDD-FND-001, seção 16.2. */
export function LoadingState({ label = "Carregando conteúdo", lines = 3 }: LoadingStateProps) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      <Skeleton className="h-6 w-1/3" />
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} className="h-4 w-full" />
      ))}
    </div>
  );
}
