import { useState, useEffect, useRef } from 'react';

const useDropdown = () => {
	/**
	 * Hook para manejar cualquier popover
	 *
	 * */

	const [dropdownOpened, setDropdownOpened] = useState(false);

	const dropdownRef = useRef(null);

	const openDropdown = () => setDropdownOpened(true);

	const closeDropdown = () => setDropdownOpened(false);

	useEffect(() => {
		if (!dropdownOpened) return;

		const handleClickOutside = (e) => {
			if (!dropdownRef.current.contains(e.target)) closeDropdown();
		};

		/**
		 * Capturamos el evento en fase de captura para evitar que el bubbling
		 * consuma el evento
		 */

		document.addEventListener('click', handleClickOutside, { capture: true });

		return () =>
			document.removeEventListener('click', handleClickOutside, {
				capture: true,
			});
	}, [dropdownOpened]);

	return {
		dropdownOpened,
		openDropdown,
		closeDropdown,
		dropdownRef,
	};
};

export default useDropdown;
