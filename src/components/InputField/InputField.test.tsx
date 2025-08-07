import { render, screen } from '@testing-library/react';
import DragAndDropField from './index';
import { IntlProvider, ReactIntlErrorCode } from 'react-intl';
import textoEn from '../../idioms/en';
import textoEs from '../../idioms/es';
import InputField from './index';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";


function Wrapper({ children }: any) {
    const formik = useFormik({
        initialValues: {
            usuario: "",
        },
        enableReinitialize: true,
        onSubmit: async (values) => alert(0),
        validationSchema: Yup.object({
            usuario: Yup.string()
                .min(4, 'Min 4')
                .max(20, 'max 20')
                .required('requerido')
        }),
    });
    return (
        <FormikProvider value={formik}>
            <Form>{children}</Form>
        </FormikProvider>
    )
}

test('renderiza el componente input', () => {
    const { container } = render(
        <Wrapper>
            <InputField
                required
                value={""}
                name="usuario"
                onInput={(e: any) => {
                    const target = e.target as HTMLTextAreaElement;
                    console.log(target?.value)
                }}
                placeholder={''}
                label={''}
                type="text"
                id="usuario"
                formik={null}
            />
        </Wrapper>
    );
    expect(container).toBeTruthy();
    expect(screen.getByTestId('input-field-container')).toBeInTheDocument();
});