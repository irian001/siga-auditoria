import type {
  AcceptanceAssessment,
  AcceptanceAssessmentId,
  AcceptanceConclusion,
  CreateAcceptanceAssessmentInput,
  SaveAcceptanceAnswerInput,
} from "@/domain/acceptance";
import type { OperationResult, RequestContext } from "@/domain/contracts";

/** Contrato da aceitação e continuidade. Não oferece exclusão física. */
export type AcceptanceRepository = {
  listByClient(
    context: RequestContext,
    clientId: string,
  ): Promise<OperationResult<AcceptanceAssessment[]>>;
  getById(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
  ): Promise<OperationResult<AcceptanceAssessment>>;
  create(
    context: RequestContext,
    input: CreateAcceptanceAssessmentInput,
  ): Promise<OperationResult<AcceptanceAssessment>>;
  saveAnswers(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    answers: SaveAcceptanceAnswerInput[],
  ): Promise<OperationResult<AcceptanceAssessment>>;
  submit(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
  ): Promise<OperationResult<AcceptanceAssessment>>;
  returnToDraft(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    reason: string,
  ): Promise<OperationResult<AcceptanceAssessment>>;
  decide(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    conclusion: AcceptanceConclusion,
    rationale: string,
  ): Promise<OperationResult<AcceptanceAssessment>>;
  cancel(
    context: RequestContext,
    assessmentId: AcceptanceAssessmentId,
    reason: string,
  ): Promise<OperationResult<AcceptanceAssessment>>;
  getApplicable(
    context: RequestContext,
    clientId: string,
    referencePeriod?: string,
  ): Promise<OperationResult<AcceptanceAssessment | null>>;
};
