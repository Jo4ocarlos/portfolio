// src/components/bento/EmailButton.tsx
'use client';

import { useState } from 'react';

interface EmailButtonProps {
  email: string;
  className?: string;
}

export function EmailButton({ email, className = '' }: EmailButtonProps) {
  const [copiado, setCopiado] = useState(false);

  const lidarComCopia = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar o e-mail: ', err);
    }
  };

  return (
    <button 
      onClick={lidarComCopia} 
      className={className}
      aria-label={copiado ? 'E-mail copiado' : 'Copiar endereço de e-mail'}
    >
      {copiado ? 'Copiado! ✓' : <>E-mail <span>↗</span></>}
    </button>
  );
}