# Nobody is perfect - a digital fan remake

## Developing

### tech stack

- **SvelteKit**
  - **Skeleton UI**, making use of **TailwindCSS**
- **Typescript**
- **SQLite**
- **pnpm**

### development server

Once you've cloned the project and installed dependencies with `pnpm install`, start a development server:

```bash
pnpm dev

# or start the server and open the app in a new browser tab
pnpm dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deployment

### docker compose

#### docker compose with sqlite

- clone this repository
- go to the `docker-compose` directory inside the cloned repository, e.g. `cd nip/docker-compose`
- create the necessary config files from the templates
  - `cp .env.template .env`
  - `cp docker-compose.webserver.env.template docker-compose.webserver.env`
- edit the config files
- create the data directory specified in `.env`, e.g. `mkdir -p $HOME/nip-data`
- create the schema for `sqlite` (you would need to have the `sqlite3` cli tools installed on your system)
  - e.g. `sqlite3 $HOME/nip-data/database.sqlite < ../sql/sqlite.sql`
- start **nip**
  - `docker compose up -d`

## The game (German)

### [Nobody is perfect](https://www.ravensburger.de/de-DE/pdp/26845) - Ein Spiel ab 14 Jahren, (offline) für 3-10 Spieler, von **Ravensburger**

> Wer weiß schon, was mit Servitut gemeint ist und was ein Mann, der mit Nachnamen Cohen heißt, in Israel nicht tun darf? Wer die glaubwürdigsten Antworten erfindet und damit seine Mitspieler überzeugt, gewinnt!

> Wahrheit oder Unsinn? Spinnt unglaubliche Geschichten glaubhaft weiter und erfindet die überzeugendsten Antworten auf verrückte Fragen.

> Nichts muss stimmen! Wichtig ist nur, dass ihr möglichst viele Mitspieler davon überzeugt, dass eure Antwort die einzig wahre ist.
> Wer überzeugt, punktet. Und wer zugleich auch noch auf die richtige Antwort tippt, punktet gleich noch einmal.
> Merkt euch also: Wer besser spinnt, gewinnt!

### Aus der [Spielanleitung](https://www.ravensburger.de/spieleanleitungen/ecm/Spielanleitungen/26845%20Anl%202051662.pdf)

> Jetzt ist eure Kreativität gefragt! Erfindet bei den blauen Karten („Kuriositäten“) möglichst kreative
> Antworten und versucht bei den rosa Karten („Begriffe“) eure erfundene Antwort so zu formulieren,
> als ob sie aus einem Lexikon oder Wörterbuch stammen würde. Je überzeugender eure Antwort
> ausfällt, umso mehr Mitspieler werden darauf hereinfallen.

> Wichtig: Wer ausnahmsweise die richtige Antwort kennt, schreibt natürlich trotzdem ein Lügenmärchen auf – und hofft, damit die Mitspieler aufs Glatteis zu führen.

### Disclaimer

Diese App orientiert sich am Spiel von Ravensburger und dem Autoren Bertram Kaes - allerdings nur am Regelwerk / Spielprinzip.
Fragen und Antworten sowie Bilder oder andere urheberrechtlich geschützte Werke aus dem Originalspiel sind nicht enthalten.

Das Spiel wird zwar online gehostet, aber nur einem geschlossenen Personenkreis zugänglich gemacht (nur per Einladung).

Sollte ich dennoch irgendwelchen Rechte verletzen, setzen sie sich bitte mit mir in Verbindung, bevor Sie rechtliche Schritte einleiten. Wir können den Sachverhalt bestimmt gütlich regeln.
