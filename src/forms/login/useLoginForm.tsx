import { useFormik } from "formik";
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { LoginFormProps } from "./types";

const useLoginForm = (props: LoginFormProps) => {

    const intl = useIntl();

    const formik = useFormik({
        initialValues: {
            usuario: props?.item?.usuario ? props?.item?.usuario + "" : "",
            piso: []
        },
        enableReinitialize: true,
        onSubmit: async (values) =>  alert(0),
        validationSchema: Yup.object({
            usuario: Yup.string()
                .min(4, intl.formatMessage({ id: "intput.validation.min.4" }))
                .max(20, intl.formatMessage({ id: "intput.validation.max.20" }))
                .required(intl.formatMessage({ id: 'intput.validation.requerido' })),
            piso: Yup.array().min(1, intl.formatMessage({ id: "intput.validation.requerido" })).required(intl.formatMessage({ id: "intput.validation.requerido" }))
        }),
    });

    return {
        intl,
        formik
    }
}

export default useLoginForm;