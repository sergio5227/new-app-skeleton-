import React from 'react'
import { Grid } from "@mui/material";
import { AgGridReact } from 'ag-grid-react';
import { DinamicTableMejoradaProps } from './types';
import useDinamicTableMejorada from './useDinamicTableMejorada';
import ExpandendComp from './ExpandendComp';
import TarjetasDataGrid from './TarjetasDataGrid';
import './style.css'
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const DinamicTableMejorada: React.FC<DinamicTableMejoradaProps> = (props: DinamicTableMejoradaProps) => {

    const {
        columns,
        showExpandedComponent,
        setShowExpandedComponent,
        localeText,
        isReponsive,
        pagination,
        paginationPageSize,
        paginationPageSizeSelector,
        getRowStyle,
        rowSelection,
        onSelectionChanged
    } = useDinamicTableMejorada(props);

    if (isReponsive && props?.esResponsive) {
        return <TarjetasDataGrid columnsToShow={props?.columnsToShow} rows={props?.data} props={props} />;
    }

    return (
        <Grid container spacing={2} data-testid="dinamic-tabla-mejorada">
            {props?.titulo ? <Grid size={{ xs: 12 }}  >
                <h4 style={{ padding: 14 }} >{props?.titulo}</h4>
            </Grid> : null}
            <Grid size={{ xs: 12 }} className="ag-theme-quartz ag-theme-alpine custom-ag-grid" style={{ minHeight: props?.minHeight ? props?.minHeight : 500 }}><AgGridReact
                    rowData={props?.data}
                    getRowStyle={getRowStyle}
                    rowSelection={props?.showCheckBox ? rowSelection : null}
                    onSelectionChanged={onSelectionChanged}
                    columnDefs={columns}
                    pagination={props?.muestraTodosRegistros ? false : pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    detailRowHeight={150}
                    localeText={localeText}
                    pinnedBottomRowData={props?.footerRowData || null}
                />
            </Grid>
            {
                showExpandedComponent ? <ExpandendComp handleisAlerCloseComentarios={() => setShowExpandedComponent(null)} >{React.cloneElement(props?.ExpandedComponent, showExpandedComponent)}</ExpandendComp> : null
            }
        </Grid>
    )
}

export default DinamicTableMejorada
