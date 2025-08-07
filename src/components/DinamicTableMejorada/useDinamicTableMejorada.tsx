import { useMemo, useState } from 'react'
import { DinamicTableMejoradaProps } from './types';
import { Tooltip } from "@mui/material";
import _ from 'lodash';
import { useResponsive } from '../../hooks/useResponsive';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useIntl } from 'react-intl';
import React from 'react';

const useDinamicTableMejorada = (props: DinamicTableMejoradaProps) => {

    const intl = useIntl();

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [10, 20, 1000];

    const isReponsive = useResponsive();

    const [data] = useState<any[]>((props?.data || []).map((e: any) => e));

    const [showExpandedComponent, setShowExpandedComponent] = useState(null);

    const filteredItems = (props?.data || []).map((e: any) => e);

    const keys = Object.keys(filteredItems?.[0]);

    const newKeys = props?.columnsToShow ? _.remove(keys, (n) => {
        return props?.columnsToShow.includes(n);
    }) : keys;

    const columns: any = props?.gruupColumns ? props?.gruupColumns : newKeys.map((dta) => {
        const esPinned = (props?.pinned || []).find(er => er?.columna === dta);
        const nombreColumna = (dta[0].toUpperCase() + dta.substring(1)).replaceAll('_', ' ');
        return {
            ...{
                filter: props?.sinFiltro ? false : true,
                autoHeight: true,
                field: dta,
                headerName: nombreColumna,
                cellRenderer: (row: any) => StatusCellRenderer(row)
            }, ...esPinned ? { pinned: esPinned?.lado, width: 150 } : {},
            ...props?.flex ? { flex: 1 } : {}
        };
    });

    const StatusCellRenderer = (row: any) => {
        return tool(row)
    };

    const tool = (row_: any) => {
        const row = row_?.data;
        const x = row_?.colDef?.field;
        let text = (row?.[x] || "");
        return (
            <Tooltip
                title={text}>
                <p style={{ whiteSpace: 'normal', overflowWrap: 'break-word', wordBreak: 'keep-all', wordWrap: 'break-word' }} >
                    {text}
                </p>
            </Tooltip>
        );
    };

    const acciones = (row_: any) => {
        const row = row_?.data;
        if ((row?.id || '') === "Totales") {
            return <></>
        }
        return React.cloneElement(props?.actions, row)
    };

    const searchInObject = (obj: any, word: any) => {
        for (const key in obj) {
            if (typeof obj[key] === "object" && obj[key] !== null) {
                if (searchInObject(obj[key], word)) return true;
            } else if (typeof obj[key] === "string" && obj[key].includes(word)) {
                return true;
            }
        }
        return false;
    }

    const searchWordInObjects = (array: any, word: any) => {
        const result: any = [];
        array.forEach((obj: any, index: any) => {
            if (searchInObject(obj, word)) {
                result.push({ index, obj });
            }
        });
        return result;
    }

    if (props?.actions) {
        columns.unshift(
            {
                width: 100,
                field: 'Herramientas',
                headerName: intl.formatMessage({ id: "general.herramientas" }),
                cellRenderer: (row: any, dta: any) => {
                    const results = searchWordInObjects([row?.data], "Total");
                    return !results?.length ? acciones(row) : null
                },
                pinned: 'left'
            }

        );
    }

    const localeText = {
        // General
        page: intl.formatMessage({ id: "general.pagina" }),
        more: intl.formatMessage({ id: "general.mas" }),
        to: intl.formatMessage({ id: "general.table.a" }),
        of: intl.formatMessage({ id: "general.table.de" }),
        next: intl.formatMessage({ id: "general.siguiente" }),
        last: intl.formatMessage({ id: "general.ultimo" }),
        first: intl.formatMessage({ id: "general.primero" }),
        previous: intl.formatMessage({ id: "general.anterior" }),
        loadingOoo: intl.formatMessage({ id: "general.cargando" }),
        // Filtros de columna
        selectAll: intl.formatMessage({ id: "general.seleccionar.todo" }),
        searchOoo: intl.formatMessage({ id: "general.buscando" }),
        blanks: intl.formatMessage({ id: "general.en.blanco" }),
        filterOoo: intl.formatMessage({ id: "general.filtrar" }),
        // Filtro de texto
        equals: intl.formatMessage({ id: "general.igual" }),
        notEqual: intl.formatMessage({ id: "general.diferente" }),
        contains: intl.formatMessage({ id: "general.contiene" }),
        notContains: intl.formatMessage({ id: "general.no.contiene" }),
        startsWith: intl.formatMessage({ id: "general.empieza.con" }),
        endsWith: intl.formatMessage({ id: "general.termina.con" }),
        // Paginación
        pageSize: intl.formatMessage({ id: "general.tamano.pagina" }),
        // Botones
        applyFilter: intl.formatMessage({ id: "general.aplicar.filtro" }),
        resetFilter: intl.formatMessage({ id: "general.restablecer.filtro" }),
        clearFilter: intl.formatMessage({ id: "general.borrar.filtro" }),
        // Otros
        noRowsToShow: intl.formatMessage({ id: "general.sin.datos.mostrar" }),
        pinColumn: intl.formatMessage({ id: "general.fijar.columna" }),
        autosizeThiscolumn: intl.formatMessage({ id: "general.ajustar.esta.columna" }),
        autosizeAllColumns: intl.formatMessage({ id: "general.ajustar.todas.columnas" }),
        resetColumns: intl.formatMessage({ id: "general.restablecer.columnas" }),
        blank: intl.formatMessage({ id: "general.vacio" }),
        notBlank: intl.formatMessage({ id: "general.no.vacio" }),
    };

    const getRowStyle = (params: any) => {
        if (params.node?.data?.selected) {
            return { background: '#68aad4' };
        }
    };

    const expandendIcon = (row_: any) => {
        const row = row_?.data;
        return (
            <ArrowForwardIosIcon
                style={{ cursor: 'pointer' }}
                onClick={() => setShowExpandedComponent(row)}
            />
        )
    }

    if (props?.esExpandible && props?.ExpandedComponent) {
        columns.unshift(
            {
                width: 90,
                field: 'ver_mas',
                headerName: intl.formatMessage({ id: "general.detalle" }),
                cellRenderer: (row: any) => {
                    return expandendIcon(row)
                },
                pinned: 'left'
            }
        );
    }

    const onSelectionChanged = (event: any) => {
        const selectedNodes = event.api.getSelectedNodes();
        const selectedData = selectedNodes.map((node: any) => node.data);
        props?.enCheckBox && props?.enCheckBox(selectedData);
    };

    const rowSelection: any = useMemo(() => {
        return {
            mode: 'multiRow'
        };
    }, []);


    return {
        columns,
        showExpandedComponent,
        setShowExpandedComponent,
        localeText,
        data,
        isReponsive,
        pagination,
        paginationPageSize,
        paginationPageSizeSelector,
        getRowStyle,
        //onFirstDataRendered,
        onSelectionChanged,
        rowSelection
    }
}

export default useDinamicTableMejorada
