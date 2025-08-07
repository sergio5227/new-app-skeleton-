import { useField } from "formik";
import type { InputFieldProps } from "./types";
import { useState } from "react";

export const useInputField = (props: InputFieldProps) => {

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && ((props?.value + '') || '').trim().length > 2) || meta.touched;
    const isValid = meta.error ? 'invalid' : 'valid';
    const errorMessage = meta.error ? meta.error : '';
    const { formik } = props;
    const esError = formik?.touched && formik?.error;

    const newPros = Object.assign({}, props);

    if (newPros.hasOwnProperty('onEdit')) {
        delete newPros.onEdit;
    }

    return {
        newPros,
        showFeedback,
        isValid,
        handleFocus,
        field,
        errorMessage,
        formik,
        esError
    }
}