import {
  Home,
  Building2,
  Briefcase,
  ClipboardList,
  ShieldAlert,
  FolderOpen,
  FileText,
  CheckCircle2,
  FileBarChart,
  Settings,
  type LucideIcon,
} from "lucide-react";

/**
 * Configuração de navegação do SIGA — SDD-FND-001, seções 10 e 11.
 *
 * Fonte única dos módulos estruturais do MVP. Nenhum dado funcional,
 * métrica ou entidade de auditoria é representado aqui.
 */

export const APP_NAME = "SIGA";
export const APP_FULL_NAME = "Sistema Integrado para Gerenciamento de Auditoria";
export const APP_DESCRIPTION =
  "Plataforma de apoio ao planejamento, execução, revisão e documentação de trabalhos de auditoria.";
export const APP_ENVIRONMENT_LABEL = "Ambiente em construção";

export type NavGroupId = "trabalho" | "execucao" | "finalizacao" | "administracao";

export type ModuleStatus = "disponivel" | "planejado";

export type NavItem = {
  id: string;
  title: string;
  description: string;
  to: string;
  icon: LucideIcon;
  group: NavGroupId;
  status: ModuleStatus;
};

export const NAV_GROUPS: { id: NavGroupId; label: string }[] = [
  { id: "trabalho", label: "Trabalho" },
  { id: "execucao", label: "Execução" },
  { id: "finalizacao", label: "Finalização" },
  { id: "administracao", label: "Administração" },
];

export const NAV_ITEMS: NavItem[] = [
  {
    id: "inicio",
    title: "Início",
    description: "Visão estrutural do SIGA e orientação sobre o andamento do MVP.",
    to: "/",
    icon: Home,
    group: "trabalho",
    status: "disponivel",
  },
  {
    id: "clientes",
    title: "Clientes",
    description: "Cadastro de clientes, segmentos, aceitação e continuidade.",
    to: "/clientes",
    icon: Building2,
    group: "trabalho",
    status: "disponivel",
  },
  {
    id: "trabalhos",
    title: "Trabalhos",
    description: "Consulta de trabalhos de auditoria e sua situação.",
    to: "/trabalhos",
    icon: Briefcase,
    group: "trabalho",
    status: "disponivel",
  },
  {
    id: "planejamento",
    title: "Planejamento",
    description: "Planejamento do trabalho, materialidade e estratégia.",
    to: "/planejamento",
    icon: ClipboardList,
    group: "trabalho",
    status: "planejado",
  },
  {
    id: "riscos-procedimentos",
    title: "Riscos e procedimentos",
    description: "Processos, riscos, controles e procedimentos de auditoria.",
    to: "/riscos-procedimentos",
    icon: ShieldAlert,
    group: "execucao",
    status: "planejado",
  },
  {
    id: "documentos-evidencias",
    title: "Documentos e evidências",
    description: "Solicitações, documentos recebidos e avaliação de evidências.",
    to: "/documentos-evidencias",
    icon: FolderOpen,
    group: "execucao",
    status: "planejado",
  },
  {
    id: "papeis-trabalho",
    title: "Papéis de trabalho",
    description: "Documentação dos procedimentos executados e suas conclusões.",
    to: "/papeis-trabalho",
    icon: FileText,
    group: "execucao",
    status: "planejado",
  },
  {
    id: "revisao",
    title: "Revisão",
    description: "Revisão dos papéis de trabalho, pendências e supervisão.",
    to: "/revisao",
    icon: CheckCircle2,
    group: "finalizacao",
    status: "planejado",
  },
  {
    id: "relatorios",
    title: "Relatórios",
    description: "Achados, recomendações, conclusões e relatórios do trabalho.",
    to: "/relatorios",
    icon: FileBarChart,
    group: "finalizacao",
    status: "planejado",
  },
  {
    id: "configuracoes",
    title: "Configurações",
    description: "Parâmetros gerais da organização e da aplicação.",
    to: "/configuracoes",
    icon: Settings,
    group: "administracao",
    status: "planejado",
  },
];

export const NAV_GROUP_LABELS: Record<NavGroupId, string> = {
  trabalho: "Trabalho",
  execucao: "Execução",
  finalizacao: "Finalização",
  administracao: "Administração",
};

export function getNavItem(id: string): NavItem | undefined {
  return NAV_ITEMS.find((item) => item.id === id);
}

export function getNavItemsByGroup(group: NavGroupId): NavItem[] {
  return NAV_ITEMS.filter((item) => item.group === group);
}
