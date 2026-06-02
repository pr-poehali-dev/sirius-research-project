export default function ContactSection() {
  return (
    <section id="contacts" className="bg-zinc-900 py-24">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-400" />
              <span className="text-amber-400 text-sm font-medium uppercase tracking-widest">Контакты</span>
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Свяжитесь с нами
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              Готовы ответить на все вопросы о породе, доступных щенках и условиях резервирования. Пишите или звоните — будем рады знакомству!
            </p>

            <div className="space-y-6">
              <a
                href="tel:+79000000000"
                className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-white/20 group-hover:border-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Телефон</p>
                  <p className="text-white font-medium">+7 (900) 000-00-00</p>
                </div>
              </a>

              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-white/20 group-hover:border-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">Telegram</p>
                  <p className="text-white font-medium">@gaspower_kennel</p>
                </div>
              </a>

              <a
                href="https://vk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/70 hover:text-amber-400 transition-colors group"
              >
                <div className="flex h-12 w-12 items-center justify-center border border-white/20 group-hover:border-amber-400 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.745-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.043-2.763-5.32-2.763-5.788 0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.18-3.625 2.18-3.625.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-0.5">ВКонтакте</p>
                  <p className="text-white font-medium">vk.com/gaspower</p>
                </div>
              </a>
            </div>
          </div>

          <div className="border border-white/10 p-8">
            <h3 className="text-xl font-bold text-white mb-6">Оставить заявку на щенка</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full bg-black/50 border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Телефон или Telegram"
                  className="w-full bg-black/50 border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Расскажите о себе и цели приобретения"
                  className="w-full bg-black/50 border border-white/20 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold py-3 transition-colors uppercase tracking-wider"
              >
                Отправить заявку
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
