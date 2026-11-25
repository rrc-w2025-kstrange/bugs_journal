import { useState } from "react";

/**
 * Custom hook for the presentation logic of one form field: keeps
 * track of what the user has typed or selected, and clears it again.
 * It doesn't decide whether the value is valid or what to do with it, that's
 * business logic, and stays with the component using the hook.
 *
 * @param initialValue: the text the field starts with (and goes back to on reset)
 * @returns {
 *  value: the current text in the field. 
 *  setValue: method that saves new text.
 *  resetValue: method that puts the field back to its initial value.
 * }
 */
export function useFieldValue(initialValue: string) {
    const [value, setValue] = useState<string>(initialValue);

    const resetValue = () => {
        setValue(initialValue);
    };

    return { value, setValue, resetValue };
}