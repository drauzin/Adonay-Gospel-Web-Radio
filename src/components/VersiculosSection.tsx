import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, ChevronRight, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Verse {
  text: string;
  reference: string;
}

const versesList = [
  "João 3:16",
  "Salmos 23:1",
  "Filipenses 4:13",
  "Romanos 8:28",
  "Provérbios 3:5",
]; // Lista de versículos para navegação

const BibleVerseSection = () => {
  const [verse, setVerse] = useState<Verse>({ text: "", reference: "" });
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  const fetchVerse = async (verseRef: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bible-api.com/${verseRef}?translation=almeida`
      );
      const data = await response.json();
      setVerse({ text: data.text, reference: data.reference });
    } catch (error) {
      console.error("Erro ao buscar versículo:", error);
      setVerse({ text: "Não foi possível carregar o versículo.", reference: "" });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVerse(versesList[index]);
  }, [index]);

  const handleNext = () => setIndex((prev) => (prev + 1) % versesList.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + versesList.length) % versesList.length);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Versículo do Dia",
        text: `"${verse.text}" - ${verse.reference}`,
      });
    } else {
      navigator.clipboard.writeText(`"${verse.text}" - ${verse.reference}`);
      alert("Versículo copiado para a área de transferência!");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white/90 via-yellow-50/80 to-white/90 border-t border-yellow-200">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-yellow-100 p-3 rounded-xl shadow-md">
            <BookOpen className="h-6 w-6 text-yellow-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-yellow-800 drop-shadow-md">
            Versículo do Dia
          </h2>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl flex flex-col items-center gap-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-12 h-12 border-4 border-yellow-300 border-t-yellow-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <p className="text-xl md:text-2xl font-serif text-gray-800 mb-2">
                "{verse.text}"
              </p>
              <p className="text-yellow-700 font-semibold mb-4">{verse.reference}</p>
            </>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handlePrev}
              className="flex items-center gap-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 shadow transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-200 shadow transition-all"
            >
              Próximo
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button
              onClick={handleShare}
              className="flex items-center gap-2 bg-yellow-600 text-white hover:bg-yellow-700 shadow transition-all"
            >
              <Share2 className="h-4 w-4" />
              Compartilhar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BibleVerseSection;
