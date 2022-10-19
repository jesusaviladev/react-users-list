/**
 * Promisificar APIs antiguas del navegador (que usen eventos o callbacks)
 *
 *
 * @file {object} El archivo que se va a transformar a base 64
 * en formato fileList
 *
 * @returns {Promise} Promesa que resuelve con el string del archivo en base64
 */

export const fileToDataURL = (file) =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader();

		fileReader.addEventListener('loadend', () => resolve(fileReader.result));

		fileReader.addEventListener('abort', () =>
			reject(new Error('Error al procesar'))
		);

		fileReader.addEventListener('error', () =>
			reject(new Error('Error al procesar'))
		);

		fileReader.readAsDataURL(file);
	});
