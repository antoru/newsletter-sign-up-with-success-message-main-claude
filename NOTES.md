# Note di sviluppo

Promemoria pratici per lavorare su questo progetto. Lo aggiorniamo man mano che procediamo.

## Comandi

- `npm run watch:css` — lancialo in un terminale separato mentre sviluppi: ricompila `assets/css/style.css` ogni volta che salvi una classe Tailwind nell'HTML.
- `npm run build:css` — build unica, minificata (usarla prima di commit/deploy finale, non durante lo sviluppo).

## Setup Tailwind (v4, via `@tailwindcss/cli`)

- Sorgente: `src/input.css` → output: `assets/css/style.css` (già collegato in `index.html`).
- Design token definiti in `src/input.css` dentro `@theme`, presi da `style-guide.md`:
  - `--color-primary-red` → classi come `bg-primary-red`, `text-primary-red`, `border-primary-red`
  - `--color-neutral-blue-800`, `--color-neutral-blue-700` → `bg-neutral-blue-800`, ecc.
  - `--color-neutral-grey`
  - `--font-sans` = Roboto → è già il default, quindi non serve nessuna classe `font-*` per usarlo
- Font Roboto caricato da file locali (`assets/fonts/Roboto-Regular.ttf` peso 400, `Roboto-Bold.ttf` peso 700) via `@font-face` — non serve Google Fonts.
- **Gotcha percorsi:** `@tailwindcss/cli` NON riscrive i percorsi relativi dentro `url(...)` in base alla posizione del file di output — li copia così come scritti in `src/input.css`. Quindi i percorsi vanno scritti relativi a dove finirà il file compilato (`assets/css/style.css`), non relativi a `src/`. Es: per puntare a `assets/fonts/...` da `assets/css/style.css` serve `../fonts/...`, non `../assets/fonts/...` (altrimenti 404 per `assets/assets/fonts/...`, bug reale trovato durante il check performance).

## Decisioni prese finora

- No LESS + 7-1: troppo overhead per un progetto di questa dimensione.
- Tailwind con setup CLI reale (no CDN "play"), per imparare il flusso corretto.
- Breakpoint: solo `md:` (768px, = design tablet Figma) e `lg:` (1024px, per il layout desktop) in tutto il markup — niente `sm:`/`xl:`, per restare coerenti e non creare "zone morte" tra un breakpoint e l'altro.

## Riferimento rapido classi Tailwind

| Serve | Classe |
|---|---|
| `height: 100vh` | `h-screen` |
| `width: 100%` | `w-full` |
| `display: grid` + `place-items: center` | `grid place-items-center` |
| width/height con valore preciso non in scala | `w-[500px]`, `h-[300px]` |
| `max-width` predefinito / preciso | `max-w-lg` ecc. / `max-w-[1440px]` |
| sfondo con colore custom da `@theme` | `bg-{nome-variabile}` (es. `--color-primary-red` → `bg-primary-red`) |
| `grid-template-columns: auto auto` | `grid-cols-[auto_auto]` (spazi → `_` dentro le `[...]`) |
| `padding: 16px 24px` (verticale/orizzontale) | `py-4 px-6` (scala: 1 = 4px, quindi px ÷ 4) |

Doc ufficiale: [tailwindcss.com/docs](https://tailwindcss.com/docs). Estensione consigliata in VS Code: **Tailwind CSS IntelliSense** (autocomplete + anteprima CSS generato, incluse le classi custom definite in `@theme`).

## Immagini responsive (`<picture>`)

- Breakpoint Tailwind v4 di default: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px.
- Per scambiare le 3 illustrazioni (`illustration-sign-up-mobile/tablet/desktop.svg`) si usa `<picture>` con `<source media="(min-width: ...)">`, non classi Tailwind — sono due sistemi diversi (uno sceglie il file da scaricare, l'altro lo stile).
- **Attenzione:** i valori `min-width` dentro `media="..."` e i prefissi `md:`/`lg:` di Tailwind **non si sincronizzano da soli**. Se cambi un breakpoint del layout (es. sposti `lg:grid-cols-2` a `md:`), ricordati di aggiornare a mano anche il `min-width` corrispondente nel `<picture>`.
- Ordine dei `<source>` importante: dal più specifico al più generico (desktop/`lg` prima, poi tablet/`md`) — il browser usa il primo `media` che risulta vero.

## Stato di errore (validazione email)

Decisione: niente classe custom `.error` — si usa il variant `aria-invalid:` di Tailwind, che risponde direttamente all'attributo HTML.

```html
<input class="border-neutral-grey aria-invalid:border-primary-red aria-invalid:text-primary-red" />
```

Il JS imposta/rimuove l'attributo (non tocca classi):
```js
input.setAttribute('aria-invalid', 'true')   // mostra stato errore
input.removeAttribute('aria-invalid')         // lo rimuove
```

Vantaggio: stile condizionale + accessibilità vera nello stesso attributo (screen reader annuncia il campo come non valido), invece di una classe che non ha significato per le tecnologie assistive.

## Performance

- Font Roboto convertiti da TTF a **WOFF2** (`npx ttf2woff2`): ~129KB → ~51KB per file, oltre 60% di riduzione. `@font-face` in `src/input.css` ora carica woff2 con fallback ttf (il browser scarica solo il formato che supporta, nessun costo doppio).
- **Prima della consegna finale**, ricordati di lanciare `npm run build:css` (non `watch:css`) così il CSS pubblicato è minificato, non la versione di sviluppo leggibile.

## SEO

- Aggiunte `<meta name="description">` e tag Open Graph/Twitter Card (riusano `preview.jpg` come immagine social) — utili per quando condividi il link (il progetto andrà nel portfolio).
- **Da fare dopo il deploy:** `og:image` e un eventuale `og:url` andrebbero aggiornati con URL assoluti (es. `https://tuo-sito.com/preview.jpg`) — alcuni crawler (es. Facebook) non risolvono bene i percorsi relativi. Per ora sono relativi perché non c'è ancora un dominio di deploy.
- Nessun `noindex`: pagina indicizzabile, come richiesto (uso da portfolio).

## Promemoria vari

- Per vedere la pagina nel browser: `open index.html`, oppure un server locale (Live Server in VS Code, o `python3 -m http.server`) — consigliato appena entra in gioco JavaScript.
- **Esc** interrompe subito una risposta di Claude in corso (utile se parte un invio accidentale a metà messaggio).
