// IMPORTANTE

/*
	Pensar en hacer funciones genéricas  que se 
	puedan reutilizar 
*/

export const createUser = async (user) => {
	try {
		const res = await fetch('http://localhost:4000/users/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		return res.ok;
	} catch (error) {
		return false;
	}
};

export const updateUser = async (user) => {
	try {
		const res = await fetch(`http://localhost:4000/users/${user.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		return res.ok;
	} catch (error) {
		return false;
	}
};

export const deleteUserById = async (userId) => {
	try {
		const res = await fetch(`http://localhost:4000/users/${userId}`, {
			method: 'DELETE',
		});

		return res.ok;
	} catch (error) {
		return false;
	}
};

export const findAllUsers = async (signal) => {
	try {
		// signal para abortar la peticion
		const res = await fetch('http://localhost:4000/users', {
			signal,
		});

		let users;

		if (res.ok) users = await res.json();

		return {
			users,
			error: !res.ok,
			aborted: false,
		};
	} catch (error) {
		// error
		const isAborted = error.name === 'AbortError';

		return {
			users: undefined,
			error: !isAborted,
			aborted: isAborted,
		};
	}
};

export const findUserByUsername = async (username, signal) => {
	try {
		// signal para abortar la peticion
		const res = await fetch(
			`http://localhost:4000/users?username=${username}`,
			{
				signal,
			}
		);

		let user;

		if (res.ok) {
			const users = await res.json();
			user = users[0];
		}

		return {
			user,
			error: !res.ok,
			aborted: false,
		};
	} catch (error) {
		// error
		const isAborted = error.name === 'AbortError';

		return {
			user: undefined,
			error: !isAborted,
			aborted: isAborted,
		};
	}
};
