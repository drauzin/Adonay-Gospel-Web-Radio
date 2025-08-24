import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar } from "lucide-react";

const programs = [
  {
    id: 1,
    title: "Momento de Oração",
    host: "Pastor João Silva",
    time: "06:00 - 07:00",
    days: "Segunda a Sexta",
    description: "Comece o dia com oração e meditação na Palavra de Deus.",
    category: "Devocionais"
  },
  {
    id: 2,
    title: "Gospel Hits",
    host: "Ana Maria",
    time: "08:00 - 10:00",
    days: "Todos os dias",
    description: "Os maiores sucessos da música gospel nacional e internacional.",
    category: "Musical"
  },
  {
    id: 3,
    title: "Palavra Viva",
    host: "Pr. Carlos Mendes",
    time: "12:00 - 13:00",
    days: "Segunda a Sexta",
    description: "Estudos bíblicos profundos para fortalecer sua fé.",
    category: "Ensino"
  },
  {
    id: 4,
    title: "Jovens na Fé",
    host: "Daniel e Rebeca",
    time: "19:00 - 20:00",
    days: "Terça e Quinta",
    description: "Programa dedicado aos jovens cristãos, com música e reflexões.",
    category: "Youth"
  }
];

const ProgramsSection = () => {
  return (
    <section id="programs" className="py-16 bg-gospel-dove">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Nossa Programação
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Confira os programas especiais da Rádio Graça, com conteúdo edificante 
            para toda a família cristã.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="shadow-soft hover:shadow-glow transition-all duration-300 bg-card border-gospel-secondary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-gospel-accent text-foreground rounded-full">
                    {program.category}
                  </span>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{program.host}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{program.time}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{program.days}</span>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {program.description}
                </p>
                
                <Button variant="soft" size="sm" className="w-full">
                  Mais Informações
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="gospel" size="lg">
            Ver Programação Completa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;