# DevLog

## Erläuterung
Das DevLog enthält alle Entscheidungen und Fortschritte des Projekts, um die Projektentwicklung im Nachhinein besser nachvollziehen zu können. Alle Meetingprotokolle mit relevanten Inhalten sind hierzu nachfolgend aufgeführt.

## Protokolle

### 11.11.2021
In einem gemeinsamen Brainstorming haben wir stichpunktartig eine initiale FeatureList ausgearbeitet. Dabei haben wir zwischen spielinternen Features und Features der Spiel-/Appumgebung unterschieden.

Besonders wichtig war uns eine intuitive Bedienbarkeit des Spiels auf verschiedenen Gerätetypen (Desktop-PC, Tablet, Smartphone). Wir haben uns mit verschiedenen Möglichkeiten der Nutzerinteraktion je Gerätetyp auseinandergesetzt und festgehalten.

Wir haben die Strategie der "Conventional Commits" eingeführt, die es ermöglicht, Commits in der Versionshistorie zu kategorisieren und einfach verständliche, gut zusammengefasste Commitnachrichten zu verfassen. Der Versionsverlauf lässt sich so deutlich einfacher nachvollziehen.

Es wurde ein erstes Mockup für den Desktop-PC mit dem Online-Tool "Figma" erstellt.

### 15.11.2021
Wir haben das Mockup verfeinert und ein weiteres Mockup für die Desktop-Ansicht erstellt.

### 17.11.2021
Wir haben weitere Mockups für die Smartphone-Ansicht erstellt und die bestehenden Mockups fertiggestellt.

### 19.11.2021 - Ideen-Review
Um eine Priorität in der FeatureList einzuführen, haben wir Muss- und Kann-Kriterien eingeführt. Muss-Kriterien sollten zuerst abgearbeitet werden und sind in der FeatureList fett markiert.

In einer initialen Vue App haben wir eine grundlegende Struktur unserer Vue-Komponenten festgelegt. Dazu wurde ein Verzeichnisbaum erstellt, um die unterschiedlichen Vue-Komponenten einordnen zu können.

Wir haben außerdem eine erste README für das GitHub-Projekt verfasst.

### 26.11.2021
Damit das Spiel später gut ankommt sind qualitativ hochwertige Assets (Bilder für Karten, Spielfiguren und Spielbretter) von großer Bedeutung. Wir haben recherchiert, ob und wo es freie Assets gibt, die wir in unserer App nutzen können. Die Suche war nicht sehr erfolgreich. Wir haben uns zunächst darauf geeinigt einige wenige Assets selbst zu gestalten.

Wir haben die Nutzerinteraktionen für die verschiedenen Gerätetypen in der FeatureList angepasst, da einige Gesten noch zu Nutzungsfehlern geführt hätten.

### 03.12.2021
Julian hat das Projekt mit "vite" neu aufgesetzt, anstatt mit "vue-cli". [Vorteile von vite hier einfügen]. Er hat den restlichen Teammitgliedern außerdem einen Vue3/JS/TS-Crashkurs gegeben, um den Wissensstand zum Umgang mit Vue auf den aktuellen Stand zu bringen.

Im Anschluss haben wir einen ersten Prototyp einer lokal verschiebbaren Karte erstellt.

### 10.12.2021
Als nächsten Schritt wollten wir die Karte für alle Teilnehmer der App über WebRTC synchronisieren. Der Implementationsaufwand schien jedoch größer als gedacht. Daher haben wir uns zunächst einfache Demos zu WebRTC herausgesucht, um die Funktionsweise zu verstehen und zu testen. Dabei hat sich herausgestellt, dass die Synchronisierung über WebRTC stark davon abhängig ist, in welchem Netzwerk sich die Nutzer befinden (LTE, Festanschluss) und unter welchem Browser die App aufgerufen wird.

Beispielsweise hat die Demo mit LTE-Verbindung nicht funktioniert und der Safari-Browser scheint WebRTC auch nicht voll zu unterstützen.

Daher mussten wir feststellen, dass WebRTC nicht geeignet ist für unseren Anwendungsfall, den Spielstand zwischen Spielern zu synchronisieren. Als Alternative haben wir beschlossen, ein klassisches Server-Client-Modell mit WebSockets zu implementieren.

### 11.12.2021
Mittels Socket.io konnten wir sehr komfortabel ein einfaches Server-Backend und Client-Frontend aufbauen. Erste einfache Synchronisationsversuche zwischen mehreren Clients über den Server waren erfolgreich.

Im Anschluss haben wir nun versucht, die Position der erstellten Spielkarte zu synchronisieren. Das war nur zum Teil erfolgreich. Beim Synchronisieren der Position kam es manchmal zum "Glitchen" der Karte und die exklusive Nutzung der Karte an nur einen Spieler zu einer Zeit konnte noch nicht zufriedenstellend umgesetzt werden.

