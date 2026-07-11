# Durga Chalisa Plus

Devotional teleprompter for **जय आद्या शक्ति**, **श्री दुर्गा चालीसा**, and **विश्वंभरी स्तुति** — with synchronized audio scroll, live verse highlight, search, and dark/light mode. Inspired by [Sundarkand Display](https://sundarkand-display.netlify.app/).

**Live:** https://durga-chalisa-plus.netlify.app  
**Author:** राजकुमार अरथुना — An effort by humble bhakt 🌺 🙏 सीताराम 🙏 🌺

---

## Audio File Layout

### `jay_adhyashakti_aarti.mp3` (combined — 21.47 MB)

| Time | Content | Segment in app |
|------|---------|----------------|
| `0:00` – `15:04` (0–904s) | Jay Adhyashakti Aarti | `hindi-aarti` tab |
| `15:04` – `16:36` (904–996s) | Karpura Gauram mantra | Opening of `vishwambhari` tab — **no scroll for first 90s** |
| `16:36` – end (996s–) | Vishwambhari Stuti | `vishwambhari` tab (scroll starts at 90s) |

### `durga_chalisa_original.mp3` (18.39 MB — ~18 min)

| Time | Content |
|------|---------|
| `0:00` – end | श्री दुर्गा चालीसा — 40 chaupais |

---

## Scroll Sync — How It Works

Each segment has a **weighted time-map** built from the verse data:

| Segment | `chaupaiWeight` | Reason |
|---------|----------------|--------|
| Durga Chalisa | `0.5` | Lines come in **pairs** (2 lines = 1 sung couplet ≈ 26s) |
| Jay Adhyashakti Aarti | `1.0` | Each line is independent |
| Vishwambhari Stuti | `1.0` | Each line is independent |

### Special cases
- `या देवी सर्वभूतेषु...` / `नमस्तस्यै...` — **not sung in audio**, marked as `header` type, shown in text but excluded from time-map
- `॥ दोहा ॥`, `॥ चौपाई ॥` — section labels, also `header`, excluded from scroll sync
- Vishwambhari: **`scrollDelaySec: 90`** — scroll held at top for first 1:30 (Karpura Gauram prayer)

### Verse types and weights
```
header  → weight 0.0  (shown, not scrolled to)
chaupai → weight 0.5 or 1.0  (per segment, see above)
doha    → weight 1.5  (refrains sung slower)
```

---

## Segment Configuration (`ChalisaReader.tsx`)

```ts
vishwambhari:  audioUrl = jay_adhyashakti_aarti.mp3,  startTime: 904,  scrollDelaySec: 90
hindi-aarti:   audioUrl = jay_adhyashakti_aarti.mp3,  startTime: 0,    endTime: 904
durga-chalisa: audioUrl = durga_chalisa_original.mp3, startTime: 0,    chaupaiWeight: 0.5
```

---

## Run & Build

```bash
# Dev (from repo root)
pnpm --filter @workspace/durga-chalisa run dev

# Production build (Netlify)
cd artifacts/durga-chalisa && pnpm run build:netlify
# Output: artifacts/durga-chalisa/dist/public
```

---

## Commit History (Key Changes)

| Commit | Date | Change |
|--------|------|--------|
| `720d0a0` | Jul 11, 2026 | Durga Chalisa scroll fix: `ya devi` as header, `chaupaiWeight=0.5` for paired lines |
| `a27554f` | Jul 11, 2026 | Vishwambhari: hold scroll 90s for Karpura Gauram prayer |
| `e635688` | Jul 11, 2026 | Landing page redesigned — Sundarkand Display color scheme + credits |
| `2ca557c` | Jul 11, 2026 | Sync scroll rewrite: segment-aware ratio, stable `offsetTop`, cached time-map |
| `dc05993` | Jul 11, 2026 | Correct Durga Chalisa lyrics from source `.txt`; fix aarti lyrics; restore `netlify.toml` |
| `5019303` | Jul 11, 2026 | Split combined audio into timed segments (Aarti 0–15:04, Vishwambhari 15:04–end) |
| `d90a5f0` | Jul 11, 2026 | Verse-aware synchronized scroll with live verse highlight |
| `a994e60` | Jul 10, 2026 | Add separate audio files per prayer segment with time display |
| `78be837` | Jul 10, 2026 | Initial commit |

---

## Stack

- React + Vite + TypeScript
- Tailwind CSS + shadcn/ui
- Wouter (routing)
- Tiro Devanagari Hindi (Google Fonts)
- Netlify (hosting)

## Credits

- Design language, side borders, credits card style: [Sundarkand Display](https://sundarkand-display.netlify.app/) by राजकुमार अरथुना
- Text: traditional Hindi/Gujarati devotional sources
- Audio: original recordings
