import { NextRequest, NextResponse } from "next/server";
import OpenAIService from "@/services/api/openai/openai-service";
import type { ChatMessage } from "@/services/api/openai/openai-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory } = body;

    // Validação básica
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { success: false, error: "Mensagem é obrigatória" },
        { status: 400 },
      );
    }

    // Validação do histórico de conversação
    let validHistory: ChatMessage[] = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      validHistory = conversationHistory.filter(
        (msg: unknown): msg is ChatMessage => {
          if (!msg || typeof msg !== "object" || msg === null) return false;

          const candidate = msg as Record<string, unknown>;
          return (
            typeof candidate.content === "string" &&
            (candidate.role === "user" || candidate.role === "assistant")
          );
        },
      );
    }

    // Inicializa o serviço OpenAI
    const openAIService = new OpenAIService();

    // Envia a mensagem para o OpenAI
    const response = await openAIService.sendMessage(
      message.trim(),
      validHistory,
    );

    if (!response.success) {
      return NextResponse.json(
        { success: false, error: response.error },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    console.error("Erro na rota de chat:", error);

    return NextResponse.json(
      { success: false, error: "Erro interno do servidor" },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Endpoint de chat ativo. Use POST para enviar mensagens." },
    { status: 200 },
  );
}
