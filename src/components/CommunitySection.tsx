import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, Users, MessageCircle } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Santos",
    city: "São Paulo, SP",
    message: "A Rádio Graça transformou minha rotina matinal. Começar o dia ouvindo palavra e louvor faz toda diferença!",
    rating: 5
  },
  {
    id: 2,
    name: "João Pedro",
    city: "Rio de Janeiro, RJ", 
    message: "Encontrei paz e esperança através dos programas. A qualidade musical e espiritual é excepcional.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Paula",
    city: "Belo Horizonte, MG",
    message: "Nossa família toda ouve! Os programas para jovens são especialmente edificantes para meus filhos.",
    rating: 5
  }
];

const stats = [
  { number: "10K+", label: "Ouvintes mensais" },
  { number: "24/7", label: "Horas no ar" },
  { number: "1000+", label: "Músicas gospel" },
  { number: "5", label: "Canais 24/7" }
];

const CommunitySection = () => {
  return (
    <section id="community" className="py-16 gradient-soft">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Testemunhos da Nossa Comunidade
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja como a Rádio Graça tem abençoado vidas por todo o Brasil, 
            levando esperança e edificação espiritual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-soft bg-card hover:shadow-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Quote className="h-8 w-8 text-primary opacity-50" />
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.message}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gospel-secondary rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.city}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community CTA */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-soft bg-card">
            <CardContent className="p-8">
              <div className="flex items-center justify-center w-16 h-16 bg-gospel-secondary rounded-full mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Faça Parte da Nossa Comunidade
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Compartilhe seu testemunho, faça pedidos de oração e conecte-se 
                com outros irmãos em nossa comunidade online.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="gospel" size="lg">
                  Enviar Testemunho
                </Button>
                <Button variant="soft" size="lg">
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