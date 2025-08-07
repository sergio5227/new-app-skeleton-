export interface LoginFormProps {
    procesando:boolean
    onAccion:(data:any)=>void
    item?:{usuario:string}
}