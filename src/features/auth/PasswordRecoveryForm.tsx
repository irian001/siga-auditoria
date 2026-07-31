import { Link } from "@tanstack/react-router";
import { Loader2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabaseAuthRepository } from "@/data/supabase/supabaseAuthRepository";

const neutralMessage =
  "Se o endereço informado estiver associado a uma conta válida, você receberá as orientações para redefinir sua senha.";

export function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string>();
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError(undefined);
    const result = await supabaseAuthRepository.requestPasswordReset({ email });
    setPending(false);
    if (!result.ok) {
      setError(result.error.message);
      return;
    }
    setMessage(neutralMessage);
  }

  return (
    <form className="space-y-5" onSubmit={submit} noValidate>
      {message ? (
        <Alert variant="success">
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}
      {error ? (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <div className="space-y-2">
        <Label htmlFor="recovery-email">E-mail</Label>
        <Input
          id="recovery-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={pending || Boolean(message)}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={pending || Boolean(message)}>
        {pending ? <Loader2 className="animate-spin" /> : <Mail />}
        {pending ? "Enviando..." : "Enviar orientações"}
      </Button>
      <div className="text-center text-sm">
        <Link to="/login" className="text-primary hover:underline">
          Voltar ao login
        </Link>
      </div>
    </form>
  );
}
