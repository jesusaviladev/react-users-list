import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import CrossIcon from '../icons/CrossIcon.jsx';
import IconButton from '../buttons/IconButton.jsx';
import style from './Modal.module.css';

const Modal = ({ closeModal, children }) => {
	useEffect(() => {
		if (!children) return;

		document.body.classList.add(style.bodyOverflow);

		return () => {
			document.body.classList.remove(style.bodyOverflow);
		};
	}, [children]);

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
