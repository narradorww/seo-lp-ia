'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './MagicMirror.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'Me fale sobre sua experiência com React Native',
  'Quais projetos você mais se orgulha?',
  'Como você trabalha remotamente?',
  'Qual é sua disponibilidade para iniciar?',
];

export default function MagicMirror() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    setMessages([...updatedMessages, { role: 'assistant', content: '' }]);

    try {
      const response = await fetch('/api/mirror', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) throw new Error('Erro na resposta');

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages([...updatedMessages, { role: 'assistant', content: accumulated }]);
      }
    } catch {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'Desculpe, ocorreu um erro. Tente novamente.' },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage(input);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h2 className={styles.heading}>MirrorIA</h2>
            <p className={styles.subtext}>Converse com o digital twin de Rodrigo Alexandre</p>
          </div>
        </div>
      </div>

      {messages.length === 0 && (
        <div className={styles.suggestions}>
          {SUGGESTED_QUESTIONS.map((q) => (
            <button
              key={q}
              className={styles.suggestionChip}
              onClick={() => sendMessage(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {messages.length > 0 && (
        <div className={styles.chatWindow}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`${styles.message} ${msg.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
            >
              <span className={styles.roleLabel}>
                {msg.role === 'user' ? 'Você' : 'Rodrigo'}
              </span>
              <p className={styles.messageText}>
                {msg.content}
                {msg.role === 'assistant' && isLoading && i === messages.length - 1 && (
                  <span className={styles.cursor}>▋</span>
                )}
              </p>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      <div className={styles.inputRow}>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Faça uma pergunta ao Rodrigo..."
          disabled={isLoading}
        />
        <button
          className={styles.button}
          onClick={() => sendMessage(input)}
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? '...' : 'Enviar'}
        </button>
      </div>
    </div>
  );
}
