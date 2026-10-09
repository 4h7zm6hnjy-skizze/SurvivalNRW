# SURVIVAL DEUTSCHLAND – Umsetzungsstruktur v1.7.0
**Status:** Technische und redaktionelle Spezifikation – noch keine implementierte Version.  
**Basis:** vorhandene App v1.6.0.  
**Prinzipien:** alle Bestandsfunktionen und Nutzerdaten erhalten; offline-first; kostenlos nutzbare Karten-/Bildquellen mit korrekter Attribution; sicherheitskritische Hinweise überprüfen.

## A. Produktziele und Qualitätsmaßstäbe
1. Mobile iPhone-Web-App/PWA, mobil und auf Tablets benutzbar.
2. Deutschland mit 16 auswählbaren Bundesländern, eigenen geprüften Regionalinformationen.
3. Topografische und satellitengestützte Offline-Karten **für ausdrücklich heruntergeladene Kartenausschnitte**. Als voreingestelltes Downloadprofil sind **beide Kartentypen und 6 km Bereichsdurchmesser (3 km Radius)** verbindlich vorgesehen; nicht die gesamte Bundesrepublik in beliebiger Auflösung.
4. Unterrichtsähnliche Schritt-für-Schritt-Anleitungen mit Bildern, überlagerten Pfeilen und Sicherheitsprüfungen.
5. Notfallfunktionen auch bei schlechter Verbindung; keine nicht nachweisbar verfügbaren Rettungsdienste versprechen.
6. Kein Konto und keine Pflicht zur Cloud-Speicherung; alle personenbezogenen Nutzerdaten bleiben lokal, Export freiwillig.
7. Strukturierte Quellen- und Lizenzangaben; fachliche Hinweise werden datiert und versioniert.
8. Kein kostenpflichtiger Kartendienst und keine obligatorischen Abonnements. Namensnennungspflichten kostenloser Daten beachten.

## B. Informationsarchitektur
**Untere Navigation:** Start / Karte / Wissen / Länder / Notfall.  
**Header:** bundeslandbezogener Schnellwechsel, Suche, Online/Offline-Indikator, Versionsnummer, Mehr-Menü.

**Start:** universelle Suche; 8 Schnellstartkategorien; zuletzt geöffnet; persönliche Favoriten; bereits heruntergeladene Kartenregionen; GPS-Status; Notfall-Knopf; Warnung bei unvollständigen Offline-Inhalten.

**Wissen / Kategorien:**
- Unterschlupf & Lager
- Feuer & Wärme
- Wasser & Trinkwasserhygiene
- Knoten & Bünde
- Orientierung & Outdoor-Navigation
- Jagd, Wildbeobachtung, Wildbrethygiene und Verarbeitung
- Wildpflanzen, essbare Arten und giftige Verwechslungen
- Kochen, Lebensmittelhygiene & Haltbarmachung
- Werkzeug, Material und Reparaturen
- Wetter, Jahreszeiten, Gewitter, Hochwasser
- Erste Hilfe, Hygiene und Notsituationen
- Kinder/Familie, Vorbereitung und Checklisten

**Länder:** 16 Profile, Suchfeld, Karte/Liste, anwendbare Kapitel, nach Bundesland geprüfte Rechtsverweise. Nicht recherchierte Details als »ungeprüft« kennzeichnen.

**Mehr:** Fotogalerie, Lernfortschritt, Materialplaner, Favoriten, eigene Bilder, Einstellungen, Speicher, Datensicherung, Quellen/Lizenzen, Versionsverlauf.

## C. Gemeinsames Anleitungsformat
Jede Anleitung hat die Datenfelder: id, slug, Titel, Kategorie, Region(en), Zweck, Eignung, nicht geeignete Situationen, Materialliste mit Mengen und Alternativen, Aufwand (ungefähr), Vorbedingungen, Schritte[], Risikohinweise, Fehlerbilder, rechtliche Hinweise, Review-Datum, Quellen, Lizenzangaben, Bilder[].

Ein Schritt hat: `stepId`, `title`, `instruction`, `expectedResult`, `imageId`, `annotations` (Pfeile/Kreise/Nummern als editierbare Overlay-Daten), `warnings`, `canMarkDone`, `photoComparison`.

**Darstellung:** große Fotografien, jeweils ein sichtbarer Schritt, Pfeile mit Legende, Vor/Zurück, Vergrößern, zoomfeste Bildmarkierungen, Fortschrittsanzeige, »fertig« markieren, eigenes Übungsfoto und Notizen. Mobile Texte in einfachem Deutsch. Fotos sind KI-Rekonstruktionen, keine begutachtete technische Dokumentation.

