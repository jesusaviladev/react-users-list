import UserList from './components/UserList.jsx';
import { USERS } from './data.js';

const App = function () {
	/* Anotación: crear componentes cuando se tenga la necesidad (responder a una lógica) */

	return (
		<UserList users={USERS}>
			<h1>Listado de Usuarios</h1>
		</UserList>
	);
};

export default App;
