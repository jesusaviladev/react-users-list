import style from './UserDisplay.module.css';

const UserDisplay = ({ name, username, picture }) => (
	<div className={style.wrapper}>
		<img
			src={picture || '/assets/profile-pic.svg'}
			alt={`Foto de ${name}`}
			className={style.picture}
		/>
		<div className={style.display}>
			<span>{name}</span>
			<span className={style.username}>@{username}</span>
		</div>
	</div>
);

export default UserDisplay;
