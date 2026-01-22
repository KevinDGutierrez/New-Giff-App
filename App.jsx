
import React, { useState, useEffect } from 'react';
import { useGiphy } from './hooks/useGiphy';
import { Search, Sparkles, Wand2, ArrowRight, Grid, LayoutTemplate, Palette, BarChart, Menu } from 'lucide-react';

const App = () => {
  const { gifs, loading, error, searchGifs, getRandomGif } = useGiphy();
  const [query, setQuery] = useState('');

  // Initial load
  useEffect(() => {
    getRandomGif();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchGifs(query);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      {/* Navigation - Squarespace Style */}
      <nav className="sticky top-0 z-50 glass-nav px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={18} />
            </div>
            <span>GIF STUDIO</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Plantillas</a>
            <a href="#" className="hover:text-black transition-colors">Diseño inteligente</a>
            <a href="#" className="hover:text-black transition-colors">Herramientas creativas</a>
            <a href="#" className="hover:text-black transition-colors">SEO y analítica</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:block text-xs font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">
            INICIAR SESIÓN
          </button>
          <button className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all shadow-lg shadow-black/5">
            COMENZAR
          </button>
          <Menu className="md:hidden" size={20} />
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <h1 className="serif text-5xl md:text-7xl leading-[1.1] font-light max-w-3xl">
              Empieza con los mejores <span className="italic">GIFs</span> para tus proyectos <span className="underline decoration-1 underline-offset-8">creativos</span>
            </h1>
          </div>
          
          <div className="lg:col-span-4 pt-4">
            <div className="border border-gray-200 p-6 rounded-sm bg-white hover:border-black transition-colors group cursor-pointer">
              <div className="flex items-center gap-3 mb-4">
                <Wand2 size={24} />
                <span className="text-sm font-bold tracking-widest uppercase">DESCUBRE CON IA</span>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Nuestra tecnología inteligente te ayuda a encontrar el GIF perfecto para cada contexto emocional.
              </p>
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                PROBAR AHORA <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Interaction Bar */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <form onSubmit={handleSearch} className="relative w-full md:max-w-xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca plantillas de GIFs..."
              className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-100 bg-white search-pill focus:outline-none focus:border-black transition-all text-sm font-medium"
            />
            <button 
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest"
            >
              BUSCAR
            </button>
          </form>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-300 mx-2 hidden md:block">|</span>
            <button 
              onClick={getRandomGif}
              className="flex items-center gap-2 px-6 py-4 rounded-full border border-gray-100 bg-white hover:bg-black hover:text-white transition-all text-sm font-bold tracking-widest uppercase shadow-sm"
            >
              SORPRÉNDEME <Sparkles size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse">
            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase">Cargando inspiración...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center">
            <p className="font-bold">Error de conexión</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {gifs.map((gif) => (
            <div key={gif.id} className="break-inside-avoid bento-card relative group bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
              <img 
                src={gif.images.original.url} 
                alt={gif.title} 
                className="w-full h-auto grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <p className="text-white text-xs font-bold tracking-widest uppercase mb-1">{gif.title || 'Sin título'}</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/20 rounded text-[9px] text-white font-bold uppercase">HD</span>
                  <span className="px-2 py-1 bg-white/20 rounded text-[9px] text-white font-bold uppercase">TRENDING</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && gifs.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="serif text-2xl text-gray-400">No encontramos resultados para tu búsqueda.</p>
            <button onClick={getRandomGif} className="mt-4 text-black font-bold border-b-2 border-black">Volver a lo aleatorio</button>
          </div>
        )}
      </main>

      {/* Footer Minimalist */}
      <footer className="border-t border-gray-100 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-xs font-medium text-gray-400">
          <div className="flex items-center gap-8">
            <span className="text-black font-bold tracking-tighter text-sm uppercase">GIF Studio</span>
            <a href="#" className="hover:text-black transition-colors">Privacidad</a>
            <a href="#" className="hover:text-black transition-colors">Términos</a>
            <a href="#" className="hover:text-black transition-colors">Cookies</a>
          </div>
          <p>© 2025 GIF Studio Inc. Inspirado por la elegancia.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
