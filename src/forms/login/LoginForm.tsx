import { Grid } from "@mui/material";
import { FormikProvider } from "formik";
import { Button, Form } from "react-bootstrap";
import InputField from "../../components/InputField";
import useLoginForm from "./useLoginForm";
import { LoginFormProps } from "./types";
import SelectMultipleAutoCompleteField from "../../components/SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField";
import DragAndDropField from "../../components/DragAndDropField";
import SmartLocationInput from "../../components/CampoAutoCompleteCoordenadas/SmartLocationInput";
import { useState } from "react";

const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {

    const { intl, formik } = useLoginForm(props)
    const [location, setLocation] = useState('')

    return (
        <Grid container spacing={2}>
            <Grid size={{ md: 12 }}>
                <Grid
                    size={{ md: 12 }}
                    style={{ backgroundColor: "#fff", padding: "10px" }}
                >
                    <FormikProvider value={formik}>
                        <Form.Group className="mb-3 ">
                            <Grid container spacing={2}>
                                <Grid size={{ md: 12 }}>
                                    <InputField
                                        required
                                        value={formik.values.usuario || ""}
                                        name="usuario"
                                        onInput={(e: any) => {
                                            const target = e.target as HTMLTextAreaElement;
                                            formik.setFieldValue("usuario", target?.value || "");
                                        }}
                                        placeholder={intl.formatMessage({ id: "input.usuario.placeholder" })}
                                        label={intl.formatMessage({ id: "input.usuario" })}
                                        type="text"
                                        id="usuario"
                                        formik={formik?.getFieldMeta("usuario")}
                                    />
                                    <br />
                                </Grid>
                                <Grid size={{ md: 12 }}>
                                    <SelectMultipleAutoCompleteField
                                        label={intl.formatMessage({
                                            id: "input.piso",
                                        })}
                                        placeholder={intl.formatMessage({
                                            id: "input.piso.placeholder",
                                        })}
                                        defaultValue={formik.values.piso}
                                        options={[
                                            {
                                                label: 'piso 1',
                                                value: 1
                                            },
                                            {
                                                label: 'piso 2',
                                                value: 2
                                            }
                                        ]}
                                    /* 
                                        btnPlus
                                        onAdd={() => {
                                            //handleisAlertOpenPiso();
                                        }} 
                                    */
                                        name="piso"
                                        id="piso"
                                        required
                                        isMulti
                                        onInput={(e: any) => {
                                            formik.setFieldValue("piso", e);
                                            //setPiso(e);
                                        }}
                                        formik={formik?.getFieldMeta("piso")}
                                    />
                                    <br />
                                </Grid>
                                <>
                                    <SmartLocationInput value={location} apiKey={'AIzaSyANkBT5FmnbJhZPrPHYYhGHuS4KocaL3x8'} enAccion={(d: any) => {
                                        setLocation(d?.address);
                                    }} />
                                </>
                                <Grid size={{ md: 12 }}>
                                    <DragAndDropField acepted={{
                                        "image/jpeg": [],
                                        "image/jpg": [],
                                        "image/png": [],
                                        "video/*": [],
                                    }} multiple={false} muestraBoton={false} onAction={(files: any) => console.log(files)} />
                                </Grid>
                                <Grid size={{ md: 12 }}>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={
                                            props?.procesando || !formik.dirty || !formik.isValid
                                        }
                                        onClick={(e: any) => {
                                            props?.onAccion(formik.values);
                                        }}
                                    >
                                        {intl.formatMessage({ id: "general.aceptar" })}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form.Group>
                    </FormikProvider>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default LoginForm