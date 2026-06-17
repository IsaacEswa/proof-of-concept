# Project Q42 x Teylers Museum

## Wie is Q42
Q42 is een Nederlandse digital product studio uit Amsterdam en Rotterdam. Ze ontwerpen en ontwikkelen websites, apps, interactieve ervaringen, AI-oplossingen en digitale platforms voor organisaties. Hun specialiteit ligt in het bouwen van gebruiksvriendelijke digitale producten met een sterke technische basis.

## Klantvraag
Ontwikkel een interactieve en data-driven detailpagina voor de Grote Elektriseermachine met Leidse Flessen van Teylers Museum, met als doel het verhaal achter het object op een **toegankelijke** en **speelse** manier over te brengen aan basisschoolkinderen via een **interactieve tijdlijn** en **gekoppelde quiz**. De oplossing moet **schaalbaar** en **herbruikbaar** zijn voor toekomstige museumobjecten binnen een digitaal museumplatform.

Bekijk [hier](https://proof-of-concept-vdfp.onrender.com) mijn live website

# Inhoudsopgave

# Gebruik
## Tijdlijn
De tijdlijncomponent laadt content dynamisch in vanuit een database (Directus), waardoor deze eenvoudig kan worden hergebruikt voor andere museumobjecten en musea. De tijdlijn bestaat uit tijdlijn items die automatisch op chronologische volgorde worden weergegeven.

Elk tijdlijnitem bevat een uitklapbaar `details`-element met aanvullende informatie. Wanneer een gebruiker dit opent, wordt de extra content zichtbaar met een vloeiende animatie. Tegelijkertijd animeert het bijbehorende icoon om visuele feedback te geven over de geopende of gesloten status van het item.

### Performance & Progressive Enhancement
De tijdlijncomponent is opgezet met **performance** en **schaalbaarheid** als uitgangspunt. Content wordt server-side gerenderd vanuit Directus, waardoor de basis direct toegankelijk is zonder JavaScript.
Afbeeldingen worden ingeladen met het `picture`-element, wat zorgt voor kleinere bestanden en snellere laadtijden.
https://github.com/IsaacEswa/proof-of-concept/blob/1ef41dd59e610682c28fa3e535e03cd446e9dd7b/views/partials/timeline-component.liquid#L31-L45

### Functionaliteiten
* Dynamisch geladen content
* Herbruikbaar voor verschillende museumobjecten
* Automatische chronologische sortering
* Uitklapbare detailinformatie per tijdlijn item
* Geanimeerde open- en sluitinteractie
* Visuele feedback via een animerend icoon
* Geschikt voor zowel desktop als mobiel gebruik

### Responsive preview
https://github.com/user-attachments/assets/a171e74a-b621-4566-b493-c010b53ce56f

[Bekijk issue](https://github.com/IsaacEswa/proof-of-concept/issues/4)

## Quiz
De quizcomponent laadt vragen dynamisch in vanuit Directus en is gekoppeld aan de tijdlijn. Hierdoor kunnen vragen eenvoudig worden aangepast of hergebruikt voor andere museumobjecten.
De quiz begeleidt gebruikers stap voor stap door de vragen. Na het beantwoorden ontvangt de gebruiker feedback met een uitleg waarom het antwoord goed of fout is. Daarnaast wordt een link aangeboden naar het bijbehorende tijdlijnitem, zodat gebruikers meer context kunnen ontdekken.

Tijdens het beantwoorden van de quiz wordt gebruikgemaakt van een **stacked cards-animatie**. Wanneer een gebruiker op Controleren klikt of doorgaat naar de volgende vraag, schuift de huidige kaart weg en verschijnt de volgende kaart vanuit de stapel. Dit zorgt voor een speelse en vloeiende gebruikerservaring.

### Performance & Progressive Enhancement
De quizcomponent is opgezet met performance en toegankelijkheid als uitgangspunt. De formulieren worden server-side verwerkt, waardoor de volledige quiz functioneert zonder JavaScript. Hierdoor blijft de ervaring betrouwbaar en toegankelijk op alle apparaten.

### Functionaliteiten
* Dynamisch geladen quizvragen
* Gekoppeld aan tijdlijnitems
* Directe feedback op antwoorden
* Uitleg bij correcte en incorrecte antwoorden
* Link naar gerelateerde tijdlijnitems
* Stacked cards-animatie tussen quizstappen
* Eindscore na afronding van de quiz
* Herbruikbaar voor verschillende museumobjecten
* Geschikt voor zowel desktop als mobiel gebruik
* Werkt zonder JavaScript dankzij server-side verwerking van formulieren

### Quiz preview
https://github.com/user-attachments/assets/fe9bcff2-af62-40ca-9cde-5e4b2b2f0406

### Ontwerpkeuzes
Een eerdere versie van de quiz maakte gebruik van volledig interactieve kaarten die gebruikers moesten oppakken en slepen om naar de volgende vraag te gaan. Hoewel dit speels was, bleek het minder gebruiksvriendelijk omdat de interactie niet direct duidelijk was en extra handelingen vereiste.

Daarom is gekozen voor een meer toegankelijke oplossing waarbij gebruikers antwoorden controleren met een knop. De stacked cards-animatie is behouden als visuele feedback, waardoor de speelse ervaring blijft bestaan zonder de gebruiksvriendelijkheid te verminderen.

Deze aanpak volgt het principe van Progressive Enhancement. Zonder client-side JavaScript worden alle vragen onder elkaar weergegeven en blijft de quiz volledig bruikbaar. Wanneer JavaScript beschikbaar is, worden de vragen gepresenteerd als een stapel kaarten met extra animaties en interacties. Hierdoor krijgt iedere gebruiker toegang tot de inhoud, terwijl moderne browsers een rijkere ervaring ontvangen.

* Bekijk [issue](https://github.com/IsaacEswa/proof-of-concept/issues/14)
* Bekijk [branche](https://github.com/IsaacEswa/proof-of-concept/tree/14-backup-draggable-pe-quiz-cards)

# (Technische) kenmerken
## HTML
* Gebruik van semantische HTML zoals `headings`, `article`, `form`, `fieldset`, `legend`, `details` en `time`.
* Keyboard support geïntegreerd (o.a. Enter-to-continue in quiz)
* Gebruik van server-side state handling met [`if` & `else`](https://github.com/IsaacEswa/proof-of-concept/blob/main/views/partials/quiz-component.liquid#L4) logica om verschillende states te tonen (zoals vraag, feedback en score in de quiz).

## CSS
* **Mobile-first** responsive design, uitgebreid met media queries voor grotere schermen.
* Gebruik van **CSS nesting** voor duidelijke component-structuur.
* Opgezet volgens **DRY-principe** met herbruikbare classes en [CSS variables](https://github.com/IsaacEswa/proof-of-concept/blob/main/public/styles/styleguide.css).
* Moderne CSS features zoals :[`has()`](https://github.com/IsaacEswa/proof-of-concept/blob/3f8b17acf8e2acf68b1ca2cc064d4b34ad1eb03b/public/styles/quiz.css#L76-L78), [`:focus-visible`](https://github.com/IsaacEswa/proof-of-concept/blob/3f8b17acf8e2acf68b1ca2cc064d4b34ad1eb03b/public/styles/quiz.css#L89-L92) en [`:user-invalid`](https://github.com/IsaacEswa/proof-of-concept/blob/3f8b17acf8e2acf68b1ca2cc064d4b34ad1eb03b/public/styles/quiz.css#L76-L78).
* Animaties volledig [CSS-driven](https://github.com/IsaacEswa/proof-of-concept/blob/3f8b17acf8e2acf68b1ca2cc064d4b34ad1eb03b/public/styles/quiz.css#L187-L219) (keyframes + scroll-driven animations via animation-timeline: view()).

## JavaScript
* JavaScript uitsluitend als enhancement layer (niet noodzakelijk voor core functionaliteit).
* Asynchrone interacties via fetch() zonder volledige page reloads.
* DOM-updates via DOMParser en component swapping i.p.v. full refresh.
* View Transitions API voor vloeiende state-overgangen tussen quiz-states.
* Pointer Events API voor drag-interacties in stacked cards quiz.


# Installatie
Om het project lokaal te gebruiken heb je Node.js nodig. Daarna kun je het project openen in een code-editor.

1. Installeer de benodigde pakketten:
   ```bash
   npm install
2. Start de server:
   ```bash
   npm start
3. Bekijk het project in je browser via:
   ```bash
   http://localhost:8000

# Licentie
This project is licensed under the terms of the [MIT license](./LICENSE).
