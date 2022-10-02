import style from './UserFormContainer.module.css';
import IconButton from '../buttons/IconButton.jsx';
import CrossIcon from '../icons/CrossIcon.jsx';
import UserCreateForm from './UserCreateForm.jsx';
import UserEditForm from './UserEditForm.jsx';
import UserDeleteForm from './UserDeleteForm.jsx';
import { useContext } from 'react';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import { USER_FORMS } from '../../constants/userForms.js';

const FORMS = {
	[USER_FORMS.CREATE]: <UserCreateForm />,
	[USER_FORMS.EDIT]: <UserEditForm />,
	[USER_FORMS.DELETE]: <UserDeleteForm />,
};

const UserFormContainer = () => {
	const { currentForm, setFiltersForm } = useContext(UserFormsContext);

	const form = FORMS[currentForm];

	if (!form) return null;

	return (
		<div className={style.wrapper}>
			<IconButton
				icon={CrossIcon}
				filled
				className={style.close}
				onClick={setFiltersForm}
			/>
			{form}
		</div>
	);
};

export default UserFormContainer;
