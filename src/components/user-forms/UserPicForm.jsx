import { useState, useContext, useRef } from 'react';
import { UserFormsContext } from '../../lib/context/UserFormsContext.js';
import { fileToDataURL } from '../../lib/utils/file-utils.js';
import { updateUserPic } from '../../lib/services/users.services.js';
import Button from '../buttons/Button.jsx';
import IconButton from '../buttons/IconButton.jsx';
import PictureIcon from '../icons/PictureIcon.jsx';
import PencilIcon from '../icons/PencilIcon.jsx';
import style from './UserPicForm.module.css';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
const MAX_SIZE = 102400;

const UserPicForm = ({ currentUser, closeModal }) => {
	const { onSuccess } = useContext(UserFormsContext);

	const [preview, setPreview] = useState();

	const [isSubmitting, setIsSubmitting] = useState(false);

	const inputRef = useRef(null);

	const message = getMessage(preview);

	const hasPreview = preview && preview.src;

	return (
		<div className={style.wrapper}>
			<div className={style.preview}>
				{hasPreview ? (
					<img src={preview.src} alt="Preview" />
				) : (
					<PictureIcon className={style.icon} />
				)}
				<IconButton
					filled
					icon={PencilIcon}
					className={style.fileInputButton}
					onClick={() => inputRef.current.click()}
				/>
			</div>
			{message}
			<input
				ref={inputRef}
				className={style.input}
				type="file"
				accept={ALLOWED_MIME_TYPES.join(',')}
				onChange={(ev) => handleChange(ev, setPreview)}
			/>
			<Button
				className={style.button}
				disabled={isSubmitting || !preview || !preview.src}
				onClick={(ev) =>
					handleClick(
						currentUser.id,
						preview,
						onSuccess,
						closeModal,
						setIsSubmitting
					)
				}
			>
				{isSubmitting ? 'Cargando...' : 'Actualizar foto'}
			</Button>
		</div>
	);
};

const getMessage = (preview) => {
	if (!preview) return <span>JPG/PNG - Máx 100Kb</span>;

	if (preview.fileName)
		return <span className={style.filename}>{preview.fileName}</span>;

	return <span className={style.error}>{preview.error}</span>;
};

const handleChange = async (ev, setPreview) => {
	const file = ev.target.files[0];

	if (!file) {
		return setPreview();
	}

	if (!ALLOWED_MIME_TYPES.includes(file.type)) {
		return setPreview({
			error: 'El formato debe ser JPG/PNG',
		});
	}

	if (file.size > MAX_SIZE) {
		return setPreview({
			error: 'Tamaño máximo de la imagen: 100Kb',
		});
	}

	try {
		const dataURL = await fileToDataURL(file);

		setPreview({
			src: dataURL,
			fileName: file.name,
		});
	} catch (err) {
		// TODO
		setPreview({
			error: err.message,
		});
	}
};

const handleClick = async (
	userId,
	preview,
	onSuccess,
	closeModal,
	setIsSubmitting
) => {
	if (!preview) return;

	setIsSubmitting(true);

	const success = await updateUserPic(userId, preview.src);

	if (success) {
		onSuccess();
		closeModal();
	} else {
		setIsSubmitting(false);
	}
};

export default UserPicForm;
