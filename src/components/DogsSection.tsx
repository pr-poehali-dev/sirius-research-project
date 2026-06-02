import { useEffect, useState } from 'react';
import { apiGetDogs } from '@/lib/api';

type Dog = { id: number; name: string; title: string; age: string; image: string; desc: string };

export default function DogsSection() {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    apiGetDogs().then(setDogs);
  }, []);

  return (
    <section id="dogs" className="bg-black py-24">
      <div className="container mx-auto px-8 md:px-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-amber-400" />
          <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Наши собаки</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-16">
          Питомцы питомника
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {dogs.map((dog) => (
            <div key={dog.id} className="group overflow-hidden bg-zinc-900">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={dog.image}
                  alt={dog.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-amber-400 text-black text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                    {dog.age}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{dog.name}</h3>
                <p className="text-amber-400 text-sm font-medium mb-3">{dog.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{dog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}