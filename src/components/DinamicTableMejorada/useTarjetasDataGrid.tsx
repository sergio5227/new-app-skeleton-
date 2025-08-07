import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import _ from "lodash";
import { useIntl } from "react-intl";

const useTarjetasDataGrid = (rows: any, props: any) => {

    const intl = useIntl();

    const [procesando, setProcesando] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const cardsPerPage = 2;

    let indexOfLastCard = currentPage * cardsPerPage;
    let indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const [currentCards, setCurrentCards] = useState(rows.slice(indexOfFirstCard, indexOfLastCard))

    useEffect(() => {
        setProcesando(true)
        setTimeout(() => {
            setCurrentCards(rows.slice(indexOfFirstCard, indexOfLastCard))
            setProcesando(false)
        }, 1000);
    }, [currentPage, indexOfFirstCard, indexOfLastCard, rows])

    const [totalPages, setTotalPages] = useState(Math.ceil(rows.length / cardsPerPage));

    const goToPage = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    const [showExpandedComponent, setShowExpandedComponent] = useState(null);

    const StatusCellRenderer = (row: any, dta: any) => {
        return tool(row, dta)
    };

    const tool = (row: any, x: any) => {
        let text = (row?.[x] || "");
        return (
            <Tooltip
                title={text}>
                <p style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word', paddingTop: 0, paddingBottom: 0, margin: 0 }} >
                    {text}
                </p>
            </Tooltip>
        );
    };

    const acciones = (row: any) => {
        if ((row?.id || '') === "Totales" || props?.esEntradasSalidas) {
            return <></>
        }
        return <></>
    };

    const expandendIcon = (row_: any) => {
        const row = row_?.data;
        return (
            <ArrowForwardIosIcon
                style={{ cursor: 'pointer' }}
                onClick={(accion) => setShowExpandedComponent(row)}
            />
        )
    }

    const handleFiltro = (textoFiltrar: string) => {
        const text_ = textoFiltrar.toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');
        const columnsNames = Object.keys((rows || [])?.[0]);
        const columnsToFilter = columnsNames.filter(e => (!e.includes('id') && !e.includes('fecha') && !e.includes('estatus')));
        const clonData = Object.assign([], (rows || []).map((e: any) => {
            return e;
        }));

        if (_.isEmpty(text_)) {
            setCurrentPage(1);
            indexOfLastCard = 1 * cardsPerPage;
            indexOfFirstCard = indexOfLastCard - cardsPerPage;
            setCurrentCards(rows.slice(indexOfFirstCard, indexOfLastCard))
            setTotalPages(Math.ceil(rows.length / cardsPerPage))
            return;
        }

        const test = clonData.filter((c: any) => {
            let bandera = 0;
            columnsToFilter.forEach(element => {
                bandera += (typeof c?.[element] !== 'string') ? 0 : (c?.[element]).toLowerCase().replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u').includes(text_.trim()) ? 1 : 0;
            });
            return bandera > 0;
        })
        setCurrentPage(1);
        indexOfLastCard = 1 * cardsPerPage;
        indexOfFirstCard = indexOfLastCard - cardsPerPage;
        setCurrentCards(test.slice(indexOfFirstCard, indexOfLastCard))
        setTotalPages(Math.ceil(test.length / cardsPerPage))
    };

    return {
        intl,
        handleFiltro,
        currentCards,
        setShowExpandedComponent,
        expandendIcon,
        acciones,
        StatusCellRenderer,
        showExpandedComponent,
        totalPages,
        currentPage,
        goToPage,
        procesando
    }
}

export default useTarjetasDataGrid;