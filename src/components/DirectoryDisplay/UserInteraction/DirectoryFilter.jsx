import { useRef } from "react";
import Stack from "react-bootstrap/esm/Stack";
import { UseHotKey } from "../../../hooks/UseHotKey";
import styles from '../styles/DirectoryDisplayStyles.module.css'

export function DirectoryFilter({ filter, isDisabled }) {
    const [ filterValue, setFilterValue ] = filter;
    const filterRef = useRef()

    UseHotKey({triggerKey: 'F', action: focusFilterInput, variablesCheck: [], dependencies: []})

    function focusFilterInput() {
        filterRef.current.select()
    }

    function checkFocus(e) {
        if (e.key === "Escape") {
            filterRef.current.blur();
        }
    }

    function checkFilterValue(e) {
        let filterInput = e.target.value.toUpperCase()
        //* Offsets by 65 to make the process of filtering for the 26 capital letters of the alphabet more simplistic.
        if (filterInput.length !== 1) {
            setFilterValue(e.target.value)
        } else {
            let firstCharacterCode = filterInput.charCodeAt(0) - 65;
    
            if (firstCharacterCode >= 0 && firstCharacterCode < 26) setFilterValue(e.target.value);
        }
    }

    return (
        <Stack direction="horizontal" gap={1} className={`${styles.userInputContainer} ${styles.directoryFilterContainer}`}>
            <label htmlFor="directoryFilter">Find:</label>
            <input id="directoryFilter" type='text' placeholder='Filter By...' value={filterValue} onChange={checkFilterValue} onKeyDown={checkFocus}
                disabled={isDisabled} className={styles.userInput} ref={filterRef} />
        </Stack>
    )
}