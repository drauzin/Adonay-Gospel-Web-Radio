import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, Users, MessageCircle } from "lucide-react";

const testimonials = [
  { id: 1, name: "Maria Santos", city: "São Paulo, SP", message: "A Rádio Graça transformou minha rotina matinal.", rating: 5 },
  { id: 2, name: "João Pedro", city: "Rio de Janeiro, RJ", message: "Encontrei paz e esperança através dos programas.", rating: 5 },
  { id: 3, name: "Ana Paula", city: "Belo Horizonte, MG", message: "Nossa família toda ouve! Especialmente edificante para meus filhos.", rating: 5 },
];

const stats = [
  { number: "10K+", label: "Ouvintes mensais" },
  { number: "24/7", label: "Horas no ar" },
  { number: "1000+", label: "Músicas gospel" },
  { number: "5", label: "Canais 24/7" },
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-white shadow rounded-3xl p-6 border border-blue-100 hover:shadow-lg transition-all">
                <div className="text-3xl md:text-4xl font-bold text-blue-800 mb-2">{stat.number}</div>
                <div className="text-sm text-blue-700">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-blue-900 mb-4">
            Testemunhos da Nossa Comunidade
          </h2>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto">
            Veja como a Rádio Graça tem abençoado vidas por todo o Brasil.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              className="bg-white rounded-3xl border border-blue-100 shadow hover:shadow-lg transition-all"
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Quote className="h-8 w-8 text-blue-800 opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-blue-600 text-blue-600" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-800 leading-relaxed mb-2">"{t.message}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-blue-900">{t.name}</p>
                    <p className="text-sm text-blue-700">{t.city}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-white rounded-3xl border border-blue-100 shadow hover:shadow-lg transition-all">
            <CardContent className="p-8 flex flex-col items-center gap-4">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-200 rounded-full mb-4">
                <MessageCircle className="h-8 w-8 text-blue-800" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-blue-900 mb-4">
                Faça Parte da Nossa Comunidade
              </h3>
              <p className="text-blue-700 text-center mb-6">
                Compartilhe seu testemunho, faça pedidos de oração e conecte-se com outros irmãos online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                <Button className="bg-blue-700 text-white hover:bg-blue-600 shadow w-full sm:w-auto">
                  Enviar Testemunho
                </Button>
                <Button className="bg-white text-blue-800 border border-blue-300 hover:bg-blue-50 shadow w-full sm:w-auto">
                  Pedido de Oração
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </section>
  );
};

export default CommunitySection;
