export default function AboutSection() {
  const facts = [
    { number: '10+', label: 'лет разведения' },
    { number: '50+', label: 'щенков в добрые руки' },
    { number: '5', label: 'чемпионов породы' },
    { number: '100%', label: 'чистокровные кангалы' },
  ];

  return (
    <section id="about" className="bg-zinc-900 py-24">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">О питомнике</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              GASPOWER — <br />сила и характер
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-4">
              Мы занимаемся разведением кангальских овчарок — одной из древнейших и мощнейших пород мира. Наш питомник основан на принципах здоровья, темперамента и соответствия стандарту породы.
            </p>
            <p className="text-white/70 text-lg leading-relaxed">
              Каждый щенок GASPOWER рождается в любви, проходит ветеринарный контроль, вакцинацию и получает документы РКФ. Мы тщательно подбираем пары, чтобы сохранить лучшие качества породы.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {facts.map((fact) => (
              <div key={fact.label} className="border border-white/10 p-8 text-center">
                <p className="text-5xl font-bold text-amber-400 mb-2">{fact.number}</p>
                <p className="text-white/60 text-sm uppercase tracking-wider">{fact.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
