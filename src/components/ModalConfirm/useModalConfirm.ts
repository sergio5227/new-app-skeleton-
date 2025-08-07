import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useIntl } from "react-intl";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useState } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

const useModalConfirm = () => {
  const theme = useTheme();
  const esPantallaPequena = useResponsive();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const intl = useIntl();
  const [comentarios, setComentarios] = useState<string>('');
  const formik = useFormik({
    initialValues: {
      comentarios: ""
    },
    onSubmit: async (values) => {

    },
    validationSchema: Yup.object({
      comentarios: Yup.string()
        .min(4, intl.formatMessage({ id: 'intput.validation.min.4' }))
        .max(255, intl.formatMessage({ id: 'intput.validation.min.255' }))
        .required(intl.formatMessage({ id: 'intput.validation.requerido' })),
    }),
  });


  return {
    fullScreen,
    intl,
    formik,
    comentarios,
    setComentarios,
    esPantallaPequena
  }
}
export default useModalConfirm
