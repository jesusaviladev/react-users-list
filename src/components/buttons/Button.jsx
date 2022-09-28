import style from './Button.module.css';

const KIND_CLASSNAMES = {
	primary: style.primary,
	secondary: style.secondary,
};

const Button = ({ kind = 'primary', className, ...props }) => {
	const kindClassName = KIND_CLASSNAMES[kind];

	return (
		<button
			{...props}
			className={`${style.button} ${kindClassName} ${className || ''}`}
		></button>
	);
};

export default Button;
