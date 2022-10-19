import { ALERT_KINDS } from '../../constants/alertKinds.js';

const EVENT_NAME = 'alert';

const emitEvent = (kind, message) => {
	const event = new CustomEvent(EVENT_NAME, {
		detail: {
			kind,
			message,
		},
	});
	document.dispatchEvent(event);
};

const success = (message) => emitEvent(ALERT_KINDS.SUCCESS, message);

const error = (message) => emitEvent(ALERT_KINDS.ERROR, message);

/**
 * Método para suscribirse al evento
 * @callback funcion que utilizamos para manejar el evento
 *
 */

const suscribe = (callback) => {
	// recibimos el evento y ejecutamos el callback suministrado

	const handler = (ev) => callback(ev.detail);

	document.addEventListener(EVENT_NAME, handler);

	return handler;
};

const unsuscribe = (handler) =>
	document.removeEventListener(EVENT_NAME, handler);

export const alertBox = {
	success,
	error,
	suscribe,
	unsuscribe,
};
