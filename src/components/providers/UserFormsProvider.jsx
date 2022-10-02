import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import useSelectedForm from '../../lib/hooks/useSelectedForm.js';

const UserFormsProvider = ({ reloadUsers, resetFilters, children }) => {
	// Lógica para renderizar los distintos formularios

	const { setFiltersForm, ...restSelectedForm } = useSelectedForm();

	const onSuccess = () => {
		reloadUsers();
		resetFilters();
		setFiltersForm();
	};

	return (
		<UserFormsContext.Provider
			value={{
				setFiltersForm,
				onSuccess,
				...restSelectedForm,
			}}
		>
			{children}
		</UserFormsContext.Provider>
	);
};

export default UserFormsProvider;
