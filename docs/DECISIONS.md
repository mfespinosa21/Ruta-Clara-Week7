# DECISIONS — cierre de sesión
- Se conserva el vacuum residual: excepción temporal de parada en una ruta, no un sistema de tráfico general.
- ML Naive Bayes local sugiere categoría; una persona selecciona y otra verifica. La voz es opcional.
- Estado efímero y datos inventados evitan perfiles y ubicación histórica. La verificación del demo es simulada, visible.
- Se detectó y corrigió la acción de pasajero disponible cuando no existía aviso vigente.
- La persona sintética Rosa dejó el flujo por un destino impreciso y por botones que parecían navegación. Se aclaró un punto de abordaje ficticio, fecha/hora y el carácter de prueba de los botones. Aún falta validación con capturas reales.
- No se afirma reducción real de demora ni seguridad. El piloto debe contrastar con fuentes actuales y medir decisiones y costo de mantenimiento.
- Primera acción de la próxima sesión: abrir la URL con sesión de dueña, ejecutar tests/smoke.cjs o flujo manual en móvil, realizar persona test en chat fresco con capturas y grabar recorrido de 3:30.
