UI-Review: Tabletop online
22. Nov. 2021

von Professor Georg Freitag

* Repo
   * Readme
      * 3. Freunde einladen → Wäre es nicht lieber sinnvoller den Link zu kopieren (oder beides anzubieten)?
      ```
      Das ist ein guter Einwand. Es ist sinnvoll beides zu ermöglichen.

      Implementationsidee:
      * URL, mit der sich die Vue App öffnet, enthält ein Attribut, mit der aktuellen Raum-ID
      * Wollen andere Spieler diesem Raum beitreten, kann man ihnen entweder nur die Raum-ID über genanntes Dialogfenster schicken, oder einfach die gesamte URL kopieren
      * Wenn andere Spieler diese URL aufrufen, weiß die Vue App, dass sie sich zu diesem Raum verbinden soll
      ```
      * 4. Spielregeln bereitstellen für die, die sich keine Regeln ausdenken können oder wollen
      ```
      Spielregeln bereistellen wollen wir nicht. Stattdessen werden wir eine Kommentar/Textfeldfunktion für gespeicherte Räume/Presets einführen. Darin können die Spielregeln vermerkt oder verlinkt werden. Den Kommentar sieht man bei der Vorauswahl der Presets und kann ihn beim Abspeichern des Raums bearbeiten.
      ```
      *  5. Ich kann meine Mitspieler in eine zip-datei packen und diese dann zuhause entpacken und weiter spielen? ;)
      ```
      Ja, so ist es.
      ```
   * Docs/Component Structure
      * Finden wir gut, dass es bereits eine Struktur in dem Ausmaß gibt
      * Jedoch fehlt uns persönlich eine Grafische Repräsentation, welche komponente sein könnte
      ```
      ?
      ```
   * Docs/billige_skizze
      * Finde ich gut, da hier erkenntlich ist, wie das ganze angefangen hat
   * FeatureList
      * Objekte (z.B. Spielbrett) fixieren, damit sie nicht unbeabsichtigt verschoben werden
      * HUD
         * Normale Ansicht ähnelt der Detaillierten
         * Welche zusätzlichen Informationen sind in der detaillierten Ansicht zu finden?
         ```
         In der detaillierten Ansicht der Hand sind alle Spielobjekte, die auf der Hand liegen in einer Liste angeordnet. Das ist sinnvoll, für den Fall, wenn man sehr viele Spielobjekte auf der Hand hat und diese nicht alle auf einmal angezeigt werden können.

         TODO: Mockup erstellen für detailierte Ansicht der Hand
         ```
         * Können Karten und Objekte auch vergrößert angezeigt werden
         ```
         Die Größe von Objekten selbst darf nicht verändert werden. Wenn man die Spielobjekte größer darstellen will, kann man den Spieltisch heranzoomen.
         ```
      * Verbindungsverlust
         * Bei wem wird das Spiel eingefroren? Nur beim Client oder auch den anderen? Was passiert wenn der Host einen Verbindungsverlust hat?
         ```
         Es gibt keinen Host, da wir Peer-To-Peer nutzen. Wenn ein Spieler die Verbindung zum Spiel verliert, wird nur sein Spiel eingefroren. Die anderen Spieler können weiterspielen. Sobald der Spieler die Verbindung wiederhergestellt hat, synchronisiert er sich mit den anderen.
         ```
      * Räume
         * Können von Spielern eröffnet und andere eingeladen werden
         * Wozu muss jeder einen eigenen Raum besitzen, wenn er alternativ bei Bedarf einen öffnen kann?
         ```
         Spieler können bei Bedarf einen eigenen Raum öffnen.
         ```
      * Views
         * Raum erstellen, beitreten, importieren kann zu einer View zusammengefasst werden
         ```
         So ist es gedacht.
         ```
         * Im Raum ist Main View
         * Impressum und Handbuch kann vernachlässigt werden (was steht überhaupt im Handbuch, wenn es doch keine Regeln für die Spiele gibt ;) )
         ```
         Im Handbuch steht, wie man den Tabletop Simulator bedient. Hier stehen keine Spielregeln.
         ```
      * Interaktionen:
         * Sehr schön detailliert die gewünschten Interaktionen erfasst


Generell: 
Peer to peer → Ist das Zeitgemäß? Wenn es im Browser ist könnte man mit einem einfachen Backend server ggf. Via Websocket das ganze abbilden (und sogar etwas persistenter halten)
```
Peer-To-Peer ist zeitgemäß (siehe WebRTC (Discord)).

Ein Backend Server hat den Nachteil, dass man davon abhängig ist, dass er Kosten verursacht und geschützt werden muss. Ein weiterer Nachteil wäre, dass der Server skalierbar sein müsste, um mehrere Spielsessions zu hosten.
```


Figma
* Speichern → Exportieren, passt dann besser zu Importieren 
*   * Nutzen von Logbuch unklar; scheint aber wichtig zu sein, da es das Log selbst in der mobilen Ansicht dominant angezeigt wird
```
Im Logbuch steht, wenn jemand dem Spiel beitritt, es verlässt oder Spielobjekte erstellt bzw. entfernt. Dadurch können alle Spieler nachvollziehen, ob die festgelegten Spielregeln eingehalten werden oder ein Spieler sich eventuell Spielobjekte "ercheatet".

Beim Smartphone werden alle Menüelemente (auch das Logbuch) ausgeblendet, sobald der Spieler mit der Spielfläche interagiert.
```
* Drehen von achsensymmetrischen Objekten ggf. Nicht sinnvoll
```
Es gibt einen Unterschied zwischen "Spielobjekt umdrehen" und "Spielobjekt rotieren". Umgedreht werden können in der Regel nur Spielkarten. Rotieren bedeutet, das Spielobjekt nach links oder rechts zu drehen.
```
*   * Was macht das +? Gibt es dazu noch Informationen/Mockups dazu?
```
Das "+" öffnet den Spielobjekt-Katalog, um neue Spielobjekte zu spawnen.

TODO: Mockup für geöffneten Spielobjekt-Katalog
```