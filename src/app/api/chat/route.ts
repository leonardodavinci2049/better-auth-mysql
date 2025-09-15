import { NextRequest, NextResponse } from "next/server";
// import OpenAIService from "@/services/api/openai/openai-service";
// import type { ChatMessage } from "@/services/api/openai/openai-service";

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json(
      { success: false, error: "Serviço de chat não implementado ainda" },
      { status: 501 },
    );
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
