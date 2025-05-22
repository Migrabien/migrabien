import OpenAI from 'openai';

// Función para obtener el cliente de OpenAI solo cuando se necesite
// Esto evita que se inicialice durante la fase de construcción
export function getOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true, // Solo para desarrollo, no recomendado en producción
  });
}

// Función para generar respuestas del coach utilizando GPT
export async function generateCoachResponse(
  userMessage: string, 
  chatHistory: { role: 'user' | 'assistant', content: string }[]
) {
  try {
    const openai = getOpenAIClient();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Usando gpt-3.5-turbo que es más accesible
      messages: [
        {
          role: "system",
          content: `Eres un Coach de Migración especializado en ayudar a personas latinoamericanas a migrar a España.
          Proporciona información precisa, útil y empática sobre el proceso migratorio, requisitos de visado, 
          documentación necesaria, opciones de vivienda, trabajo y educación.
          Sé amigable y comprensivo, pero mantén tus respuestas concisas y al punto.
          Si no conoces la respuesta a una pregunta específica, indícalo claramente y sugiere buscar 
          información oficial en las embajadas o consulados correspondientes.`
        },
        ...chatHistory,
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "Lo siento, no pude generar una respuesta.";
  } catch (error) {
    console.error("Error al generar respuesta del coach:", error);
    return "Lo siento, ha ocurrido un error al procesar tu pregunta. Por favor, intenta nuevamente.";
  }
}
