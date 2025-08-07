import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./style.css";
import type { ModalConfirmProps } from './types';
import useModalConfirm from './useModalConfirm';
import { Grid } from '@mui/material';
import { FormikProvider } from 'formik';
import { Form } from 'react-bootstrap';
import InputField from '../InputField';

const ModalConfirm: React.FC<ModalConfirmProps> = (props: ModalConfirmProps) => {

    const {
        fullScreen,
        intl,
        formik,
        esPantallaPequena
    } = useModalConfirm();


    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={props?.open}
                onClose={props?.onCancel}
                aria-labelledby="responsive-dialog-title"

            >
                <DialogTitle id="responsive-dialog-title">
                    {props?.title}
                </DialogTitle>
                <DialogContent style={{ minWidth: esPantallaPequena ? 300 : 500 }}>
                    <DialogContentText>
                        {props?.text}
                    </DialogContentText>
                    {
                        props?.esConComentarios ?
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }} >
                                    <Grid size={{ xs: 12 }} className='bordersContainers' style={{ backgroundColor: '#fff', padding: '10px' }}>
                                        <FormikProvider value={formik}>
                                            <Form.Group className="mb-3 " >
                                                <InputField
                                                    required
                                                    value={formik.values.comentarios || ''}
                                                    name="comentarios"
                                                    onInput={(e: any) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        formik.setFieldValue("comentarios", target?.value || '');
                                                    }}
                                                    label={intl.formatMessage({ id: 'input.comentarios' })}
                                                    placeholder={intl.formatMessage({ id: 'input.comentarios.placeholder' })}
                                                    type="textArea"
                                                    id="comentarios"
                                                    formik={formik?.getFieldMeta('comentarios')}
                                                />
                                            </Form.Group>
                                        </FormikProvider>
                                    </Grid>
                                </Grid>
                            </Grid>
                            : null
                    }


                </DialogContent>
                <DialogActions>
                    <Button color='error' autoFocus onClick={props?.onCancel} style={{ color: '#c14747' }}>
                        {intl.formatMessage({ id: 'general.cancelar' })}
                    </Button>
                    <Button
                        disabled={props?.esConComentarios && formik.values.comentarios === ''}
                        onClick={() => {
                            props?.onAcept(formik.values.comentarios)
                        }} autoFocus style={{ color: '#1A73E8' }}>
                        {intl.formatMessage({ id: 'general.aceptar' })}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ModalConfirm
