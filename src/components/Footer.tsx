import { Button } from "@/components/ui/button";
import { Heart, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-blue-900 border-t border-blue-200">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e descrição */}
        <div className="flex flex-col gap-3">
          <h3 className="text-2xl font-bold font-serif">Adonay Gospel</h3>
          <p className="text-sm opacity-80">
            24h no ar para glorificar a Deus, levando a Palavra e as melhores músicas gospel para todo o Brasil.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-800 hover:bg-blue-100">
              <Facebook className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-800 hover:bg-blue-100">
              <Instagram className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-900 hover:text-blue-800 hover:bg-blue-100">
              <Youtube className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Links Rápidos */}
        <div>
          <h4 className="font-semibold mb-3">Links Rápidos</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-blue-800 transition-colors">Início</a></li>
            <li><a href="#programs" className="hover:text-blue-800 transition-colors">Programação</a></li>
            <li><a href="#music" className="hover:text-blue-800 transition-colors">Músicas</a></li>
            <li><a href="#community" className="hover:text-blue-800 transition-colors">Comunidade</a></li>
            <li><a href="#contact" className="hover:text-blue-800 transition-colors">Contato</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-semibold mb-3">Contato</h4>
          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-4 w-4 text-blue-800" />
            <span>(11) 9999-8888</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-blue-800" />
            <span>contato@adonaygospel.com.br</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-800" />
            <span>Rua José Ivo da Silva, 123, Ouro Branco - MG</span>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-3">Receba novidades</h4>
          <p className="text-sm opacity-80 mb-2">
            Cadastre seu e-mail e receba nossa programação e novidades.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Seu e-mail"
              className="flex-1 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-600">Enviar</Button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-200 mt-6 pt-6 text-center text-sm opacity-80">
        <p>© 2024 Adonay Gospel. Todos os direitos reservados.</p>
        <div className="flex justify-center items-center gap-1 mt-1">
          Feito com <Heart className="h-4 w-4 text-blue-800" /> para a glória de Deus
        </div>
      </div>
    </footer>
  );
};

export default Footer;
