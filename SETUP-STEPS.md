# Step da rifare da solo

Ogni volta che faccio qualcosa di infrastrutturale al posto tuo (setup di un tool, configurazione), lo documento qui passo per passo, con il "perché", così se in futuro ti serve rifarlo da solo su un altro progetto sai cosa fare.

---

## Setup di Tailwind CSS (v4) via CLI

**Perché questi passaggi:** Tailwind non è un file CSS che scarichi e basta — genera il CSS finale a partire dalle classi che usi nell'HTML, quindi serve un piccolo processo di build (Node + npm).

1. **Inizializzare `package.json`**
   ```
   npm init -y
   ```
   Serve perché è il file che elenca le dipendenze del progetto (cosa installare) e permette di definire script comodi (`npm run ...`).

2. **Installare Tailwind come dipendenza di sviluppo**
   ```
   npm install -D tailwindcss @tailwindcss/cli
   ```
   `-D` (devDependency) perché sono strumenti usati solo mentre sviluppi/compili, non librerie che il sito carica a runtime nel browser.

3. **Creare il file CSS "sorgente"** (es. `src/input.css`)
   ```css
   @import "tailwindcss";
   ```
   Questa riga importa le utility di base di Tailwind. Da qui in poi puoi usare le classi (`flex`, `p-4`, ecc.) nell'HTML.

4. **(Opzionale) Personalizzare i design token** con un blocco `@theme` nello stesso file:
   ```css
   @theme {
     --color-primary-red: hsl(4 100% 67%);
     --font-sans: "Roboto", sans-serif;
   }
   ```
   In Tailwind v4 la configurazione si fa in CSS (non più in un file `tailwind.config.js` come nella v3). Ogni variabile `--color-*` genera automaticamente classi come `bg-primary-red`, `text-primary-red`, ecc.

5. **(Opzionale) Font locali** con `@font-face` nello stesso file, se non vuoi dipendere da Google Fonts:
   ```css
   @font-face {
     font-family: "Roboto";
     src: url("../assets/fonts/Roboto-Regular.ttf") format("truetype");
     font-weight: 400;
   }
   ```

6. **Aggiungere gli script di build in `package.json`**
   ```json
   "scripts": {
     "build:css": "tailwindcss -i ./src/input.css -o ./assets/css/style.css --minify",
     "watch:css": "tailwindcss -i ./src/input.css -o ./assets/css/style.css --watch"
   }
   ```
   `-i` = file di input (sorgente), `-o` = file di output (quello che poi collega l'HTML). `--watch` ricompila automaticamente ad ogni salvataggio, utile solo durante lo sviluppo; `--minify` la usi per la build finale.

7. **Installare le dipendenze e generare il primo output**
   ```
   npm install
   npm run build:css
   ```

8. **Collegare il CSS generato nell'HTML**
   ```html
   <link rel="stylesheet" href="./assets/css/style.css">
   ```
   Nota: si collega sempre il file di **output** (`assets/css/style.css`), non il file sorgente (`src/input.css`) — il browser deve leggere il CSS già compilato da Tailwind.

9. **Durante lo sviluppo**, lancia `npm run watch:css` in un terminale separato così non devi rilanciare la build manualmente ogni volta.

---

<!-- I prossimi step infrastrutturali che faccio per te verranno aggiunti qui sotto -->
