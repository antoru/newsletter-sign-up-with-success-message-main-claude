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

## Decisioni prese finora

- No LESS + 7-1: troppo overhead per un progetto di questa dimensione.
- Tailwind con setup CLI reale (no CDN "play"), per imparare il flusso corretto.

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

## Promemoria vari

- Per vedere la pagina nel browser: `open index.html`, oppure un server locale (Live Server in VS Code, o `python3 -m http.server`) — consigliato appena entra in gioco JavaScript.
- **Esc** interrompe subito una risposta di Claude in corso (utile se parte un invio accidentale a metà messaggio).
