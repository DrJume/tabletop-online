# Feature List for Tabletop-Online

## Features

### Muss-Kriterien
- Spiel
  * Aufbau in Ebenen
    1. Spieltisch
    2. Gelegte Objekte
    3. HUD
  * Ansicht
    * Spieler betrachtet die Spielfläche in der Vogelperspektive
    * Spielobjekte sind isometrisch dargestellt (3D-Effekt)
  * Virtueller Spieltisch
    * Hintergrund kann beliebig verändert werden (Spielbretter, spezielle Karten, die als Hintergrund fixiert werden können)
    * Jeder Spieler kann seine Ansicht auf den Spieltisch beliebig drehen
  * Spielobjekte (Karten, Kartendeck, Figuren, Timer, ...)
    * können beliebig erstellt, verschoben, entfernt werden
    * befinden sich auf dem Spieltisch
    * alle Spieler können mit gelegten Spielobjekten interagieren (Karte umdrehen, Würfel würfeln)
  * HUD
    * Inventar der "eigenen Hand"
      * 2 Ansichten (Normal und Detailiert)
      * Normale Ansicht enthält nur begrenzte Anzahl von Objekten (wenn es Karten sind, als Halbkreis angeordnet)
      * Detailierte Ansicht enthält alle Spielobjekte der Hand als Liste
    * Position der anderen Spieler
- Spielumgebung
  * Responsive Design (PC, Tablet, Smartphone)  
    * Spielerlebnis auf jedes Gerät (PC, Smartphone, ...) indivuell angepasst (Unterschiedliche Gesten zwischen Maus und Finger bezüglich Spielobjekten, Menüs)
  * Synchronisation
    * In Echtzeit, peer-to-peer
    * Spieltisch und alle gelegten Spielobjekte werden synchronisiert
    * verliert ein Spieler die Verbindung, wird das Spiel für ihn eingefroren
  * Räume
    * Jeder Spieler hat initial einen leeren Raum
    * Spieler können andere Spieler in ihren Raum einladen
    * Spieler können anderen Räumen beitreten
  * Spielstand
    * Räume können mit aktuellem Spielstand exportiert und importiert werden (als ZIP)
    * Exportiert werden Spieltisch, Gelegte Spielobjekte, Hände, Spielernamen- und farben, alle nichtstandardmäßigen hinzugefügten Spielobjekte in der Liste der Spielobjekte
  * Spieler
    * Spieler die einem Raum beitreten, können sich entweder als neuer Spieler oder als vorhandener Spieler anmelden (dadurch gibt es keine Probleme der Identifikation von "eigenen Händen" aller Mitspieler bei Export & Import)
    * Jeder Spieler kann eine eigene Spielfarbe festlegen, diese wird beim Auswählen von Objekten den anderen Spielern als Umrandung angezeigt
    * Wenn ein Spieler sich ausloggen möchte, wird er gefragt, ob er das wirklich will und es wird angeboten den aktuellen Spielstand zu speichern
  * Menüs
    * Obermenü
      * besteht nur aus Icons, die andere Menüs aufrufen
      * Spielmenü
      * Log
      * Spielobjekte-Katalog
    * Kontextmenü (für Spieltisch und gelegte Spielobjekte)
      * Objekte entfernen
      * (Spieltisch) Hintergrund ändern
      * (Kartendeck) Karten mischen
      * Unterschiedliche Darstellung zwischen PC und Smartphone
    * Spielmenü (auf Smartphone ausblenden?)
      * Verbindungsstatus - nur angezeigt, wenn es ein problem gibt (auf Smartphone)
      * Spielername und -farbe
      * Ausloggen-Button
      * Spielerliste
      * Import & Export
      * Beitreten & Raum teilen
    * Log
      * Beitritt, Verlassen, Erstellen von Objekten und Entfernen von Objekten
      * Im Debug-Modus können hier alle Aktionen dargestellt werden
    * Spielobjekte-Katalog
      * dargestellt als Siebar (PC), und als "Bottombar" (Smartphone)
      * alle Standard-Spielobjekte und Standard-Spielbretter enthalten
      * Um neue Spielobjekte hinzuzufügen, werden diese per Drag'n'Drop auf das Spielbrett gezogen
      * Option, neue Spielobjekte hinzuzufügen


### Kann-Kriterien

## Views
- Startseite-View
  * Raum erstellen
  * Raum beitreten
  * Raum importieren
  * Impressum
  * Hanbuch
- Spiel-View
  * Raum

## Problems

## Implementation

## TODO
- über Kontextmenü Gedanken machen
- Kann-Kriterien bestimmen
- Was sind die Limits von WebRTC?
  * Peer-To-Peer außerhalb des lokalen Netzwerks
  * Wie werden Spieler untereinander angesprochen? (über IP?)
  * https://developer.mozilla.org/en-US/docs/Web/Guide/API/WebRTC/Peer-to-peer_communications_with_WebRTC
  * https://webrtc.org/getting-started/peer-connections
  * https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection