import { useFormik } from 'formik';
import { useCallback, useEffect } from 'react'
import * as Yup from "yup";
import type { SearchFiltroProps } from './SearchFiltro';

const useSearchFiltro = (props: SearchFiltroProps) => {

    const formik = useFormik({
        initialValues: {
            texto: ""
        },
        onSubmit: async (values) => { },
        validationSchema: Yup.object({}),
    });

    const sendTo = useCallback(() => {
        props?.onFiltro(formik.values.texto)
    }, [props, formik.values.texto]);

    useEffect(() => {
        const getData = setTimeout(() => {
            sendTo();
        }, 800);
        return () => clearTimeout(getData);
    }, [sendTo])

    return {
        formik
    }
}

export default useSearchFiltro
