import { useMemo } from "react";

/** 
 * Custom hook to handle local storage.
 * 
 * @returns {Object} - Object containing setLocalStorage, getLocalStorage, and removeLocalStorage functions.
 */
const useLocalStorage = () => {
    /**
     * Saves a value to local storage.
     * 
     * @param {string} key - The key under which to store the value.
     * @param {any} value - The value to store.
     * @param {boolean} shouldStringify - Whether the value should be stringified before storing.
     */
    const setLocalStorage = (key, value, shouldStringify = false) => {
        if (shouldStringify) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    };

    /**
     * Retrieves a value from local storage.
     * 
     * @param {string} key - The key of the value to retrieve.
     * @param {boolean} shouldParse - Whether to parse the retrieved value.
     * @returns {any} - The retrieved value.
     */
    const getLocalStorage = (key, shouldParse = false) => {
        let storedValue = localStorage.getItem(key);
        if (shouldParse && storedValue) {
            storedValue = JSON.parse(storedValue);
        }
        return storedValue;
    };

    /**
     * Removes a value from local storage.
     * 
     * @param {string} key - The key of the value to remove.
     */
    const removeLocalStorage = (key) => {
        localStorage.removeItem(key);
    };

    return useMemo(() => ({
        setLocalStorage,
        getLocalStorage,
        removeLocalStorage,
    }), []);
};


export default useLocalStorage;
