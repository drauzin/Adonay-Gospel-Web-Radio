import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import html2canvas from "html2canvas";

interface Verse { text: string; reference: string; }

const versesList = ["João 3:16","Salmos 23:1","Filipenses 4:13","Romanos 8:28","Provérbios 3:5"];

const BibleVerseSection = () => {
  const [verse, setVerse] = useState<Verse>({ text: "", reference: "" });
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const verseRef = useRef<HTMLDivElement>(null);

  const fetchVerse = async (verseRefStr: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://bible-api.com/${verseRefStr}?translation=almeida`);
      const data = await response.json();
      setVerse({ text: data.text, reference: data.reference });
    } catch {
      setVerse({ text: "Não foi possível carregar o versículo.", reference: "" });
    }
    setLoading(false);
  };

  useEffect(() => { fetchVerse(versesList[index]); }, [index]);
  const handleNext = () => setIndex((prev) => (prev + 1) % versesList.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + versesList.length) % versesList.length);

  const handleCreateImage = async () => {
    if (!verseRef.current) return;
    const canvas = await html2canvas(verseRef.current, { scale: 2, backgroundColor: null });
    setImageURL(canvas.toDataURL("image/png"));
  };

  const handleDownloadImage = () => {
    if (!imageURL) return;
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = `versiculo-${verse.reference.replace(":", "-")}.png`;
    link.click();
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-6">

        {/* Título */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-xl shadow-md">
            <BookOpen className="h-6 w-6 text-blue-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-blue-900 drop-shadow-md">
            Versículo do Dia
          </h2>
        </div>

        {/* Card do versículo */}
        <Card
          ref={verseRef}
          className="max-w-3xl w-full bg-white shadow-md hover:shadow-lg border border-blue-100 rounded-2xl p-8 flex flex-col items-center gap-4"
          style={{ minHeight: "180px" }}
        >
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <p className="text-xl md:text-2xl font-serif text-gray-800 mb-2 leading-relaxed">"{verse.text}"</p>
              <p className="text-blue-700 font-semibold mb-2">{verse.reference}</p>
            </>
          )}
        </Card>

        {/* Botões */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <Button
            onClick={handlePrev}
            className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-md transition-all"
          >
            <ChevronLeft className="h-4 w-4"/>Anterior
          </Button>

          <Button
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-md transition-all"
          >
            Próximo<ChevronRight className="h-4 w-4"/>
          </Button>

          <Button
            onClick={handleCreateImage}
            className="flex items-center gap-2 bg-blue-100 text-blue-800 hover:bg-blue-200 shadow-md transition-all"
          >
            📸 Criar Imagem
          </Button>
        </div>
      </div>

      {/* Modal de imagem */}
      {imageURL && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="rounded-2xl p-6 max-w-lg w-full flex flex-col items-center gap-4 relative bg-white shadow-md hover:shadow-lg border border-blue-100">
            <button
              onClick={() => setImageURL(null)}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <X className="h-5 w-5"/>
            </button>
            <h3 className="text-xl font-semibold text-blue-800">Versículo em imagem</h3>
            <img src={imageURL} alt="Versículo" className="rounded-xl shadow-lg w-full" />
            <div className="flex gap-3 mt-2">
              <Button
                onClick={handleDownloadImage}
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 shadow-md transition-all"
              >
                Baixar
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BibleVerseSection;
