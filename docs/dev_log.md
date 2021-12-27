# DevLog

## Erläuterung
Das DevLog enthält alle Entscheidungen und Fortschritte des Projekts, um die Projektentwicklung im Nachhinein besser nachvollziehen zu können. Alle Meetingprotokolle mit relevanten Inhalten sind hierzu nachfolgend aufgeführt.

## Protokolle

### 11.11.2021
In einem gemeinsamen Brainstorming haben wir stichpunktartig eine initiale FeatureList ausgearbeitet. Dabei haben wir zwischen spielinternen Features und Features der Spiel-/Appumgebung unterschieden.

Besonders wichtig war uns eine intuitive Bedienbarkeit des Spiels auf verschiedenen Gerätetypen (Desktop-PC, Tablet, Smartphone). Wir haben uns mit verschiedenen Möglichkeiten der Nutzerinteraktion je Gerättyp auseinandergesetzt und festgehalten.

Wir haben die Strategie der "Conventional Commits" eingeführt, die es ermöglicht, Commits in der Versionshistorie zu kategorisieren und einfach verständliche, gut zusammengefasste Commitnachrichten zu verfassen. Der Versionsverlauf lässt sich so deutlich einfacher nachvollziehen.

Es wurde ein erstes Mockup für den Desktop-PC mit dem Online-Tool "Figma" erstellt.

### 15.11.2021
Wir haben das Mockup verfeinert und ein weiteres Mockup für die Desktop-Ansicht erstellt.

### 17.11.2021
Wir haben weitere Mockups für die Smartphone-Ansicht erstellt und die bestehenden Mockups fertiggestellt.

### 19.11.2021 - Ideen-Review
Um eine Priorität in der FeatureList einzuführen, haben wir Muss- und Kann-Kriterien eingeführt. Muss-Kriterien sollten zuerst abgearbeitet werden und sind in der FeatureList fett markiert.

In einer initialen Vue App haben wir eine grundlegende Struktur unserer Vue-Komponenten festgelegt. Dazu haben wurde ein Verzeichnisbaum erstellt, um die unterschiedlichen Vue-Komponenten einordnen zu können.

Wir haben außerdem eine erste README für das GitHub-Projekt verfasst.

### 26.11.2021
Damit das Spiel später gut ankommt sind qualitativ hochwertige Assets (Bilder für Karten, Spielfiguren und Spielbretter) von großer Bedeutung. Wir haben recherchiert, ob und wo es freie Assets gibt, die wir in unserer App nutzen können. Die Suche war nicht sehr erfolgreich. Wir haben uns zunächst darauf geeinigt einige wenige Assets selbst zu gestalten.

Wir haben die Nutzerinteraktionen für die verschiedenen Gerätetypen in der FeatureList angepasst, da einige Gesten noch zu Nutzungsfehlern geführt hätten.

### 03.12.2021
Julian hat das Projekt mit "vite" neu aufgesetzt, anstatt mit "vue-cli". [Vorteile von vite hier einfügen]. Er hat den restlichen Teammitgliedern außerdem einen Vue3/JS/TS-Crashcourse gegeben, um den Wissensstand zum Umgang mit Vue auf den aktuellen Stand zu bringen.

Im Anschluss haben wir einen ersten Prototyp einer lokal verschiebbaren Karte erstellt.

### 10.12.2021
Als nächsten Schritt wollten wir die Karte für alle Teilnehmer der App über WebRTC synchronisieren. Der Implementationsaufwand schien jedoch größer als gedacht. Daher haben wir uns zunächst einfache Demos zu WebRTC herausgesucht, um die Funktionsweise zu verstehen und zu testen. Dabei hat sich herausgestellt, dass die Synchronisierung über WebRTC stark davon abhängig ist, in welchem Netzwerk sich die Nutzer befinden (LTE, Festanschluss) und unter welchem Browser die App aufgerufen wird.

Beispielsweise hat die Demo mit LTE-Verbindung nicht funktioniert und der Safari-Browser scheint WebRTC auch nicht voll zu unterstützen.

Daher mussten wir feststellen, dass WebRTC nicht geeignet ist für unseren Anwendungsfall, den Spielstand zwischen Spielern zu synchronsieren. Als Alternative haben wir beschlossen, ein klassisches Server-Client-Modell mit WebSockets zu implementieren.

### 11.12.2021
Mittels Socket.io konnten wir sehr komfortabel ein einfaches Server-Backend und Client-Frontend aufbauen. Erste einfache Synchronisationsversuche zwischen mehreren Clients über den Server waren erfolgreich.

Im Anschluss haben wir nun versucht, die Position der erstellten Spielkarte zu synchronisieren. Das war nur zum Teil erfolgreich. Beim Synchronisieren der Position kam es manchmal zum "Glitchen" der Karte und die exklusive Nutzung der Karte an nur einen Spieler zu einer Zeit konnte noch nicht zufriedenstellend umgesetzt werden.

Ein weiteres Problem war, dass die übermittelte Position der Karte als Absolutwert in Pixeln übergeben wurde. Aufgrund unterschiedlicher Bildschirmgrößen der Teammitglieder hat das u.a. dazu geführt, dass die Karte für den einen am rechten Bildschirmrand zu sehen und zu verschieben war, während sie für den anderen einfach am rechten Bildschirmrand "herausfällt".

### 17.12.2021
Um das Problem der korrekten Positionierung der Karte zu lösen, wurden Spielfeld und Karte so umgestaltet, dass nun alle Positionsangaben prozentual angegeben werden. Das sichtbare Spielfeld passt sich nun der Bildschirmgröße der Nutzer an und die Karte kann von allen Spielern gleichermaßen gesehen und bewegt werden.

Für eine effizientere Synchronisation der Spielobjekte haben wir uns für die Nutzung von "sharedb", einer geteilten Datenbank, entschieden

### 18.12.2021
Eine erste Implementation von sharedb war erfolgreich. Die Karte kann jetzt ohne "Glitches" und Nutzungsprobleme einwandfrei auf dem Spielfeld bewegt werden. Jede Änderung wird dabei sofort synchronisiert.

Da sharedb bereits eine eigene WebSocket-Implementation mitbringt, haben wir die Socket.io-Schnittstelle erst einmal deaktiviert. Für spätere Synchronisatsprobleme außerhalb der sharedb-Datenbank bleibt Socket.io aber weiterhin relevant.