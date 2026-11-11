import { useState, useRef, useEffect } from "react";
import { travelAssistantChat } from "../lib/api/travel-assistant.functions";

interface Message {
  text: string;
  isUser: boolean;
  type?: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy el asistente virtual de BG Travel Peru. ¿En que puedo ayudarte?", isUser: false, type: "welcome" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setLoading(true);

    try {
      const r = await travelAssistantChat({ data: { message: userMsg } }) as any;
      if (r.ok) {
        setMessages(prev => [...prev, { text: r.response, isUser: false, type: r.type }]);
      }
    } catch {
      setMessages(prev => [...prev, { text: "Lo siento, hubo un error. Intenta de nuevo.", isUser: false }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "Recomiendame un destino",
    "Precios de paquetes",
    "Info sobre Cusco",
    "Consejos para el mal de altura",
    "Nature Punk",
    "Como reservar",
  ];

  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const isBold = line.startsWith("**") && line.endsWith("**");
      const isBullet = line.startsWith("- ") || line.startsWith("1.") || line.startsWith("2.");
      const isHeader = line.startsWith("#");
      const isNumbered = /^\d+\./.test(line);
      return (
        <p key={i} className={`${isBold ? "font-bold" : ""} ${isBullet || isNumbered ? "pl-4" : ""} ${i > 0 ? "mt-1" : ""}`}>
          {line.replace(/\*\*/g, "")}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-amber shadow-lg shadow-amber/20 transition-all hover:scale-105 hover:shadow-amber/30"
          aria-label="Abrir chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-bg-navy">
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a18.195 18.195 0 01-1.032 6.71 18.02 18.02 0 01-2.823 5.036l3.144 3.144a.75.75 0 01-.53 1.28H12.75a.75.75 0 01-.53-.22l-3.379-3.379a.75.75 0 01-.162-.819.75.75 0 01.497-.477A16.525 16.525 0 0012.75 16.5c1.46 0 2.87-.194 4.212-.557l.955-.266-.604-.828a16.514 16.514 0 01-2.615-4.768 16.54 16.54 0 01-.72-4.104c.024-1.286.266-2.558.722-3.77l.335-.892-.937-.166A18.026 18.026 0 0011.25 3.5c-2.148 0-4.263.14-6.337.408l-.937.166.335.892c.456 1.212.698 2.484.722 3.77v.073a.75.75 0 01-1.5.02 18.048 18.048 0 00-.754-3.74l-.191-.636.636-.19z" />
          </svg>
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="flex h-[520px] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-border-light bg-bg-card shadow-2xl shadow-black/30">
          {/* Header */}
          <div className="flex items-center justify-between bg-amber px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-bg-navy/20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-bg-navy">
                  <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a18.195 18.195 0 01-1.032 6.71 18.02 18.02 0 01-2.823 5.036l3.144 3.144a.75.75 0 01-.53 1.28H12.75a.75.75 0 01-.53-.22l-3.379-3.379a.75.75 0 01-.162-.819.75.75 0 01.497-.477A16.525 16.525 0 0012.75 16.5c1.46 0 2.87-.194 4.212-.557l.955-.266-.604-.828a16.514 16.514 0 01-2.615-4.768 16.54 16.54 0 01-.72-4.104c.024-1.286.266-2.558.722-3.77l.335-.892-.937-.166A18.026 18.026 0 0011.25 3.5c-2.148 0-4.263.14-6.337.408l-.937.166.335.892c.456 1.212.698 2.484.722 3.77v.073a.75.75 0 01-1.5.02 18.048 18.048 0 00-.754-3.74l-.191-.636.636-.19z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-bg-navy">Asistente BG Travel</p>
                <p className="text-xs text-bg-navy/70">Online — Responde al instante</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Cerrar chat" className="rounded-lg p-1.5 text-bg-navy/70 hover:bg-bg-navy/10 hover:text-bg-navy">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.isUser
                    ? "bg-amber text-bg-navy"
                    : "bg-bg-surface text-text-primary border border-border-light"
                }`}>
                  {formatText(msg.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-border-light bg-bg-surface px-4 py-3">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-text-muted" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />

            {/* Suggestions */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMessages(prev => [...prev, { text: s, isUser: true }]);
                      setLoading(true);
                      travelAssistantChat({ data: { message: s } }).then((r: any) => {
                        if (r.ok) setMessages(prev => [...prev, { text: r.response, isUser: false, type: r.type }]);
                        setLoading(false);
                      });
                    }}
                    className="rounded-full border border-border-light bg-bg-surface px-3 py-1.5 text-xs text-text-secondary transition-colors hover:border-amber/30 hover:text-amber"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-border-light p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 rounded-xl border border-border-light bg-bg-navy px-4 py-2.5 text-sm outline-none transition-colors focus:border-amber/50"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                aria-label="Enviar mensaje"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber text-bg-navy transition-colors hover:bg-amber-light disabled:opacity-50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
