CREATE TABLE t_p92707144_sirius_research_proj.site_content (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE t_p92707144_sirius_research_proj.dogs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  title VARCHAR(200) NOT NULL,
  age VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p92707144_sirius_research_proj.site_content (key, value) VALUES
  ('hero_title', 'GASPOWER'),
  ('hero_subtitle', 'Кангальская овчарка'),
  ('hero_description', 'Разведение чистокровных кангалов с выдающимися рабочими качествами и безупречной родословной.'),
  ('hero_images', '["https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/76ca5119-568a-45bd-8341-7e611e8a84df.jpg","https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/8637afd3-e084-45f5-82f9-b2257ad193de.jpg","https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/70c2b0c4-df73-40c8-a93f-a906349866ce.jpg","https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/ea2439a9-08ae-4f3d-b8e7-9d4b8c82749a.jpg"]'),
  ('about_title', 'GASPOWER — сила и характер'),
  ('about_text1', 'Мы занимаемся разведением кангальских овчарок — одной из древнейших и мощнейших пород мира. Наш питомник основан на принципах здоровья, темперамента и соответствия стандарту породы.'),
  ('about_text2', 'Каждый щенок GASPOWER рождается в любви, проходит ветеринарный контроль, вакцинацию и получает документы РКФ. Мы тщательно подбираем пары, чтобы сохранить лучшие качества породы.'),
  ('contact_phone', '+7 (900) 000-00-00'),
  ('contact_telegram', '@gaspower_kennel'),
  ('contact_vk', 'vk.com/gaspower'),
  ('contact_telegram_url', 'https://t.me/'),
  ('contact_vk_url', 'https://vk.com/'),
  ('contact_phone_href', 'tel:+79000000000');

INSERT INTO t_p92707144_sirius_research_proj.dogs (name, title, age, image_url, description, sort_order) VALUES
  ('GasPower Arslan', 'Производитель | Чемпион России', '4 года', 'https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/76ca5119-568a-45bd-8341-7e611e8a84df.jpg', 'Выдающийся кобель с импозантным экстерьером и отличным здоровьем. Многократный победитель выставок.', 1),
  ('GasPower Zara', 'Производительница', '3 года', 'https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/ea2439a9-08ae-4f3d-b8e7-9d4b8c82749a.jpg', 'Великолепная сука с материнским инстинктом. Её щенки отличаются крепким телосложением и ровным характером.', 2),
  ('Помёт GASPOWER', 'Щенки • Есть в наличии', '2 месяца', 'https://cdn.poehali.dev/projects/1d5e1d48-86d9-45a1-af89-a126fe2acc90/files/8637afd3-e084-45f5-82f9-b2257ad193de.jpg', 'Щенки кангальской овчарки с документами РКФ. Вакцинированы, проглистованы, социализированы.', 3);
