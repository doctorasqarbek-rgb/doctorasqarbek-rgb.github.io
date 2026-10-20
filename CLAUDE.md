# CLAUDE.md — doctorasqarbek-rgb.github.io (Orom ilovasi, frontend)

GitHub Pages. Domen: app.oromlife.uz (CNAME). Ilova: `orom-app/index.html` — BITTA katta fayl (HTML + CSS + JS), PWA.

## Fayllar (orom-app/)
- `index.html` — butun ilova. `APP_VERSION` (taxminan 1103-qator) HAR o'zgarishda yangilanadi (masalan 2026.10.16-a): ilova shu orqali o'zi yangilanadi.
- `ru.json`, `premium-ru.json` — rus tili tarjimasi (o'zbekcha matn → rus). Yangi matn qo'shilsa, tarjimasi ham qo'shiladi.
- `sw.js` (service worker), `manifest.json`, ikonlar, `privacy.html`.
- Ildizdagi `index.html` — asosiy sayt (ilova emas); kerak bo'lmasa tegmang.

## Qoidalar
- Tariflar `PLANS` da (backend va bot bilan bir xil). Premium: «Doktor bilan birga yopiq darslar va maslahatlar». Standard kartasida «yo'q» qatorlari bo'lmaydi.
- Kursda yopiq (PRO) bo'limga kirsa mavzular nomi ko'rinadi; obuna so'rovi darsga bosganda chiqadi.
- «Kurs videolari» kartasi ham bosh sahifada, ham Kurs bo'limida (eng tepada) turadi. «To'lovlar tarixi» yo'q.
- Meta Pixel (ID 1699786344853527) head'da; Play rejimida o'chiq. Hodisalar `oromTrack` orqali.
- Play rejimi (`?play=1` / android-app): to'lov tugmalari yashirin (do'kon siyosati).
- Tekshirish: skriptlarni ajratib `node --check`; jsdom bilan sinash mumkin.

## Umumiy qoidalar
- Foydalanuvchi (Dr. Asqarbek Ergashev) o'zbekcha yozadi: javoblar va foydalanuvchiga ko'rinadigan matnlar o'zbek tilida (lotin).
- Doktorni **«Shifokor-Psixoterapevt»** deb yozing. «Doktor Ergashev klinikasi» deb YOZMANG (o'z klinikasi yo'q).
- Parol, kalit, token va maxfiy qiymatlarni kodga, commit'ga yoki chatga YOZMANG. Ular Render'da (Environment) turadi.
- O'zgarishlarni alohida branch'ga yozing, `main` ga foydalanuvchi tasdiqlagach qo'shiladi. `main` ga push avtomatik deploy qiladi.
- Foydalanuvchi texnik mutaxassis emas: qisqa, aniq tushuntiring va deploy qadamlarini ayting.

## Tariflar (uch joyda BIR XIL bo'lishi shart: bot.py TARIFFS, backend db.js PLAN_INFO, ilova index.html PLANS)

| Tarif | Narx (so'm) | Muddat |
|---|---|---|
| monthly_basic (Standard 1 oylik) | 119 000 | 30 kun |
| quarterly_basic (Standard 3 oylik) | 259 000 | 90 kun |
| monthly_premium (Premium 1 oylik) | 179 000 | 30 kun |
| quarterly_premium (Premium 3 oylik) | 359 000 | 90 kun |

- Standard: ilova + kurs va mashq videolari kanallari. Premium: Standard + yopiq guruh (doktor bilan birga yopiq darslar va maslahatlar).
- Yopiq guruhga FAQAT Premium bilan kiriladi. Eski alohida 100 000 so'mlik guruh to'lovi yo'q (Premium ichiga kirgan).
- Standard → Premium o'tish: Premium narxining TO'LIQ farqi (179 000 − 119 000 = 60 000); Premium muddati to'lov sanasidan boshlanadi.

## Tizim tuzilishi
- **Ilova** (PWA/TWA): `doctorasqarbek-rgb.github.io` repo, `orom-app/index.html`; manzil app.oromlife.uz/orom-app/. GitHub Pages.
- **Backend**: `orom-backend` repo (Node + SQLite), Render: https://orom-backend.onrender.com. Payme (Merchant API) va Click (SHOP-API) shu yerda; obuna holati va muddat shu yerda.
- **Bot**: `telegram-bot` repo (Python), Render, @Doktor_Ergashev_bot. Bot backendga `x-admin-secret` bilan `/api/admin/*` orqali murojaat qiladi.
- To'lov usullari: Payme, Click (avtomatik faollashadi), QR-kod Paynet/Xolis (chek + admin tasdig'i); QR bo'lmasa karta raqami zaxira.
- Google Play / App Store versiyasida ilova ichidan tashqi to'lovga yo'naltirish do'kon siyosatiga zid bo'lishi mumkin — avval tekshiring (Play rejimi: `?play=1`, to'lov tugmalari yashirin).

## Deploy
`main` ga qo'shilgach GitHub Pages bir necha daqiqada yangilaydi; foydalanuvchida ilova o'zi yangilanadi (`APP_VERSION` o'zgargan bo'lsa).
