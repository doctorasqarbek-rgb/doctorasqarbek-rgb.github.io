// sw.js — Orom ilovasining Service Worker fayli.
// Bu fayl brauzer tomonidan alohida, fon rejimida ishga tushiriladi —
// hattoki ilova (sahifa) yopiq bo'lganda ham push xabarlarini qabul qiladi
// va OS bildirishnoma paneliga (Android/iOS) chiqaradi.

// Ilova joylashgan manzil (masalan https://doctorasqarbek-rgb.github.io/orom-app/)
const SCOPE = self.registration.scope;

// Bildirishnomadagi katta rasm: ilovaning haqiqiy PNG ikonkasi (orom-app papkasidagi icon-192.png).
// DIQQAT: Android/Chrome bildirishnomada SVG rasmni ko'rsatmaydi (faqat PNG/JPEG) — shuning uchun oldingi SVG ishlamagan edi.
const ICON_URL = new URL("icon-192.png", SCOPE).href;

// Status panelidagi kichik belgi: oq halqa "O", shaffof fonda (PNG). Android faqat shaffoflik kanalini ishlatadi.
// Fayl yuklash shart emas — rasm shu yerda ichiga joylangan.
const BADGE = "data:image/png;base64,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";

// Backend "/" yuborsa — bu ilovaning bosh sahifasi (github.io ildizi emas!).
// XAVFSIZLIK: faqat shu domen ichidagi havolalarga ruxsat; begona domen yoki "javascript:" kabi manzillar bosh sahifaga almashtiriladi.
function resolveUrl(u) {
  try {
    if (!u || u === "/") return SCOPE;
    const x = new URL(u, SCOPE);
    if (x.origin !== new URL(SCOPE).origin) return SCOPE;
    return x.href;
  } catch (e) {
    return SCOPE;
  }
}

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Backend "web-push" orqali yuborgan xabar shu yerda qabul qilinadi
self.addEventListener("push", (event) => {
  let data = { title: "Orom", body: "Yangi bildirishnoma", url: "/" };
  try {
    if (event.data) data = Object.assign(data, event.data.json());
  } catch (e) {
    // JSON bo'lmasa, matn sifatida olamiz
    if (event.data) data.body = event.data.text();
  }

  const options = {
    body: data.body,
    icon: ICON_URL,
    badge: BADGE,
    data: { url: resolveUrl(data.url) },
    vibrate: [100, 50, 100],
  };
  // bir xil tag — eski eslatma yangisi bilan almashadi (panelda to'planib qolmaydi); renotify — yangisi baribir ovoz/tebranish bilan keladi
  if (data.tag) { options.tag = data.tag; options.renotify = true; }

  event.waitUntil(self.registration.showNotification(data.title || "Orom", options));
});

// Foydalanuvchi bildirishnomani bosganda — ilovani ochadi
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = resolveUrl(event.notification.data && event.notification.data.url);
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      // Ilova allaqachon ochiq bo'lsa — o'sha oynaga o'tamiz va kerakli bo'limni ochishni so'raymiz (?go=tools, ?go=charex ...)
      for (const client of clientList) {
        if (client.url.startsWith(SCOPE) && "focus" in client) {
          try { client.postMessage({ type: "orom-go", url: targetUrl }); } catch (e) { /* jim o'tamiz */ }
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
    })
  );
});
