import { useState, useEffect } from 'react';
import CheckCircleIcon from '../icons/CheckCircleIcon.jsx';
import CrossCircleIcon from '../icons/CrossCircleIcon.jsx';
import { ALERT_KINDS } from '../../constants/alertKinds.js';
import { alertBox } from '../../lib/events/alertEvents.js';
import style from './AlertBox.module.css';

const ICONS = {
	[ALERT_KINDS.SUCCESS]: CheckCircleIcon,
	[ALERT_KINDS.ERROR]: CrossCircleIcon,
};

const STYLES = {
	[ALERT_KINDS.SUCCESS]: style.success,
	[ALERT_KINDS.ERROR]: style.error,
};

const AlertBox = () => {
	const { alert } = useAlert();

	if (!alert) return null;

	const Icon = ICONS[alert.kind];
	const className = STYLES[alert.kind];

	if (!Icon || !className) return null;

	return (
		<div className={className}>
			<Icon className={style.icon} />
			<p>{alert.message}</p>
		</div>
	);
};

const useAlert = () => {
	const [alert, setAlert] = useState();

	useEffect(() => {
		if (!alert) return;

		const timeoutId = setTimeout(() => setAlert(), 3000);

		return () => clearTimeout(timeoutId);
	}, [alert]);

	useEffect(() => {
		// Pasamos un callback que se ejecutara all emitir el evento
		const callback = (alertData) => setAlert(alertData);

		const handler = alertBox.suscribe(callback);

		return () => alertBox.unsuscribe(handler);
	}, []);

	return {
		alert,
	};
};

export default AlertBox;
