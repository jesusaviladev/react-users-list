import UserList from './components/UserList.jsx';
import { users } from '../users.json';

const App = function () {
	/* Anotación: crear componentes cuando se tenga la necesidad 
	(responder a una lógica) */

	return <UserList initialUsers={users} />;
};

export default App;
