# CASTA

MVP social casino на Next.js, TypeScript і Tailwind CSS. Проєкт використовує лише віртуальні монети: без депозитів, cash-out або призів у реальних грошах.

## Сторінки

- `/` — головна;
- `/games` — каталог ігор;
- `/games/jungle-wheel` — перша робоча гра;
- `/profile` — профіль і прогрес;
- `/rewards` — щоденні нагороди;
- `/shop` — косметичний магазин за virtual coins;
- `/login` — реєстрація та вхід через Supabase Auth.

## Локальний запуск

1. Скопіюйте `.env.example` у `.env.local` і додайте публічні ключі Supabase.
2. Виконайте `npm install`.
3. Виконайте `npm run dev`.

Без змінних Supabase сайт працює в гостьовому режимі, а прогрес зберігається на поточному пристрої.

## Supabase

Застосуйте міграцію з `supabase/migrations`. Вона створює профілі, віртуальні гаманці, історію ігор, щоденні нагороди, косметичний магазин і серверні функції для безпечного оновлення балансу.

Для Vercel потрібні:

- `NEXT_PUBLIC_SUPABASE_URL` або наявний `SUPABASE_URL`;
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` або наявний `SUPABASE_PUBLISHABLE_KEY`.
