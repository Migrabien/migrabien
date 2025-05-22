import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicializar OpenAI con tu API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ID del asistente personalizado creado en la plataforma de OpenAI
const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || 'asst_5O5kyju5xpi1nhTZGGOSgiJw';

export async function POST(req: NextRequest) {
  try {
    const { message, threadId } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'El mensaje es requerido' },
        { status: 400 }
      );
    }

    let thread;
    
    // Si no hay un thread existente, crear uno nuevo
    if (!threadId) {
      thread = await openai.beta.threads.create();
    } else {
      thread = { id: threadId };
    }
    
    // Añadir el mensaje del usuario al thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message
    });
    
    // Ejecutar el asistente en el thread
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: ASSISTANT_ID
    });
    
    // Esperar a que el asistente termine de procesar
    let runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    
    // Esperar hasta que el asistente termine (polling)
    while (runStatus.status !== 'completed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      
      // Manejar errores o cancelaciones
      if (runStatus.status === 'failed' || runStatus.status === 'cancelled') {
        throw new Error(`Run ended with status: ${runStatus.status}`);
      }
    }
    
    // Obtener los mensajes del thread
    const messages = await openai.beta.threads.messages.list(thread.id);
    
    // Obtener la última respuesta del asistente
    const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');
    const lastMessage = assistantMessages[0];
    
    // Extraer el contenido del mensaje
    let responseContent = '';
    if (lastMessage && lastMessage.content && lastMessage.content.length > 0) {
      const textContent = lastMessage.content.find(content => content.type === 'text');
      if (textContent && 'text' in textContent && textContent.text.value) {
        responseContent = textContent.text.value;
      }
    }
    
    // Devolver la respuesta y el ID del thread para continuar la conversación
    return NextResponse.json({
      response: responseContent || 'Lo siento, no pude generar una respuesta.',
      threadId: thread.id
    });
    
  } catch (error) {
    console.error('Error en el endpoint del coach:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}
