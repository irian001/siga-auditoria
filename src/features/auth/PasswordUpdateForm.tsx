import { useNavigate } from "@tanstack/react-router";
import { KeyRound, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseAuthRepository } from "@/data/supabase/supabaseAuthRepository";

export function PasswordUpdateForm() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(undefined);
    const result = await supabaseAuthRepository.updatePassword({ password, passwordConfirmation });
    setPending(false);
    if (!result.ok) {
      setError(result.error.message);
      return;
    }
    await navigate({ to: "/acesso-pendente", replace: true });
  }

  return (
    <form className="space-y-5" onSubmit={submit} noValidate>
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="new-password">Nova senha</Label>
        <Input
          id="new-password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={pending}
          required
        />
        <p className="text-xs text-muted-foreground">Utilize ao menos 8 caracteres.</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-confirmation">Confirmar nova senha</Label>
        <Input
          id="password-confirmation"
          type="password"
          autoComplete="new-password"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          disabled={pending}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? <Loader2 className="animate-spin" /> : <KeyRound />}
        {pending ? "Atualizando..." : "Definir nova senha"}
      </Button>
    </form>
  );
}
