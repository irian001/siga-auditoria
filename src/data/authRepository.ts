import type {
  AuthIdentity,
  AuthResult,
  AuthSession,
  PasswordResetInput,
  SignInInput,
  UpdatePasswordInput,
} from "@/domain/auth";

export type AuthSubscription = { unsubscribe(): void };
export type AuthStateListener = (identity: AuthIdentity | null) => void;

export type AuthRepository = {
  getCurrentSession(): Promise<AuthResult<AuthSession | null>>;
  getCurrentIdentity(): Promise<AuthResult<AuthIdentity | null>>;
  signIn(input: SignInInput): Promise<AuthResult<AuthSession>>;
  signOut(): Promise<AuthResult<void>>;
  requestPasswordReset(input: PasswordResetInput): Promise<AuthResult<void>>;
  updatePassword(input: UpdatePasswordInput): Promise<AuthResult<void>>;
  exchangeRecoveryCode(code: string): Promise<AuthResult<void>>;
  onAuthStateChange(listener: AuthStateListener): AuthSubscription;
};
