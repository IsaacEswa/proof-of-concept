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


# Licentie
This project is licensed under the terms of the [MIT license](./LICENSE).
