const dogs = [
  {
    name: 'GasPower Arslan',
    title: 'Производитель | Чемпион России',
    age: '4 года',
    image: 'https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/76ca5119-568a-45bd-8341-7e611e8a84df.jpg',
    desc: 'Выдающийся кобель с импозантным экстерьером и отличным здоровьем. Многократный победитель выставок.',
  },
  {
    name: 'GasPower Zara',
    title: 'Производительница',
    age: '3 года',
    image: 'https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/ea2439a9-08ae-4f3d-b8e7-9d4b8c82749a.jpg',
    desc: 'Великолепная сука с материнским инстинктом. Её щенки отличаются крепким телосложением и ровным характером.',
  },
  {
    name: 'Помёт GASPOWER',
    title: 'Щенки • Есть в наличии',
    age: '2 месяца',
    image: 'https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/8637afd3-e084-45f5-82f9-b2257ad193de.jpg',
    desc: 'Щенки кангальской овчарки с документами РКФ. Вакцинированы, проглистованы, социализированы.',
  },
];

export default function DogsSection() {
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
            <div key={dog.name} className="group overflow-hidden bg-zinc-900">
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
