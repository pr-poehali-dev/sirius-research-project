const URLS = {
  auth: 'https://functions.poehali.dev/dd5c0703-5b72-4639-b767-d28d15942e44',
  content: 'https://functions.poehali.dev/6894402a-62e0-4a7b-8b26-ce8e5818dd3d',
  dogs: 'https://functions.poehali.dev/84d59186-9b4e-4257-ad57-83ec6c31b6d8',
  upload: 'https://functions.poehali.dev/6c3015f7-ceee-4afd-b030-3d4251c66142',
};

export async function apiLogin(password: string): Promise<string> {
  const res = await fetch(URLS.auth, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка авторизации');
  return data.token;
}

export async function apiGetContent(): Promise<Record<string, string>> {
  const res = await fetch(URLS.content);
  return res.json();
}

export async function apiSaveContent(token: string, data: Record<string, string>) {
  const res = await fetch(URLS.content, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка сохранения');
}

export async function apiGetDogs() {
  const res = await fetch(URLS.dogs);
  return res.json();
}

export async function apiSaveDog(token: string, dog: Record<string, unknown>) {
  const method = dog.id ? 'PUT' : 'POST';
  const res = await fetch(URLS.dogs, {
    method,
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
    body: JSON.stringify(dog),
  });
  if (!res.ok) throw new Error('Ошибка сохранения');
  return res.json();
}

export async function apiDeleteDog(token: string, id: number) {
  const res = await fetch(URLS.dogs, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('Ошибка удаления');
}

export async function apiUpload(token: string, file: File): Promise<string> {
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
  const res = await fetch(URLS.upload, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token },
    body: JSON.stringify({ file: base64, content_type: file.type }),
  });
  if (!res.ok) throw new Error('Ошибка загрузки файла');
  const data = await res.json();
  return data.url;
}
