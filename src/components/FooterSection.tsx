export default function FooterSection() {
  return (
    <footer className="bg-black border-t border-white/10 py-8">
      <div className="container mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white font-bold text-lg tracking-widest">GASPOWER</p>
        <p className="text-white/30 text-sm">Питомник кангальской овчарки · {new Date().getFullYear()}</p>
        <p className="text-white/30 text-sm">РКФ · FCI</p>
      </div>
    </footer>
  );
}
