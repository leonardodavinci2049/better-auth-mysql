import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface SignUpSuccessPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function SignUpSuccessPage({
  searchParams,
}: SignUpSuccessPageProps) {
  const params = await searchParams;
  const token = params.token;

  // Verificar se o token existe
  if (!token) {
    redirect("/sign-up");
  }

  try {
    // Decodificar e verificar o token
    const decoded = atob(token);
    const [prefix, timestampStr] = decoded.split("_");

    if (prefix !== "success" || !timestampStr) {
      redirect("/sign-up");
    }

    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000; // 5 minutos em millisegundos

    // Verificar se o token não expirou (5 minutos)
    if (now - timestamp > fiveMinutes) {
      redirect("/sign-up");
    }
  } catch {
    // Token inválido ou corrompido
    redirect("/sign-up");
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Success Card */}
      <Card className="border-border/50 bg-card/90 dark:bg-card/50 w-full border shadow-2xl shadow-black/10 backdrop-blur-sm dark:border-0 dark:shadow-black/50">
        <CardHeader className="space-y-4 pb-6 text-center">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500" />
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-foreground text-3xl font-bold">
              🎉 Cadastro Realizado com Sucesso!
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Parabéns! Sua solicitação de cadastro foi enviada com sucesso.
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Status Information */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-700 dark:bg-blue-900/20">
            <div className="flex items-start space-x-4">
              <Clock className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                  Próximos Passos
                </h3>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                  <p>
                    <strong>📋 Análise em Andamento:</strong> Nossa equipe irá
                    avaliar seu cadastro nos próximos dias úteis.
                  </p>
                  <p>
                    <strong>📧 Notificação:</strong> Você receberá um e-mail de
                    confirmação assim que sua conta for aprovada.
                  </p>
                  <p>
                    <strong>🔐 Acesso:</strong> Após a aprovação, você poderá
                    fazer login e começar a usar nossa plataforma.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-900/20">
            <h3 className="text-foreground mb-4 flex items-center font-semibold">
              <MessageSquare className="mr-2 h-5 w-5" />
              Precisa de Ajuda? Entre em Contato
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {/* Phone Contact */}
              <div className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">
                    Telefone
                  </p>
                  <p className="text-muted-foreground text-sm">
                    (16) 3434-1400
                  </p>
                </div>
              </div>

              {/* Email Contact */}
              <div className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">E-mail</p>
                  <p className="text-muted-foreground text-sm">
                    contato@mundialrevenda.com.br
                  </p>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="flex items-center space-x-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-600 dark:bg-gray-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-foreground text-sm font-medium">
                    WhatsApp
                  </p>
                  <p className="text-muted-foreground text-sm">
                    (16) 99727-5438
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="flex-1 sm:min-w-[200px] sm:flex-none"
            >
              <Link
                href="/sign-in"
                className="flex items-center justify-center"
              >
                Fazer Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="flex-1 sm:min-w-[200px] sm:flex-none"
            >
              <Link href="/" className="flex items-center justify-center">
                Página Principal
              </Link>
            </Button>
          </div>

          {/* Additional Information */}
          <div className="border-border/50 border-t pt-4 text-center">
            <p className="text-muted-foreground text-sm">
              <strong>Tempo de aprovação:</strong> Geralmente entre 1 a 3 dias
              úteis
            </p>
            <p className="text-muted-foreground mt-2 text-xs">
              Esta página será válida por apenas 5 minutos por segurança
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
