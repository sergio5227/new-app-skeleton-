import { Grid, Button, Container } from "@mui/material";
import useDashboard from "./useDashboard";
import ModalConfirm from "../../components/ModalConfirm/ModalConfirm";
import ModalComponent from "../../components/Modal";
import DinamicTableMejorada from "../../components/DinamicTableMejorada/DinamicTableMejorada";
import AccionesTabla from "./acionesTabla/accionesTabla";

const Dashboard = () => {

    const {
        ExpandedComponent,
        reset,
        intl,
        openModal,
        setOpenModal,
        openModalConfirm,
        setOpenModalConfirm,
        data
    } = useDashboard();

    return (
        <Grid container spacing={2}>
            <Container>
                <Grid container spacing={2} style={{ textAlign: 'center' }} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                    <Grid size={{ xs: 6, md: 8, xl: 12 }} >
                        {intl.formatMessage({ id: "general.dashboard" })}
                    </Grid>
                    <Grid size={{ xl: 12 }}>
                        {data?.length ?
                            <DinamicTableMejorada
                                flex
                                esResponsive
                                esExpandible
                                showCheckBox
                                actions={<AccionesTabla />}
                                enCheckBox={(d) => console.log(d)}
                                ExpandedComponent={<ExpandedComponent />}
                                data={data}
                            gruupColumns={
                                [
                                    {
                                        headerName: 'Name & Country',
                                        children: [{ field: "athlete" }, { field: "country" }],
                                    },
                                    {
                                        headerName: 'Results',
                                        children: [
                                            { columnGroupShow: "closed", field: "total" },
                                            { columnGroupShow: "open", field: "gold" },
                                            { columnGroupShow: "open", field: "silver" },
                                            { columnGroupShow: "open", field: "bronze" },
                                        ],
                                    },
                                ]
                            }
                            /> : null}
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, xl: 6 }}>
                        <Button onClick={() => setOpenModalConfirm(true)} variant="text">Modal confirm</Button>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, xl: 6 }}>
                        <Button onClick={() => setOpenModal(true)} variant="text">Modal</Button>
                    </Grid>
                    <Grid size={{ xl: 12 }}>
                        <Button onClick={() => reset()} variant="text">{intl.formatMessage({ id: "general.salir" })}</Button>
                    </Grid>
                </Grid>
            </Container>
            <ModalComponent
                title="Modal"
                handleClose={() => setOpenModal(false)}
                isOpen={openModal}
            >
                <>Child</>
            </ModalComponent>
            <ModalConfirm esConComentarios onAcept={(t) => {
                setOpenModalConfirm(false);
                console.log('confirm', t)
            }} onCancel={() => {
                setOpenModalConfirm(false);

            }} open={openModalConfirm} text={'Texto modal confirm'} title={''} />
        </Grid>
    )
}

export default Dashboard;