import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { maskTaxIdentifier, type Client } from "@/domain/client";
import {
  CLIENT_CLASSIFICATION_LABELS,
  CLIENT_STATUS_BADGE,
  CLIENT_STATUS_LABELS,
} from "@/features/clients/clientsPresentation";

type ClientsListProps = {
  clients: Client[];
};

/**
 * Estrutura visual da listagem de clientes — Camada 1 da SDD-CLI-001.
 * Não executa ações; apenas apresenta os campos previstos.
 */
export function ClientsList({ clients }: ClientsListProps) {
  return (
    <Table>
      <caption className="sr-only">
        Clientes da organização ativa, com nome de exibição, razão social, identificador fiscal
        mascarado, classificação e estado.
      </caption>
      <TableHeader>
        <TableRow>
          <TableHead scope="col">Nome de exibição</TableHead>
          <TableHead scope="col">Razão social ou nome jurídico</TableHead>
          <TableHead scope="col">Identificador fiscal</TableHead>
          <TableHead scope="col">Classificação</TableHead>
          <TableHead scope="col">Estado</TableHead>
          <TableHead scope="col" className="text-right">
            Ações
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.map((client) => (
          <TableRow key={client.id} data-estado={client.status}>
            <TableCell className="font-medium text-foreground">{client.displayName}</TableCell>
            <TableCell className="text-muted-foreground">{client.legalName}</TableCell>
            <TableCell className="whitespace-nowrap text-muted-foreground">
              {maskTaxIdentifier(client.taxIdentifierType, client.taxIdentifier)}
            </TableCell>
            <TableCell className="text-muted-foreground">
              {CLIENT_CLASSIFICATION_LABELS[client.classification]}
            </TableCell>
            <TableCell>
              <StatusBadge
                status={CLIENT_STATUS_BADGE[client.status]}
                label={CLIENT_STATUS_LABELS[client.status]}
              />
            </TableCell>
            <TableCell className="text-right text-xs text-muted-foreground">
              Disponível na próxima etapa
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