Ein weiteres Problem war, dass die übermittelte Position der Karte als Absolutwert in Pixeln übergeben wurde. Aufgrund unterschiedlicher Bildschirmgrößen der Teammitglieder hat das u.a. dazu geführt, dass die Karte für den einen am rechten Bildschirmrand zu sehen und zu verschieben war, während sie für den anderen einfach am rechten Bildschirmrand "herausfällt".

### 17.12.2021
Um das Problem der korrekten Positionierung der Karte zu lösen, wurden Spielfeld und Karte so umgestaltet, dass nun alle Positionsangaben prozentual angegeben werden. Das sichtbare Spielfeld passt sich nun der Bildschirmgröße der Nutzer an und die Karte kann von allen Spielern gleichermaßen gesehen und bewegt werden.

Für eine effizientere Synchronisation der Spielobjekte haben wir uns für die Nutzung von "ShareDB", einer geteilten Datenbank, entschieden

### 18.12.2021
Eine erste Implementation von ShareDB war erfolgreich. Die Karte kann jetzt ohne "Glitches" und Nutzungsprobleme einwandfrei auf dem Spielfeld bewegt werden. Jede Änderung wird dabei sofort synchronisiert.

Da ShareDB bereits eine eigene WebSocket-Implementation mitbringt, haben wir die Socket.io-Schnittstelle erst einmal deaktiviert. Für spätere Synchronisationsprobleme außerhalb der ShareDB-Datenbank bleibt Socket.io aber weiterhin relevant.

### 28.12.2021
Als nächsten Schritt wollten wir nun die eine statisch generierte Karte auf dem Spielfeld in eine dynamisch erstellbare Karte umwandeln. Dafür mussten wir erstmal viel Restrukturieren, was den Informationsaustausch zwischen Karte, Spielfeld und dem globalen Store angeht. Bis jetzt haben wir nur die Umgebung der Karte für eine dynamische Handhabung vorbereitet.

### 30.12.2021
Wir haben weiter an der Umsetzung der dynamisch generierten Karte gearbeitet. Diese lässt sich nun lokal erstellen und synchronisiert sich mit dem globalen Store der Vue App. Zur vollständigen Synchronisation fehlt nun nur noch die Einbindung von ShareDB an die Karte und den Store.

Anhand unseres derzeitigen Fortschritts haben wir das Projektziel neu bewertet, um unsere Prioritäten in der Abarbeitung der Aufgaben besser organisieren zu können. Zur Präsentation des Projekts wollen wir ein funktionierendes Spiel vorführen. Wir haben uns entschieden, dass sich dafür am besten "Mensch ärgere dich nicht!" eignet. Bei diesem Spiel gibt es, außer beim Würfel, kaum weitere Logik zu den Spielobjekten zu implementieren. Die Idee ist, unseren Karten-Prototyp zu nutzen, um damit die Basis für das Verhalten von Spielbrett und Spielfiguren zu schaffen.

### 04.01.2022
Um die Kommunikationswege für die Synchronisation besser nachvollziehen zu können, haben wir ein entsprechendes Kommunikationsdiagramm erstellt.

Für die vollständige Synchronisation von Spielobjekten zwischen allen Clients fehlt uns noch die Schnittstelle zwischen ShareDB und dem lokalen Store. Da sich ShareDB generell schon etwas umständlich benutzen lässt, haben wir entschlossen, die zu synchronisierenden Daten mit einer anderen Library zu verwalten. Dazu sah "Automerge" vielversprechend aus. Leider ist auch der Ansatz mit Automerge nicht sehr intuitiv. Deshalb überlegen wir, doch weiter bei ShareDB zu bleiben und den Mehraufwand zu investieren.

### 05.01.2022
Wir haben die Schnittstelle zwischen ShareDB und dem lokalen Store hergestellt. Allerdings gibt es trotzdem noch ein Synchronisierungsproblem. Die richtigen Koordinaten der Karte werden zwar von allen Clients empfangen, aber der Store aktualisiert sich nicht schnell genug. Dadurch hat die Karte für die anderen Spieler eine veraltete Position, obwohl die aktuelle Position bei allen angekommen ist. Wir werden jetzt prüfen, ob und wie wir das Problem lösen bzw. umgehen können.

### 14.01.2022
Um besser voranzukommen, haben wir die verbleibenden Aufgaben untereinander aufgeteilt. Julian arbeitet weiter an der Synchronisation des Spiels, während Raphael und Lenny das User Interface gestalten. Zunächst wird dabei an der ausklappbaren Sidebar gearbeitet. Wir haben alle noch fehlende Features in einer TODO-Liste festgehalten, die wir bis zur Abgabe abgearbeitet haben wollen.

### 18.01.2022
Das User Interface unabhängig vom Spielfeld ist vom Layout her umgesetzt. Der nächste Schritt ist das Einbinden von Funktionalität ins UI.