## D. Unterschlupf & Lagerbau
**Ziel:** 18 Profile und 8 bis 10 vollständige Prioritäts-Fotostrecken zum Start; weitere später.  
**Profile:** Tarp A-Frame, Lean-to, Plow Point, Diamond Tarp, flaches Winddach, Regendach, Laubhütte, A-Rahmen-Naturhütte, einfacher Windschutz, Notbiwak mit Rettungsdecke, Biwaksack, Hängematten-Tarp, bodennahes Schlafsetup, erhöhte Liege auf stabilem Untergrund, Winter-Tarp, einfacher Schneewindschutz, vorhandener wettergeschützter Unterstand, improvisierter Notunterstand.  
**Pro Anleitung:** Standortwahl (Sturmäste, Überschwemmung, Schutzgebiet), Material, Spannpunkte, konstruktive Stabilität, Wetter, Bodenisolierung, Belüftung, Rückbau, 4–8 einzelne Schritte.  
**Sicherheitsgrenzen:** keine gefährlichen Einsturz-, Höhen- oder CO-riskanten Konstruktionen unkritisch empfehlen; Schneehöhlen und erhöhte Konstruktionen nur mit deutlichem Gefahrhinweis. Wildcamping-/Naturschutzregeln der Länder separat prüfen.

## E. Feuer & Wärme
**Ziel:** 12 Profile, jeweils 4–7 Schritte + 2 Vergleichsbilder.  
**Profile:** Tipi-Aufbau, Pagodenaufbau, Sternfeuer, kleines Koch-/Glutfeuer, kontrolliertes Reflektorfeuer, Feuerstahl, Zunder vorbereiten, trockene Holzspäne, Windschutz (brandverträglich), Feuer im Regen, Raketenofen als Demonstration, Holzvergaser als Brennerprinzip, korrektes Löschen (ggf. separat).  
**Wenig-Rauch-Erklärung:** trockenes unbehandeltes Holz, genügend Luft, heiße saubere Verbrennung, keine Verbrennung von Abfällen, Wind beachten; nicht mit »unsichtbar« oder »rauchfrei« werben. Gruben- und Bauformen mit Erstickungs-/CO-Risiko werden als besondere Gefahr erklärt, nicht als pauschal sichere Lösung.  
**Recht:** Offenes Feuer nur dort, wo rechtlich erlaubt und unter sicheren Bedingungen; saisonale Waldbrandgefahr und amtliche Warnungen beachten. Keine verbrannten Plastikmaterialien.

## F. Knoten & Bünde
**Ziel:** 18–20 Lehrprofile, 3–6 gesonderte Schrittbilder je Profil.
Achterknoten, doppelter Achter, Überhandknoten, Kreuzknoten (eingeschränkter Zweck), Palstek, Mastwurf, Webeleinstek, Schotstek, doppelter Schotstek, Rundtörn mit zwei halben Schlägen, Zimmermannsschlag, Ankerstich, verstellbarer Spannknoten, Prusikknoten, Stopperknoten, Sackstich, Kreuzbund, Diagonalbund, Dreibeinbund, Parallelbund.  
Jeweils: Seilende und stehender Part farbig kennzeichnen, Pfeile für Führung, Belastung, Foto des fertigen Knotens, Fehlerbild, Einsatzgrenzen, Übungserfolg. Nur Lager- und Übungsanwendungen, **keine Lebenssicherungsfreigabe** oder Kletteranleitung.

## G. Jagd, Wildtiere & Verarbeitung
**Vier getrennte Praxisfamilien:** Reh, Wildschwein, Feldhase, Wildvögel (einzelne Vogelarten differenzieren).  
**Pro Art:** Merkmale, Fährten, Losung, Lebensraum, regionales Recht/Schonzeiten aus offiziellen datierten Quellen, verantwortungsvolle Jagd, Ansprechen und Sicherheit, rechtmäßige Bergung, Schutzkleidung, Beurteilung auffälliger Tiere, Hygiene und Gesundheitsrisiken, allgemeine fachgerechte Versorgung bereits legal erlegter Tiere, Kühlung, Fleischstücke/Zerlegung durch fachkundige Personen, hygienische Küchenvorbereitung, Gar- und Lagerhinweise, einfache Rezepte, Konservierungsrisiken.  
**Bilder:** Art, Spur, Hygieneausrüstung, Arbeitsumgebung, einzelne Verarbeitungsetappen, identifizierbare Teilstücke und fertiges Gericht. Separat gekennzeichnete KI-Illustrationen; für Hygiene und Anatomie nur fachlich geprüfte Darstellungen.  
**Besondere Warnungen:** Trichinenkontrolle bei relevanten Arten (u. a. Wildschwein), Tularämie bei Feldhasen, aviäre Influenza bei Wildvögeln; keine Verbraucherfreigabe durch die App. **Keine Trefferzonen-, Schussziel- oder Waffenanleitung.** Jagd nur nach den geltenden Berechtigungen und Rechtsvorschriften.

