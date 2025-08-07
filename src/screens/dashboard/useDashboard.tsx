import { useDispatch } from "react-redux"
import { getDataGrid, resetState } from "../../actions/auth";
import { useIntl } from "react-intl";
import { useCallback, useEffect, useState } from "react";

const useDashboard = () => {
    const intl = useIntl();
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
            <div>
                {
                    JSON.stringify(row)
                }
            </div>
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
        data
    }
}

export default useDashboard;