This JScript program module is intended to run within a MS Windows OS (WSH)
Create a file readable in [TransDatRO](http://www.ancpi.ro/pages/download.php?lang=ro) the official romanian
cadastre coordinates transformation program.
The output file format is as follows:

```code
PROIECT: <Project Name> {or empty row}
P1, 44 38 43.52664, 28 46 12.65034
P2, 47 13 34.72394, 24 31 32.15343, 775.613
P3, 46 46 03.59286, 21 42 38.23706, 143.553
P4, 46 56 28.43635, 23 25 58.19140
P5, 46 26 26.03942, 22 41 21.00950
ENDF
``` 
Where
```PROIECT``` stands for "PROJECT" in Romanian
```P1,P2, ...``` are map-point labels
```ENDF``` is the file ending marker

This project is based on a idea by [Tom MacWright](https://github.com/tmcw)
which wrote a piece of software in JavaScript useful to:

Parse more forms of latitude, longitude, including the
[sexagesimal](http://en.wikipedia.org/wiki/Sexagesimal) form.

```javascript
coords.parse('66° 30′ 0″ N');	// 66.5
coords.parse('66° 30′ 0″ S');	// -66.5
coords.parse('66.5');			// 66.5
```
