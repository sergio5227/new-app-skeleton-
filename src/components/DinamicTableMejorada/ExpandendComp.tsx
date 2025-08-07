import React from 'react'
import ModalComponent from '../Modal/index';
import { Grid } from '@mui/material';

interface ExpandendCompProps {
    handleisAlerCloseComentarios: () => void
    children: any
    esFullScreen?: boolean
}

const ExpandendComp: React.FC<ExpandendCompProps> = (props: ExpandendCompProps) => {
    return (
        <ModalComponent handleClose={() => props?.handleisAlerCloseComentarios()} isOpen={true} key={'expandend_'} size="xl" esFullScreen={props?.esFullScreen}>
            <Grid container spacing={2} style={{ textAlign: 'center' }}>
                <Grid size={{ xs: 12 }}></Grid>
                <Grid size={{ xs: 12 }}></Grid>
                <Grid size={{ xs: 12 }}>
                    {props?.children}
                </Grid>
            </Grid>
        </ModalComponent>
    )
}

export default ExpandendComp
