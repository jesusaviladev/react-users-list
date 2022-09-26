import { useState } from 'react';

const useUsers = (initialUsers) => {
	const [users, setUsers] = useState(initialUsers);

	return {
		users,
	};
};

export default useUsers;
