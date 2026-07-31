import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  redirect,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppLayout } from "@/components/layout/AppLayout";
import { getServerAuthState } from "@/lib/auth/auth.server";

const publicAuthPaths = new Set([
  "/login",
  "/recuperar-senha",
  "/redefinir-senha",
  "/auth/callback",
]);

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Esta página não foi carregada
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um problema ao exibir o conteúdo. Você pode tentar novamente ou voltar ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: async ({ location }) => {
    const auth = await getServerAuthState();
    const isPublicAuthPath = publicAuthPaths.has(location.pathname);

    if (isPublicAuthPath) {
      if (auth.authenticated && location.pathname !== "/redefinir-senha") {
        throw redirect({ to: "/acesso-pendente" });
      }
      return { auth };
    }

    if (!auth.authenticated) {
      throw redirect({ to: "/login" });
    }

    if (location.pathname !== "/acesso-pendente") {
      throw redirect({ to: "/acesso-pendente" });
    }

    return { auth };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Início — SIGA" },
      {
        name: "description",
        content:
          "Página inicial do SIGA: visão estrutural do sistema de gerenciamento de auditoria e dos módulos previstos para o MVP.",
      },
      { name: "author", content: "Projeto SIGA" },
      { property: "og:title", content: "Início — SIGA" },
      {
        property: "og:description",
        content:
          "Página inicial do SIGA: visão estrutural do sistema de gerenciamento de auditoria e dos módulos previstos para o MVP.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Início — SIGA" },
      {
        name: "twitter:description",
        content:
          "Página inicial do SIGA: visão estrutural do sistema de gerenciamento de auditoria e dos módulos previstos para o MVP.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/82b2220b-8e52-4c5c-9f30-3717f50e0524/id-preview-6bf56de7--51b279d6-605d-4129-85af-f02635876bd8.lovable.app-1785519217730.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/82b2220b-8e52-4c5c-9f30-3717f50e0524/id-preview-6bf56de7--51b279d6-605d-4129-85af-f02635876bd8.lovable.app-1785519217730.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const usesAuthLayout = publicAuthPaths.has(pathname) || pathname === "/acesso-pendente";

  return (
    <QueryClientProvider client={queryClient}>
      {usesAuthLayout ? (
        <Outlet />
      ) : (
        <AppLayout>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </AppLayout>
      )}
    </QueryClientProvider>
  );
}
