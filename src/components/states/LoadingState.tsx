import { Skeleton } from "@/components/ui/skeleton";

type LoadingStateProps = {
  label?: string;
  lines?: number;
  variant?: "texto" | "cartao" | "tabela";
};

/** Carregamento estrutural reutilizável, sem dados simulados. */
export function LoadingState({
  label = "Carregando conteúdo",
  lines = 3,
  variant = "texto",
}: LoadingStateProps) {
  return (
    <div className="space-y-3" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      {variant === "texto" ? (
        <>
          <Skeleton className="h-6 w-1/3" />
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton key={index} className="h-4 w-full" />
          ))}
        </>
      ) : null}
      {variant === "cartao" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-lg border border-border p-6">
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : null}
      {variant === "tabela" ? (
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full" />
          ))}
        </div>
      ) : null}
    </div>
  );
}
