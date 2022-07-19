import UserList from './components/UserList.jsx';
import { USERS } from './data.js';

const App = function () {
	/* Anotación: crear componentes cuando se tenga la necesidad (responder a una lógica) */

	return <UserList initialUsers={USERS} />;
};

export default App;
