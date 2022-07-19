# Anotaciones

1. Crear componentes que tengan sentido, aislando su lógica
2. Evitar tener variables innecesarias en el render para que no se vuelvan a crear
3. Siempre que vaya a cambiar algo en la interfaz tiene que ser mediante un estado
4. El estado inicial debe ser siempre la minima información posible
5. El estado debe existir en el componente que sea el último ancestro más cercano a los componentes que necesitan leer dicho estado, pero que a su vez cumpla la condición de ser el nodo del Virtual DOM más bajo posible
6. Siempre que un estado se actualice esto afectará al nodo padre, sus hijos y nietos, en cadena, provocando un nuevo renderizado.
7. SIEMPRE que algo varie dentro del componente, debe ser tratado mediante un ESTADO.
8. Formularios no controlados: se usa en formularios en los que solamente nos interesa leer los valores cuando se produzca un evento concreto. Ej: Enviar un formulario, leer datos en una API y devolver la respuesta
9. Formularios controlados: se usan en formularios más dinámicos, que implican reaccionar ante un cambio
10. Extraer lógica de componentes muy complejos a función
11. Al refactorizar lo más importante es la legibilidad
12. Aplicar siempre el principio S de SOLID, una sola responsabilidad
13. Cuando tengamos una funcionalidad de dos opciones pero que posiblemente pueda cambiar en un futuro, debemos seguir el principio O de SOLID, abierto/cerrado, Ej: usando un switch, diccionario, etc.
14. Una función pura es una función que devuelve un valor dependiendo de sus parámetros y nunca tiene efectos colaterales (depende de una referencia externa a la función)
15. Siempre que haya una función que devuelva solo JSX considerarla convertirla en componente
16. Separar siempre la lógica en pequeñas funcionalidades (componentes, funciones)
17. Criterios para agrupar estados: \

- Consideraciones sobre el renderizado (evitar renderizados innecesarios)
- Considerar si los estados tienen una relación semántica
- Legibilidad del código

18. Utilizar custom hooks para agrupar lógica y crear abstracción

19. SI ALGO TIENE QUE CAMBIAR, ES UN ESTADO.
