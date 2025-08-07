import { useField } from "formik";
import type { SelectMultipleAutoCompleteFieldProps } from "./types";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import { useIntl } from "react-intl";

const useSelectMultipleAutoCompleteField = (props: SelectMultipleAutoCompleteFieldProps) => {
    const intl = useIntl();

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && !(props?.value || []).length) || meta.touched;
    const isValid = meta.error ? 'invalid' : 'valid';
    const errorMessage = meta.error ? meta.error : '';
    const { formik, btnPlus } = props;
    const esError = formik?.touched && formik?.error;
    const newPros = Object.assign({}, props);
    delete newPros.btnPlus;
    delete newPros.onAdd;
    const theme = useTheme();
    return {
        showFeedback,
        isValid,
        handleFocus,
        field,
        errorMessage,
        formik,
        esError,
        btnPlus,
        newPros,
        theme,
        intl
    }
}

export default useSelectMultipleAutoCompleteField
