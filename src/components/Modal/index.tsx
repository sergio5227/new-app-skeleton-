import React from 'react';
import "./style.css";
import type { ModalProps } from './types';
import { Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import _ from 'lodash';
import { useIntl } from 'react-intl';


const ModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
    const intl = useIntl();


    return (
        <>
            <Dialog
                fullScreen={props?.esFullScreen}
                open={props?.isOpen || false}
                onClose={props?.handleClose}
                maxWidth={props?.size || 'md'}
                fullWidth={_.isEmpty(props?.size)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ ...{ color: '#ffff', backgroundColor: '#edebebff' }, ...props?.esError ? {} : {} }}>
                    <p style={{ color: '#ffff', margin: 0, padding: 0 }}>{props?.title}</p>
                </DialogTitle>
                <DialogContent style={{ color: 'black' }}>
                    {props?.children}
                </DialogContent>
                <DialogActions style={{ ...{ color: '#344767' }, ...props?.esError ? { borderTop: 'solid 4px red' } : {} }}>
                    <Button onClick={props?.handleClose} autoFocus style={{ color: '#344767' }}>
                        {props?.titleBoton ? props?.titleBoton : intl.formatMessage({ id: "general.aceptar" })}
                    </Button>
                </DialogActions>
                <Backdrop style={{ zIndex: 1000, color: "#fff" }} open={props?.procesando || false}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Dialog>
        </>
    );
};

export default ModalComponent;