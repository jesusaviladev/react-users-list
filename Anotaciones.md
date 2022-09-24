# Anotaciones

1. Crear componentes que tengan sentido, aislando su lógica
2. Evitar tener variables innecesarias en el render para que no se vuelvan a crear
3. Siempre que vaya a cambiar algo en la interfaz tiene que ser mediante un estado
4. El estado inicial debe ser siempre la minima información posible
5. El estado debe existir en el componente que sea el último ancestro más cercano a los componentes que necesitan leer dicho estado, pero que a su vez cumpla la condición de ser el nodo del Virtual DOM más bajo posible
6. Siempre que un estado se actualice esto afectará al nodo padre, sus hijos y nietos, en cadena, provocando un nuevo renderizado.
7. SIEMPRE que algo varie dentro del componente, debe ser tratado mediante un ESTADO.
8. Formularios no controlados: se usa en formularios en los que solamente nos interesa leer los valores cuando se produzca un evento concreto. Ej: Enviar un formulario, leer datos en una API y devolver la respuesta.
9. Formularios controlados: se usan en formularios más dinámicos, que implican reaccionar ante un cambio.
10. Extraer lógica de componentes muy complejos a función.
11. Al refactorizar lo más importante es la legibilidad.
12. Aplicar siempre el principio S de SOLID, una sola responsabilidad
13. Cuando tengamos una funcionalidad que ofrezca diferentes opciones pero que posiblemente pueda cambiar en un futuro, debemos seguir el principio O de SOLID, abierto/cerrado, Ej: usando un switch, diccionario, etc.
14. Una función pura es una función que devuelve un valor dependiendo de sus parámetros y nunca tiene efectos colaterales (depende de una referencia externa a la función).
15. Siempre que haya una función que devuelva solo JSX considerarla convertirla en componente.
16. Separar siempre la lógica en pequeñas funcionalidades (componentes, funciones)
17. Criterios para agrupar estados: \

- Consideraciones sobre el renderizado (evitar renderizados innecesarios)
- Considerar si los estados tienen una relación semántica
- Legibilidad del código

18. Utilizar custom hooks para agrupar lógica y crear abstracción

19. SI ALGO TIENE QUE CAMBIAR, ES UN ESTADO.
20. Debido al Virtual DOM, un componente solo puede pasar sus props de padres a hijos.
21. Al usar un contexto, todos los componentes que lo consuman se renderizarán si el valor del contexto cambia (si dependen de un estado, por ejemplo).
22. Para evitar renderizar innecesariamente componentes dentro de un contexto complejo es recomendable dividir el contexto en diferentes nodos que envuelvan los componentes que tienen acceso.
23. La prioridad máxima para la experiencia de usuario en una aplicación de React es
    ofrecer una respuesta visual inmediata.
24. Los side effects son tareas que se producen como consecuencia de otra acción, se ejecutan siempre después de la acción principal, su orden es irrelevante y tienen implicaciones externas a la función que los defines (Ej: el document title, location.href, etc).
25. Dentro del hook useEffect se pueden incluir tantos side effects como sea necesario, el hook useEffect se ejecuta siempre después de terminar el render y tiene acceso al nuevo valor del estado.
26. useEffect tiene como parámetro un arreglo de dependencias que permiten controlar el momento en el que se ejecuta.
27. El arreglo de dependencias de useEffect toma el valor inicial y lo compara con el anterior para determinar si ha cambiado dicho valor y ejecutar el callback
28. No hay forma de evitar que useEffect se ejecute la primera vez, si queremos controlar eso entonces debemos evitar la acción dentro del callback.
29. Los hooks no se pueden utilizar dentro de estructuras condicionales porque react tiene que guardar una coherencia entre los hooks que se ejecturaron en un renderizado anterior y el nuevo render (los hooks se deben ejecutar en todos los renders y siempre en el mismo orden).
30. No mentir con las dependencias, cuando algo pueda cambiar en un estado debe ser parte del array, las funciones que se declaran en el render también cambian.
31. La función cleanup de useEffect se utiliza para limpiar los side effects, se ejecuta antes de ejecutar el useEffect.
32. El render NUNCA puede ser una ejecución asíncrona
