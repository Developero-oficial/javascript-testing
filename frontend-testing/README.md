# El proyecto que haremos

La app que haremos es una **calculadora del índice de masa corporal** para adultos.

> El índice de masa corporal o IMC es una unidad de medida que sirve para tener una estimación de la grasa corporal.

Esta app va a consistir en:

- Un título.
- Un input text para pedir la estatura en metros.
- Un input text para pedir el peso en kilogramos.
- Un botón para enviar datos.
- Una sección para mostrar el resultado.

La fórmula para calcular el IMC es:

```
IMC = Peso (kg) / altura (m)2 (al cuadrado)
```

Por ejemplo:

```js
const weight = 70

const height = 1.70

const mci =  weight ÷ (height * height)
```

Con el dato del MCI podemos estimar si una persona tiene:

- Un peso inferior al normal (< 18.5 MCI).
- Peso normal (18.5 MCI - 24.9 MCI).
- Peso superior al normal (25.0 MCI -29.9 MCI).
- Obesidad (> 30.0 MCI).

Vamos a crear la misma aplicación frontend pero usando diferentes tecnologías:

- Reac JS.
- Vue JS.
