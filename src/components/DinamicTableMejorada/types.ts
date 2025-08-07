
export interface DinamicTableMejoradaProps {
    flex?:boolean
    data:any
    columnsToShow?:any
    pinned?:any[]
    titulo?: string;
    actions?: any;
    esExpandible?:boolean
    ExpandedComponent?:any
    muestraTodosRegistros?:boolean
    sinFiltro?:boolean
    minHeight?:number
    footerRowData?:any
    esResponsive?:boolean
    gruupColumns?:any
    showCheckBox?:boolean
    enCheckBox?:(rows:any)=>void
}