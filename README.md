# 🇧🇩 BD Courier Tracker

বাংলাদেশের সব কুরিয়ার এক জায়গায় ট্র্যাক করুন।

---

## 🚀 Deploy করার নিয়ম (Vercel — সম্পূর্ণ বিনামূল্যে)

### ধাপ ১ — Node.js ইনস্টল করুন
https://nodejs.org থেকে Node.js ডাউনলোড করুন।

### ধাপ ২ — Project চালু করুন
```bash
cd bd-courier-tracker
npm install
npm run dev
```
Browser-এ যান: http://localhost:3000

### ধাপ ৩ — GitHub-এ upload করুন
1. https://github.com এ account খুলুন
2. New Repository তৈরি করুন
3. এই সব file upload করুন

### ধাপ ৪ — Vercel-এ deploy করুন
1. https://vercel.com এ GitHub দিয়ে login করুন
2. "Import Project" → আপনার GitHub repo বেছে নিন
3. "Deploy" চাপুন — ৫ মিনিটে live হয়ে যাবে!
4. একটা free domain পাবেন: `yoursite.vercel.app`

---

## 💰 Google AdSense দিয়ে Income করার নিয়ম

### ধাপ ১ — Custom Domain কিনুন
- Namecheap বা GoDaddy থেকে `.com.bd` বা `.com` domain কিনুন
- দাম: বছরে ৳৮০০-১৫০০
- Vercel-এ custom domain connect করুন

### ধাপ ২ — AdSense Apply করুন
1. https://adsense.google.com এ যান
2. আপনার website URL দিন
3. Google review করবে (৩-১৪ দিন লাগতে পারে)
4. Approve হলে **Publisher ID** পাবেন (ca-pub-XXXXXXXX)

### ধাপ ৩ — AdSense ID বসান
`pages/_app.js` ফাইলে:
```js
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-আপনার_ID"
```

`components/AdBanner.js` ফাইলে:
```js
data-ad-client="ca-pub-আপনার_ID"
```

### ধাপ ৪ — Ad Unit তৈরি করুন
AdSense dashboard থেকে:
1. "Ads" → "By ad unit" → "Display ads"
2. নাম দিন (যেমন: "Top Banner", "Middle Ad")
3. **Ad Slot ID** কপি করুন (10 সংখ্যার নম্বর)
4. `pages/index.js`-এ AdBanner-এর `adSlot` prop-এ বসান

```jsx
<AdBanner adSlot="1234567890" adFormat="auto" fullWidth />
```

---

## 📈 Traffic বাড়ানোর টিপস (বেশি income এর জন্য)

- Facebook page খুলুন "BD Courier Tracker" নামে
- প্রতিদিন courier-সংক্রান্ত পোস্ট করুন
- YouTube Shorts বানান — "কিভাবে Pathao parcel track করবেন"
- SEO: Google Search Console-এ register করুন

---

## 🔧 Real API Integration (ভবিষ্যতে)

| কুরিয়ার | API আছে? |
|---|---|
| Steadfast | ✅ হ্যাঁ — https://steadfast.com.bd/developers |
| RedX | ✅ হ্যাঁ |
| Paperfly | ✅ হ্যাঁ |
| Pathao | ⚠️ পার্টনার হলে |
| Sundarban | ❌ নেই (website scraping লাগবে) |

---

## 📁 ফাইলের বিবরণ

```
bd-courier-tracker/
├── pages/
│   ├── _app.js        ← AdSense script এখানে
│   ├── _document.js   ← SEO meta tags
│   └── index.js       ← মূল tracking page
├── components/
│   └── AdBanner.js    ← Reusable ad component
├── styles/
│   └── globals.css    ← সব CSS
├── package.json
└── next.config.js
```
