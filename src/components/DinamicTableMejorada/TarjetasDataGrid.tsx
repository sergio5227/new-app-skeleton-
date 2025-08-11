import { Backdrop, CircularProgress, Divider, Pagination } from "@mui/material";
import React, { useMemo } from 'react'
import _ from "lodash";
import ExpandendComp from "./ExpandendComp";
import useTarjetasDataGrid from "./useTarjetasDataGrid";
import SearchFiltro from "../../forms/filtroForm/SearchFiltro";

const TarjetasDataGrid = ({ columnsToShow, rows, props }: any) => {

    const {
        intl,
        currentCards,
        setShowExpandedComponent,
        expandendIcon,
        acciones,
        StatusCellRenderer,
        showExpandedComponent,
        totalPages,
        currentPage,
        goToPage,
        procesando,
        handleFiltro
    } = useTarjetasDataGrid(rows, props);


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign:'left' }}>
            {useMemo(() => (<SearchFiltro onFiltro={(w: string) => { handleFiltro(w) }} />), [handleFiltro ])}
            <br></br>
            {
                currentCards?.length ? currentCards.map((row: any) => {
                    const keys = Object.keys(row);
                    const newKeys = columnsToShow ? _.remove(keys, (n) => {
                        return columnsToShow.includes(n);
                    }) : keys;
                    return (
                        <div
                            key={row.id}
                            style={{
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                padding: '10px',
                                backgroundColor: '#fff',
                            }}
                        >
                            {(props?.esExpandible && props?.ExpandedComponent) ?
                                <span style={{fontSize:15}} onClick={(accion) => setShowExpandedComponent(row)}> <strong>{intl.formatMessage({ id: "general.ver.detalle" })}:</strong> {expandendIcon(row)} <br></br> </span> : null
                            }
                            {(props?.esExpandible && props?.ExpandedComponent) ? <br></br> : null}

                            {
                                (props?.actions && !props?.esEntradasSalidas && !props?.esAvanceConGrafica) ?
                                    <> <strong style={{fontSize:15}}>{intl.formatMessage({ id: "general.herramientas" })}:</strong> {acciones(row)} </> : null
                            }
                            {newKeys.map((col: any, key: any) => {
                                const nombreColumna = (col[0].toUpperCase() + col.substring(1)).replaceAll('_', ' ');
                                return (
                                    <div key={key} style={{fontSize:15, margin:0, padding:0}}>
                                        <p style={{fontSize:15, margin:0, padding:0}}><strong>{nombreColumna}:</strong>{StatusCellRenderer(row, col)}</p>
                                        <Divider></Divider>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }) : intl.formatMessage({ id: "general.sin.registros" })
            }
            {/* Seccion del expandible */}
            {
                showExpandedComponent ? <ExpandendComp esFullScreen handleisAlerCloseComentarios={() => setShowExpandedComponent(null)} children={React.cloneElement(props?.ExpandedComponent, showExpandedComponent)} /> : null
            }

            {/* Controles de paginación */}
            <Pagination count={totalPages} page={currentPage} onChange={(page, a) => {
                goToPage(a)
            }} />
            <Backdrop className='BackdropClass' open={procesando}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default TarjetasDataGrid;