## H. Pflanzenkunde und Naturmedizin
**Bestehende 60 Pflanzenprofile erhalten; Ausbau der Qualität vor Anzahl.**  
Jedes Profil: deutsche/lateinische Bezeichnung, Fotos Blatt/Blüte/Frucht/Wuchsform, Bestimmungsmerkmale, gefährliche Doppelgänger, Saison, Lebensraum, regionales Vorkommen, essbare Teile nur soweit fachlich geprüft, erforderliche Verarbeitung, Ausschlusskriterien, Quellen, zuletzt geprüft. Für nicht verifizierte Arten: keine Essensfreigabe.  
**Warnprinzip:** KI-Bilder nicht zur alleinigen Identifikation; bevorzugt authentische taxonomisch verifizierte Fotos mit sauberer, kostenloser Nutzungslizenz. Keine Behauptung, Wildkräuter ersetzen Antibiotika oder verschreibungspflichtige Arzneimittel.

## I. Trinkwasser, Kochen und Haltbarmachung
Wasserquellen nach Risiko, Auffangen, Sedimentieren, Vorfilterung versus echte Entkeimung klar trennen, Erhitzen, sichere Aufbewahrung, chemische Belastung (Abkochen reicht dort nicht), Wetter- und Hochwasserlagen.  
Küchenmodule: Campingkocher, sichere Kochgestelle, Reinigungsabläufe, Trennung roh/gegart, Kühlung, Braten/Schmoren/Garen, Fehlerquellen. Haltbarmachung nur mit geprüften Methoden und klaren Verweisen auf sichere Temperaturen/Verfahren; improvisiertes Pökeln, Räuchern oder Einkochen nicht als generell sicher darstellen.

## J. Karten, Navigation, GPS
**2 Basiskarten:** BKG TopPlusOpen für Topografie und frei nutzbare/geeignet lizenzierte Satellitendaten. Lizenz vor Release anhand konkretem Dienst, Jahrgang und den Download-/Cache-Bedingungen nachprüfen, Herkunft immer anzeigen.  
**Kartenseite:** Ebenenwechsel, stabile Touch-Gesten, Norden, Maßstab, GPS-Punkt mit Genauigkeitskreis, Standort folgen, Kompass soweit Sensor verfügbar, Wegpunkte, Entfernungsmessung, Import/Export GPX und GeoJSON, Wegstrecke optional aufzeichnen, Marker (Lager, Wasser, Gefahr, Ausgangspunkt). Kein automatisches Routing über nicht vorhandene Offlinedaten vortäuschen.  
**Kartendownload:** Fläche auf Karte markieren (z. B. Radius oder Rechteck), topo/sat separat auswählen, Zoomstufen, Kachelzahl und grobe Dateigröße vorab, Download mit Pause/Fortsetzen/Fehler-Wiederholung und Fortschritt, Integritätskontrolle, verfügbare Region lokal speichern, Flugmodustest direkt in App. Karten nicht zwangsläufig dauerhaft auf iOS gespeichert: Speicher kann automatisch bereinigt werden; Verfügbarkeit nachprüfbar machen.  
**GPS:** `watchPosition` nur bei geöffnetem/aktiven App-Kontext, Standortberechtigung erst bei Nutzeraktion, Genauigkeit und Zeitstempel anzeigen, Battery-/Datenschutz-Hinweise, Anzeige bei GPS-Ausfall. Im Hintergrund und bei gesperrtem iPhone kann PWA-Tracking aussetzen.

