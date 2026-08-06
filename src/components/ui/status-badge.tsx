import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  CircleDashed,
  Clock,
  Hammer,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusKey =
  | "planejado"
  | "em-construcao"
  | "em-andamento"
  | "concluido"
  | "atencao"
  | "erro"
  | "indisponivel";

type StatusDefinition = {
  label: string;
  variant: "neutral" | "secondary" | "default" | "success" | "warning" | "destructive";
  icon: LucideIcon;
};

export const STATUS_MAP: Record<StatusKey, StatusDefinition> = {
  planejado: { label: "Planejado", variant: "neutral", icon: CircleDashed },
  "em-construcao": { label: "Em construção", variant: "secondary", icon: Hammer },
  "em-andamento": { label: "Em andamento", variant: "default", icon: Clock },
  concluido: { label: "Concluído", variant: "success", icon: CheckCircle2 },
  atencao: { label: "Atenção", variant: "warning", icon: AlertTriangle },
  erro: { label: "Erro", variant: "destructive", icon: XCircle },
  indisponivel: { label: "Indisponível", variant: "neutral", icon: Ban },
};

type StatusBadgeProps = { status: StatusKey; label?: string; className?: string };

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const definition = STATUS_MAP[status];
  const Icon = definition.icon;
  return (
    <Badge variant={definition.variant} className={cn(className)}>
      <Icon aria-hidden="true" />
      {label ?? definition.label}
    </Badge>
  );
}
