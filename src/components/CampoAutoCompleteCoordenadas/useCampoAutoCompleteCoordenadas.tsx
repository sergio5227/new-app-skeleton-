import { useField } from "formik";
import type { CampoAutoCompleteCoordenadasProps } from "./types";
import { useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import env from "react-dotenv";



export const useCampoAutoCompleteCoordenadas = (props: CampoAutoCompleteCoordenadasProps) => {

    const [field, meta] = useField(props);
    const [didFocus, setDidFocus] = useState(false);
    const handleFocus = () => setDidFocus(true);
    const showFeedback = (!!didFocus && (props?.value || '').trim().length > 2) || meta.touched;
    const isValid = meta.error ? 'invalid' : 'valid';
    const errorMessage = meta.error ? meta.error : '';
    const { formik } = props;
    const esError = formik?.touched && formik?.error;
    

    const { onPlaceSelect } = props;

    const { ref: bootstrapRef }: any = usePlacesWidget({
        apiKey: env.GOOGLE_API_KEY,
        language: 'mx',
        inputAutocompleteValue: "country",
        options: {
            types: ['address', 'geocode'],
        },
        onPlaceSelected: (place) => {
            onPlaceSelect(place);
        },
    });

    return {
        showFeedback,
        isValid,
        handleFocus,
        field,
        errorMessage,
        formik,
        esError,
        bootstrapRef
    }
}