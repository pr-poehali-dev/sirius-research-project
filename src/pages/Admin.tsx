import { useState, useEffect } from 'react';
import { apiLogin, apiGetContent, apiSaveContent, apiGetDogs, apiSaveDog, apiDeleteDog, apiUpload } from '@/lib/api';

const TOKEN_KEY = 'gaspower_admin_token';

type Dog = { id?: number; name: string; title: string; age: string; image: string; desc: string; sort_order: number };
type Content = Record<string, string>;

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [tab, setTab] = useState<'texts' | 'slider' | 'dogs' | 'contacts'>('texts');
  const [content, setContent] = useState<Content>({});
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');

  const [editDog, setEditDog] = useState<Dog | null>(null);
  const [dogUploading, setDogUploading] = useState(false);
  const [sliderImages, setSliderImages] = useState<string[]>([]);
  const [sliderUploading, setSliderUploading] = useState(false);

  useEffect(() => {
    if (token) loadData();
  }, [token]);

  async function loadData() {
    const [c, d] = await Promise.all([apiGetContent(), apiGetDogs()]);
    setContent(c);
    setDogs(d);
    try { setSliderImages(JSON.parse(c.hero_images || '[]')); } catch { setSliderImages([]); }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const t = await apiLogin(password);
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    } catch (err: unknown) {
      setLoginError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoginLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
  }

  function showSaved() {
    setSavedMsg('Сохранено!');
    setTimeout(() => setSavedMsg(''), 2500);
  }

  async function saveContent(patch: Content) {
    setSaving(true);
    try {
      await apiSaveContent(token, patch);
      setContent((prev) => ({ ...prev, ...patch }));
      showSaved();
    } finally { setSaving(false); }
  }

  async function saveSlider() {
    setSaving(true);
    try {
      await apiSaveContent(token, { hero_images: JSON.stringify(sliderImages) });
      showSaved();
    } finally { setSaving(false); }
  }

  async function handleSliderUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSliderUploading(true);
    try {
      const url = await apiUpload(token, file);
      setSliderImages((prev) => [...prev, url]);
    } finally { setSliderUploading(false); e.target.value = ''; }
  }

  async function handleDogImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editDog) return;
    setDogUploading(true);
    try {
      const url = await apiUpload(token, file);
      setEditDog((d) => d ? { ...d, image: url } : d);
    } finally { setDogUploading(false); e.target.value = ''; }
  }

  async function saveDog() {
    if (!editDog) return;
    setSaving(true);
    try {
      await apiSaveDog(token, editDog as Record<string, unknown>);
      await loadData();
      setEditDog(null);
      showSaved();
    } finally { setSaving(false); }
  }

  async function deleteDog(id: number) {
    if (!confirm('Удалить собаку?')) return;
    await apiDeleteDog(token, id);
    setDogs((prev) => prev.filter((d) => d.id !== id));
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <p className="text-amber-400 text-xs font-medium uppercase tracking-widest mb-2">Питомник</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">GASPOWER</h1>
            <p className="text-white/40 text-sm mt-1">Панель управления</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full bg-zinc-900 border border-white/10 text-white placeholder-white/30 px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
              autoFocus
            />
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-black font-semibold py-3 transition-colors uppercase tracking-wider"
            >
              {loginLoading ? 'Вход...' : 'Войти'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'texts', label: 'Тексты' },
    { id: 'slider', label: 'Слайдер' },
    { id: 'dogs', label: 'Собаки' },
    { id: 'contacts', label: 'Контакты' },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-amber-400 font-bold text-lg tracking-wider">GASPOWER</span>
          <span className="text-white/30 text-sm">/ Админка</span>
        </div>
        <div className="flex items-center gap-4">
          {savedMsg && <span className="text-green-400 text-sm">{savedMsg}</span>}
          <a href="/" target="_blank" className="text-white/40 hover:text-white text-sm transition-colors">← Сайт</a>
          <button onClick={logout} className="text-white/40 hover:text-red-400 text-sm transition-colors">Выйти</button>
        </div>
      </header>

      <div className="flex border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${tab === t.id ? 'border-amber-400 text-amber-400' : 'border-transparent text-white/50 hover:text-white'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">

        {/* ТЕКСТЫ */}
        {tab === 'texts' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Основные тексты</h2>
            {[
              { key: 'hero_title', label: 'Название питомника (Hero)' },
              { key: 'hero_subtitle', label: 'Подзаголовок (Hero)' },
              { key: 'hero_description', label: 'Описание в Hero', multiline: true },
              { key: 'about_title', label: 'Заголовок раздела «О питомнике»' },
              { key: 'about_text1', label: 'Первый абзац «О питомнике»', multiline: true },
              { key: 'about_text2', label: 'Второй абзац «О питомнике»', multiline: true },
            ].map(({ key, label, multiline }) => (
              <div key={key}>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">{label}</label>
                {multiline ? (
                  <textarea
                    rows={3}
                    value={content[key] || ''}
                    onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  />
                ) : (
                  <input
                    type="text"
                    value={content[key] || ''}
                    onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                )}
              </div>
            ))}
            <button
              onClick={() => saveContent({
                hero_title: content.hero_title, hero_subtitle: content.hero_subtitle,
                hero_description: content.hero_description, about_title: content.about_title,
                about_text1: content.about_text1, about_text2: content.about_text2,
              })}
              disabled={saving}
              className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-black font-semibold px-8 py-3 transition-colors"
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        )}

        {/* СЛАЙДЕР */}
        {tab === 'slider' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Фотографии в слайдере</h2>
            <div className="grid grid-cols-2 gap-4">
              {sliderImages.map((url, i) => (
                <div key={url} className="relative group">
                  <img src={url} alt="" className="w-full h-40 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {i > 0 && (
                      <button onClick={() => setSliderImages((p) => { const a = [...p]; [a[i-1], a[i]] = [a[i], a[i-1]]; return a; })} className="bg-white/20 hover:bg-white/40 text-white text-xs px-3 py-1">←</button>
                    )}
                    <button onClick={() => setSliderImages((p) => p.filter((_, j) => j !== i))} className="bg-red-500/80 hover:bg-red-500 text-white text-xs px-3 py-1">Удалить</button>
                    {i < sliderImages.length - 1 && (
                      <button onClick={() => setSliderImages((p) => { const a = [...p]; [a[i], a[i+1]] = [a[i+1], a[i]]; return a; })} className="bg-white/20 hover:bg-white/40 text-white text-xs px-3 py-1">→</button>
                    )}
                  </div>
                </div>
              ))}
              <label className="border-2 border-dashed border-white/20 hover:border-amber-400 h-40 flex items-center justify-center cursor-pointer transition-colors">
                <input type="file" accept="image/*" className="hidden" onChange={handleSliderUpload} disabled={sliderUploading} />
                <span className="text-white/40 text-sm">{sliderUploading ? 'Загрузка...' : '+ Добавить фото'}</span>
              </label>
            </div>
            <button onClick={saveSlider} disabled={saving} className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-black font-semibold px-8 py-3 transition-colors">
              {saving ? 'Сохранение...' : 'Сохранить порядок'}
            </button>
          </div>
        )}

        {/* СОБАКИ */}
        {tab === 'dogs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Карточки собак</h2>
              <button
                onClick={() => setEditDog({ name: '', title: '', age: '', image: '', desc: '', sort_order: dogs.length + 1 })}
                className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-4 py-2 text-sm transition-colors"
              >+ Добавить</button>
            </div>

            {dogs.map((dog) => (
              <div key={dog.id} className="flex items-center gap-4 bg-zinc-900 p-4 border border-white/10">
                <img src={dog.image} alt={dog.name} className="w-20 h-20 object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{dog.name}</p>
                  <p className="text-amber-400 text-sm">{dog.title}</p>
                  <p className="text-white/40 text-sm">{dog.age}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setEditDog({ ...dog })} className="border border-white/20 hover:border-amber-400 text-white/60 hover:text-amber-400 px-3 py-1 text-sm transition-colors">Изменить</button>
                  <button onClick={() => deleteDog(dog.id!)} className="border border-white/20 hover:border-red-400 text-white/60 hover:text-red-400 px-3 py-1 text-sm transition-colors">Удалить</button>
                </div>
              </div>
            ))}

            {editDog && (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                <div className="bg-zinc-900 border border-white/10 w-full max-w-lg p-6 space-y-4 max-h-screen overflow-y-auto">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{editDog.id ? 'Редактировать' : 'Новая собака'}</h3>
                    <button onClick={() => setEditDog(null)} className="text-white/40 hover:text-white">✕</button>
                  </div>

                  {[
                    { field: 'name', label: 'Имя' },
                    { field: 'title', label: 'Звание / статус' },
                    { field: 'age', label: 'Возраст' },
                  ].map(({ field, label }) => (
                    <div key={field}>
                      <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">{label}</label>
                      <input
                        type="text"
                        value={(editDog as Record<string, string>)[field] || ''}
                        onChange={(e) => setEditDog((d) => d ? { ...d, [field]: e.target.value } : d)}
                        className="w-full bg-zinc-800 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-amber-400 transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">Описание</label>
                    <textarea
                      rows={3}
                      value={editDog.desc}
                      onChange={(e) => setEditDog((d) => d ? { ...d, desc: e.target.value } : d)}
                      className="w-full bg-zinc-800 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Фотография</label>
                    {editDog.image && <img src={editDog.image} alt="" className="w-full h-40 object-cover mb-3" />}
                    <label className="border border-dashed border-white/20 hover:border-amber-400 px-4 py-3 flex items-center justify-center cursor-pointer transition-colors">
                      <input type="file" accept="image/*" className="hidden" onChange={handleDogImageUpload} disabled={dogUploading} />
                      <span className="text-white/40 text-sm">{dogUploading ? 'Загрузка...' : '+ Загрузить фото'}</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button onClick={saveDog} disabled={saving || dogUploading} className="flex-1 bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-black font-semibold py-3 transition-colors">
                      {saving ? 'Сохранение...' : 'Сохранить'}
                    </button>
                    <button onClick={() => setEditDog(null)} className="border border-white/20 hover:border-white/40 text-white/60 px-6 py-3 transition-colors">Отмена</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* КОНТАКТЫ */}
        {tab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Контактные данные</h2>
            {[
              { key: 'contact_phone', label: 'Телефон (отображаемый)' },
              { key: 'contact_phone_href', label: 'Телефон для ссылки (tel:+7...)' },
              { key: 'contact_telegram', label: 'Telegram (отображаемый)' },
              { key: 'contact_telegram_url', label: 'Telegram ссылка (https://t.me/...)' },
              { key: 'contact_vk', label: 'ВКонтакте (отображаемый)' },
              { key: 'contact_vk_url', label: 'ВКонтакте ссылка' },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-white/60 text-xs uppercase tracking-wider mb-1">{label}</label>
                <input
                  type="text"
                  value={content[key] || ''}
                  onChange={(e) => setContent((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-zinc-900 border border-white/10 text-white px-4 py-3 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            ))}
            <button
              onClick={() => saveContent({
                contact_phone: content.contact_phone, contact_phone_href: content.contact_phone_href,
                contact_telegram: content.contact_telegram, contact_telegram_url: content.contact_telegram_url,
                contact_vk: content.contact_vk, contact_vk_url: content.contact_vk_url,
              })}
              disabled={saving}
              className="bg-amber-400 hover:bg-amber-500 disabled:opacity-50 text-black font-semibold px-8 py-3 transition-colors"
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
