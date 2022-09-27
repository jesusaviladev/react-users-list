import style from './IconButton.module.css';
/* 
	Tip: Cuando en una prop de un componente debas recibir otro,
	la forma más sencilla es proporcionarle un alias al 
	elemento en el destructuring 

*/

const CLASSNAMES = {
	black: {
		normal: style.black,
		filled: style.blackFilled,
	},
	red: {
		normal: style.red,
		filled: style.redFilled,
	},
};

const IconButton = ({
	kind = 'black',
	filled,
	icon: Icon,
	className,
	...props
}) => {
	// Primero extraemos los classNames, dependiendo del kind

	const classNames = CLASSNAMES[kind];

	// Luego seleccionamos cual propiedad utilizaremos dependiendo de
	// si está filled o no

	const filledClassKey = filled ? 'filled' : 'normal';

	// Extraemos el nombre de la clase

	const kindClassName = classNames[filledClassKey];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className || ''}`}
		>
			<Icon className={style.icon}></Icon>
		</button>
	);
};

export default IconButton;