### Verbindliche Grundeinstellung Offline-Kartenmanager (festgelegt am 09.10.2026)
- **Kartenebenen im Download:** **Topografische Karte UND Satellitenkarte**; beide Ebenen werden für dieselbe Region und geeignete Zoomstufen gespeichert. Danach kann im Offline-Modus zwischen ihnen umgeschaltet werden.
- **Größe des gespeicherten Bereichs:** **6 km Durchmesser** um den gewählten Mittelpunkt, also **3 km Radius**, *nicht* 6 km Radius. Mittelpunkt wahlweise vom Nutzer auf der Karte gesetzt oder durch bewusst aktivierte GPS-Ortung übernommen.
- **Bedienung:** „Offline-Karten“ öffnen → Kartenausschnitt/Mittelpunkt auswählen → Vorgabe „Topografie + Satellit · Ø 6 km“ anzeigen → Speicherbedarf, Zoomstufen und Lizenzhinweise anzeigen → Download ausdrücklich starten → Fortschritt und Teilfehler separat je Ebene anzeigen.
- **Erfolgskriterium:** „Offline bereit“ erst melden, wenn alle benötigten Kartenkacheln für **beide** Ebenen in den ausgewählten Zoomstufen tatsächlich gespeichert und aufrufbar sind. Fehlende Kacheln/Zoomstufen transparent anzeigen, Nachladen anbieten und Flugmodus-Test empfehlen.
- **Grenzen:** Ein Satellitenbild ersetzt keine amtliche Gelände- oder Wanderkarte. Maßstäbe, verfügbare Detailtiefe und voraussichtlicher Speicherbedarf hängen vom konkreten Kartenangebot ab; keine festen Downloadgrößen oder vollständige Abdeckung behaupten. iOS kann gespeicherte Webdaten bereinigen.
- **Kosten/Lizenzen:** Keine kostenpflichtigen Kartendienste oder Abos. Offline-Speicherung nur einsetzen, wenn die jeweilige Quelle die konkrete Weiterverwendung und technische Zwischenspeicherung gestattet; Attribution und Datenstand in der App anzeigen.

## K. Bundesländer-Datenmodell
Für alle 16 Länder jeweils: Region, markante Landschaftsräume, typische Wetter- und Geländerisiken, Naturschutz, Verhalten bei Hochwasser/Waldbrand, saisonale Besonderheiten, zuständige amtliche Quellen/Links, juristische Hinweise zu Feuer/Camping/Jagd und deren Prüftag.  
Kein erfundener Wasserfund, Notdienststandort oder rechtliche Ausnahme. Gesetzliche Detailfragen werden landesspezifisch geprüft, nicht von NRW auf ganz Deutschland übertragen.

## L. Notfall und Checklisten
SOS immer erreichbar, 112 als Notrufhinweis, GPS-Position zum Kopieren/Teilen, Standortgenauigkeit und Erfassungszeit, Vorbereitung eines Notruftextes, 6–10 kurze geführte Notfallsituationen (Verirrt, Kälte, Hitze, Gewitter, Hochwasser, schwere Verletzung, fehlendes Trinkwasser, Waldbrand, Kind vermisst).  
Checklisten: 10 Minuten, 24 Stunden, 72 Stunden, 7 Tage, Camping, Familie, Winter, Hochwasser, Ausrüstung, Lagerabbau. Gefährliche medizinische Behandlungsanweisungen nur evidenzbasiert, eindeutig und mit Verweis auf Rettungsdienst.

## M. Bild- und Medienkonzept
**Bildarten:** Kontextfoto, Schrittbild, Detailfoto, Fehlervergleich, Ergebnisfoto, Pflanzenfoto, Kartenlegende, anatomische/hygienische Darstellung. KI-Szenen sind als solche gekennzeichnet.
**Overlay-Layer:** editierbare SVG-Markierungen auf richtigen Koordinaten, nummerierte Pfeile, Verlauf/Bewegungsrichtung, Beschriftungen, Warnkreise. Keine von Bildgeneratoren frei erfundenen Beschriftungen als alleinige Anleitung. Vergrößern und Kontrastmodus.  
**Produktion:** in Etappen, zuerst 8 priorisierte Bauanleitungen × 5 Bilder, 12 Knoten × 4, 8 Feueranleitungen × 4, 4 Wild-Abschnitte × 8, ergänzend Pflanzenbilder nur nach Taxonomieprüfung. Dies ist eine geplante Menge, keine Aussage über vorhandene Medien. WebP/AVIF und verschiedene Auflösungen für Mobilgeräte; Bilder mit Dateiname, Copyright/Attribution, Quellen-/Prüfstatus dokumentieren.

## N. Technische Architektur (modulare Weiterentwicklung)
```text
public/
  index.html
  manifest.webmanifest
  sw.js
  version.json
  assets/
    photos/{category}/{id}-{step}.webp
    icons/
    licenses/
  data/
    chapters.json
    shelters.json
    fires.json
    knots.json
    wildlife.json
    plants.json
    regions/{state}.json
    credits.json
src/
  app/router.js
  app/navigation.js
  app/search.js
  ui/home.js
  ui/lesson-viewer.js
  ui/image-annotations.js
  ui/accessibility.js
  features/maps/map-engine.js
  features/maps/offline-downloads.js
  features/maps/gps.js
  features/maps/waypoints.js
  features/maps/gpx.js
  features/learning/progress.js
  features/emergency/assistant.js
  storage/indexeddb.js
  storage/migrations.js
  storage/export-import.js
  updates/version-check.js
  tests/
```
Static Hosting/GitHub Pages, clientseitiger Router mit Kompatibilität älterer Hash-URLs. Daten und Bilder getrennt vom UI-Code versionieren. Keine bezahlten API-Schlüssel voraussetzen.

