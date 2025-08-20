import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import React from 'react'
import { Form } from 'react-bootstrap';
import useSearchFiltro from './useSearchFiltro';
import './style.css';
import InputField from '../../components/InputField';

export interface SearchFiltroProps{
    onFiltro:(texto:string)=>void
    bg?:string
}

const SearchFiltro: React.FC<SearchFiltroProps> = (props:SearchFiltroProps) => {
    
    const { formik } = useSearchFiltro(props);

    return (
        <Grid container spacing={2}>
            <Grid size={{xs:12}}>
                <FormikProvider value={formik}>
                    <Form.Group className="mb-3">
                        <InputField
                            value={formik.values.texto}
                            name="texto"
                            onInput={(e: any) => {
                                const target = e.target as HTMLTextAreaElement;
                                formik.setFieldValue("texto", target?.value);
                            }}
                            placeholder="Ingrese el texto de búsqueda, para filtrar los resultados"
                            type="text"
                            id="texto"
                            formik={formik?.getFieldMeta('texto')}
                        />
                    </Form.Group>
                </FormikProvider>
            </Grid>
        </Grid>
    )
}

export default SearchFiltro
