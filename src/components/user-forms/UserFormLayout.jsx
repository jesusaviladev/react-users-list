import style from './UserFormLayout.module.css';
import IconButton from '../buttons/IconButton.jsx';
import CrossIcon from '../icons/CrossIcon.jsx';

const UserFormLayout = ({ onClose, children }) => (
	<div className={style.wrapper}>
		<IconButton
			icon={CrossIcon}
			filled
			className={style.close}
			onClick={onClose}
		/>
		{children}
	</div>
);

export default UserFormLayout;
