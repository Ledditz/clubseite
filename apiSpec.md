
# POST ``/login``

Route zum login des Nutzers

### payload

Keine Ahnung ob man die Daten beim Request noch zusätzlich verschlüsseln sollte.

```json
{
    "userName": "string",
    "passwort": "string"
}
```

### return

Setzt zusätzlich den Authentication Cookie.

```json
{
    "success": "boolean"
}
```

# GET ``/users``

Gibt Liste aller Nutzer zurück.

### return

```json
{
    "success": "boolean",
    "data": "user[]"
}
```

### user object

aktuelle nur name.. könnte man noch in Vor-/Nachname aufteilen, jenachdem \
und money.. mehr Infos brauch ich aktuell nicht für einen Nutzer

```json
"user": {
    "id": "string | number",
    "name": "string",
    "money": "number"
}
```

Wäre noch zu überlegen ob man verschiedene "Klassen" einführt um die Nutzer weiter zu Gruppieren in der Übersicht. \
So wie es bei dir aktuell gemacht ist \
Man müsste mindestens die Vorstandsmitglieder irgendwie markieren, weil die ja andere Preise haben.

```json
    "role": "vorstand" | "kern" | "rest"
```

oder halt fancy englische Bezeichnungen oder einfach Ziffern.

# GET ``/drinks``

Liste aller verfügbaren Getränke + Preis \
Damit man nicht zu viel abbuchen kann brauch ich die Preise dazu..

### return

```json
{ 
    "drinks": [
        { 
            "id": "number", 
            "name": "string", 
            "cost": {
                "normal": "number",
                "vorstand": "number"
            } 
        }
    ]
}
```

# PUT ``/buy``

Hier wäre die Frage wie du es aktuell handhabst \
willst du hier die einzeln aufgelisteten Getränke oder einfach nur den Wert den man Abbucht?

# PUT ``/recharge``

### payload

Hier wahrscheinlich ganz simpel

```json
{
    "userID": "string | number",
    "amount": "number"
}
```

### return

```json
{
    "success": "boolean"
}
```
