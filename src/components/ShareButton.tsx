import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";

const ShareButton = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Adonay Gospel",
      text: "Confira o site de música gospel 24h no ar!",
      url: window.location.href,
    };

    // Tenta Web Share API (mobile)
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Erro ao compartilhar:", err);
      }
    } else {
      // Fallback: copia o link no desktop
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Volta ao normal após 2s
      } catch (err) {
        console.error("Erro ao copiar link:", err);
      }
    }
  };

  return (
    <div className="relative inline-block">
      <Button
        onClick={handleShare}
        className="inline-flex items-center justify-center gap-2 bg-gospel-soft text-foreground hover:bg-gospel-secondary/50 border border-gospel-secondary/20 h-9 rounded-md px-3 transition-all duration-200"
      >
        <Share2 className="h-4 w-4" />
        Compartilhar
      </Button>

      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary-foreground text-white text-xs rounded-full px-3 py-1 animate-fade-up shadow-md">
          Link copiado!
        </span>
      )}

      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
        .animate-fade-up {
          animation: fadeUp 2s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default ShareButton;
