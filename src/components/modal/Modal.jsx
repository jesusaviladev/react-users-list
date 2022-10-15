import { createPortal } from 'react-dom';
import CrossIcon from '../icons/CrossIcon.jsx';
import IconButton from '../buttons/IconButton.jsx';
import style from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
	if (!children) return null;

	return createPortal(
		<div className={style.overlay}>
			<div className={style.modal}>
				<IconButton
					icon={CrossIcon}
					filled
					className={style.close}
					onClick={closeModal}
				/>
				{children}
			</div>
		</div>,
		document.getElementById('modal')
	);
};

export default Modal;
