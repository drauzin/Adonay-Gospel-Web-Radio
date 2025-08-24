import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface Radio {
  id: number;
  name: string;
  url: string;
}

interface RadioContextType {
  currentRadio: Radio | null;
  isPlaying: boolean;
  isLoading: boolean;
  volume: number;
  playRadio: (radio: Radio) => Promise<void>;
  pauseRadio: () => void;
  setVolume: (volume: number) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

// Lista de rádios de exemplo
const defaultRadios: Radio[] = [
  { id: 1, name: "Rádio Adonay Gospel", url: "https://stm8.voxhd.com.br:7116/stream" },
  { id: 2, name: "Radio 2", url: "https://stm.voxhd.com.br:7290/stream" },
  { id: 3, name: "Radio 3", url: "https://stm.voxhd.com.br:7290/stream" },
  { id: 4, name: "Radio 4", url: "https://stm.voxhd.com.br:7290/stream" },
];

export const RadioProvider = ({ children }: { children: ReactNode }) => {
  // rádio inicial
  const [currentRadio, setCurrentRadio] = useState<Radio>(defaultRadios[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolumeState] = useState(75);

  // cria o objeto de áudio já no início
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  const playRadio = async (radio: Radio) => {
    try {
      setIsLoading(true);

      // sempre define a URL nova (mesmo que seja a mesma rádio, garante refresh)
      audioRef.current.src = radio.url;
      audioRef.current.crossOrigin = "anonymous";
      audioRef.current.preload = "none";
      audioRef.current.volume = volume / 100;

      // tenta dar play (só funciona após interação do usuário)
      await audioRef.current.play();

      setCurrentRadio(radio);
      setIsPlaying(true);
    } catch (error) {
      console.error("Erro ao reproduzir rádio:", error);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const pauseRadio = () => {
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <RadioContext.Provider
      value={{
        currentRadio,
        isPlaying,
        isLoading,
        volume,
        playRadio,
        pauseRadio,
        setVolume,
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (context === undefined) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
};
