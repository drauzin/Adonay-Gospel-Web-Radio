const DownloadAppSection = () => {
  return (
    <section className="py-20 bg-gradient-soft">
      <div className="container mx-auto px-4 flex flex-col items-center text-center gap-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Ouça nossa rádio no seu celular
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Baixe nosso app e ouça sua estação gospel favorita a qualquer hora, em qualquer lugar.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          {/* Android */}
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition"
          >
            <img src="/icons/android.svg" alt="Android" className="w-6 h-6" />
            Android
          </a>

          {/* iOS */}
          <a
            href="#"
            className="flex items-center gap-3 px-6 py-3 bg-black hover:bg-gray-900 text-white rounded-lg shadow-md transition"
          >
            <img src="/icons/ios.svg" alt="iOS" className="w-6 h-6" />
            iOS
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
