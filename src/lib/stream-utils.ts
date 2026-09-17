// src/lib/stream-utils.ts

export const buildStreamResponse = (
  streamLogic: (controller: ReadableStreamDefaultController<Uint8Array>, encoder: TextEncoder) => Promise<void>
): Response => {
  const encoder = new TextEncoder();
  const customStream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        await streamLogic(controller, encoder);
        controller.close();
      } catch (streamError) {
        controller.error(streamError);
      }
    },
  });

  return new Response(customStream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Content-Type-Options': 'nosniff',
    },
  });
};