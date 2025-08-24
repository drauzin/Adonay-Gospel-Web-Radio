import { Button } from "@/components/ui/button";
import { Radio, Heart, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="gradient-primary p-2 rounded-xl">
                <Radio className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">Adonay Gospel</h3>
                <p className="text-sm opacity-80">24h no ar para glorificar a Deus</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-6 max-w-md">
              Levando a Palavra de Deus e as melhores músicas gospel para todo o Brasil. 
              Uma rádio cristã comprometida com a evangelização e edificação da família.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-primary hover:bg-background/10">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Início</a></li>
              <li><a href="#programs" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Programação</a></li>
              <li><a href="#music" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Músicas</a></li>
              <li><a href="#community" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Comunidade</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 hover:text-primary transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 opacity-80">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-8888</span>
              </div>
              <div className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4" />
                <span>contato@adonaygospel.com.br</span>
              </div>
              <div className="flex items-start gap-2 opacity-80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Rua José Ivo da Silva, 123<br />Ouro Branco - MG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-80">
            © 2024 Adonay Gospel. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 text-sm opacity-80">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-primary" />
            <span>para a glória de Deus</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;