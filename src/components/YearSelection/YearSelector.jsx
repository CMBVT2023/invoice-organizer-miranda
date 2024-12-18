import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

export function YearSelector({isDisabled}) {
    const currentYear = new Date().getFullYear();
    const yearOffSet = 5;
    const [ queryParameters, setQueryParameters ] = useSearchParams();

    function changeYear(e) {
        setQueryParameters(prevParameters => {
            prevParameters.set('year', e.target.value);
            return prevParameters;
        })
    }

    return (
        <div>
            <label></label>
            <input type='number'
                min={currentYear - yearOffSet} max={currentYear + yearOffSet}
                    onChange={changeYear} value={queryParameters.get('year') || currentYear} disabled={isDisabled} />
        </div>
    )
}