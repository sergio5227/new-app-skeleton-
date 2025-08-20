import { useDispatch } from "react-redux"
import { getDataGrid, resetState } from "../../actions/auth";
import { useIntl } from "react-intl";
import { useCallback, useContext, useEffect, useState } from "react";
import { perfilContext } from "src/contexts/PerfilContext";
import AIComponent from "src/components/AIComponent/AIComponent";

const useDashboard = () => {
    const intl = useIntl();
    const token = useContext(perfilContext);
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [data, setData] = useState([]);

    const reset = () => {
        dispatch(resetState())
    }

    const getData = useCallback(async () => {
        try {
            const res = await getDataGrid();
            console.log('res', res)
            setData(res)
        } catch (error) {
            console.log('error', error)
        }
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const ExpandedComponent = (datos_expandible: any) => {
        const row = datos_expandible;
        return (
            <>
                <AIComponent
                    procesando={false}
                    envarFoto={(d: any, user: string) => console.log(d, user)}
                    envarFotos={(d: any, user: string) => console.log(d, user)}
                    envarVoz={(d: any, user: string) => console.log(d, user)}
                    envarVoces={(d: any, user: string) => console.log(d, user)}
                    maxPhotosAllowed={11}
                    maxRecordingsAllowed={12}
                />
                {
                    JSON.stringify(row)
                }
            </>
        )
    }

    return {
        ExpandedComponent,
        intl,
        reset,
        openModal,
        setOpenModal,
        openModalConfirm,
        setOpenModalConfirm,
        data,
        token
    }
}

export default useDashboard;