**Datenspeicherung:** kleine Präferenzen in LocalStorage, Notizen/Dateien/Kartenregionen über IndexedDB/CacheStorage; exportierbare JSON-Backups, optional Medien separat; Datenmigrationspfad von v1.6.0; keine ungefragte Löschung alter Schlüssel.

## O. Qualitätssicherung und Abnahme
- Alle Haupt- und Unterseiten einschließlich Altlinks ohne »Seite nicht vorhanden«.
- Bildinventar vollständig: keine leeren Bilder oder 404; Textalternative pro Bild.
- 16 Bundesländer wählbar und gespeichert; keine unbestätigten Rechtsbehauptungen.
- Alle Lektionen vor-/zurückblätterbar, Merker und Fotos bleiben nach Reload erhalten.
- Karten: voreingestelltes Profil **Topografie + Satellit, Ø 6 km / Radius 3 km**; nach vollständigem Download beide Ebenen im Flugmodus auf geprüfter Region und Zoomstufen verfügbar. Unvollständige Ebenen getrennt kennzeichnen, niemals voreilig »Offline bereit« melden.
- GPS: Freigabe, Genauigkeit, Fehlerbehandlung; bei gesperrtem Hintergrund keine Verfügbarkeitsgarantie.
- Notfallseite und bereits gespeicherte Wissensinhalte offline verfügbar.
- Update von v1.6.0 auf v1.7.0 mit Backup und nachweislich erhaltenen Nutzerdaten.
- JavaScript-Konsolenfehler 0 bei automatisierten Hauptpfadtests; realistischer manueller iPhone-Safari/Home-Screen-Test.
- Security: HTML-Inhalte escapen, Dateiuploads validieren, keine Tracking-Dienste, Browser-Rechte sparsam.
- Quellen/Lizenzen sichtbar, offline verfügbare Rechtshinweise mit Prüftag versehen.

## P. Umsetzung in acht Arbeitspaketen
1. **Bestandsaufnahme & Sicherung:** Quellcode, Nutzerdaten-Schema, Bildinventar, defekte Pfade, Datenexport.
2. **App-Gerüst:** neues responsives Design, robuste Navigation, Suche, Altlink-Kompatibilität.
3. **Karten & GPS:** Kartenansichten, Downloadmanager, Cache-Zustand, Punkte und GPX.
4. **Lern-Engine:** wiederverwendbare Schrittansicht, Pfeil-/Linien-Overlay, Materiallisten, Quiz/Notizen.
5. **Breiteninhalte:** Shelter, Feuer, Wasser, Knoten, alle 16 Länder; Fachprüfung.
6. **Wild/Pflanzen:** artbezogene Kapitel, Hygiene, verifizierte Illustrationen und Sicherheitshinweise.
7. **Daten & Updates:** Migration, Backups, Versionscheck, Service Worker, Fehlermeldungen.
8. **Test & Veröffentlichung:** automatisierte Prüfungen, iPhone-Flugmodus-Test, GitHub-ZIP, vollständige ZIP, optional Einzel-HTML (ohne Zusicherung, dass diese allein Offline-Rasterkarten bereitstellen kann).

## Q. Nicht versprechen
- Komplettes Deutschland inklusive aller hochauflösenden Satellitenbilder in einer wenigen Megabyte großen ZIP.
- Standortaufzeichnung bei gesperrtem iPhone im Hintergrund ohne Einschränkungen.
- Korrekte Pflanzenbestimmung nur anhand künstlich generierter Bilder.
- Zuverlässige Trinkwasserentkeimung durch Sand/Kies/Moos ohne separate Desinfektion.
- Rechtssicherheit von Jagd-/Feuer-/Campingregeln ohne regionale Prüfung.
- Trefferzonen-/Schussanleitung für Wildtiere.

**Ergebnis der geplanten Umsetzung:** `Survival_Deutschland_1_7_0_Update.zip`, `Survival_Deutschland_1_7_0_Komplett.zip`, Änderungsprotokoll, Lizenznachweise, Testbericht und optional eine portable Offline-HTML-Version mit der oben genannten Karteneinschränkung. Erst nach Implementierung, Tests und Verpackung als »fertig« bezeichnen.
