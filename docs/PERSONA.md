# Persona test log — fresh synthetic chat, source walkthrough

**Persona:** Rosa, 54, vende comida cerca del metro, usa WhatsApp, desconfía de apps nuevas, lee despacio y abandona sin avisar si algo no se entiende. Es una pasajera ficticia.

**Método:** se abrió un chat separado con la persona y se le dio el texto real de las pantallas y el mockup generado. No hubo capturas de la app funcionando: el sitio privado pidió acceso y no se pudo ejecutar un navegador local. Este resultado no cumple aún el requisito de pegar capturas de cada pantalla en orden.

## Recorrido y dudas expresadas por Rosa
1. **Entrada:** «¿Cambió tu parada?» corresponde a lo que quiere saber antes de salir. «Datos inventados» reduce su confianza para una decisión real, como debe hacerlo en una simulación.
2. **Mapa:** Centro → Hospital y Mercado aparecen, pero no hay punto exacto de referencia junto al metro. No puede ubicarse solo con el mapa ilustrativo.
3. **Aviso:** «frente a la farmacia» no indica cuál, en qué dirección o en qué acera. «Confirmado para esta simulación» hace que no lo tome como aviso real. La hora de vencimiento sin fecha tampoco ayuda si cruza medianoche.
4. **Elección:** «Ir a la parada alternativa» suena a navegación. En realidad solo registra una respuesta; Rosa no toca nada y preguntaría en la parada o por WhatsApp. Aquí termina su tarea.
5. **Otras pestañas:** Conductor y Responsable no forman parte de su tarea de pasajera.

## Corrección prioritaria realizada
El ejemplo ahora dice **«Acera norte, frente a Farmacia Ejemplo (lugar ficticio)»**, muestra día y hora de vencimiento, avisa arriba que los datos no sirven para un viaje real y llama a los controles **«Elegir alternativa (prueba)»**. El texto explica que no abren mapa ni dan instrucciones reales.

## Pendiente
Repetir en un chat nuevo con capturas de cada pantalla real después de acceder al sitio. Registrar las respuestas literales, los puntos de abandono y si esta corrección resuelve la confusión. En campo, un aviso debería tener una referencia verificable, canal humano y pruebas con pasajeros reales; esta simulación no demuestra comprensión ni adopción.
