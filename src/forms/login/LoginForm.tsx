import { Grid } from "@mui/material";
import { FormikProvider } from "formik";
import { Button, Form } from "react-bootstrap";
import InputField from "../../components/InputField";
import useLoginForm from "./useLoginForm";
import { LoginFormProps } from "./types";
import SelectMultipleAutoCompleteField from "../../components/SelectMultipleAutoCompleteField/SelectMultipleAutoCompleteField";
import DragAndDropField from "../../components/DragAndDropField";
import env from "react-dotenv";
import React, { Suspense, lazy, useState } from "react";
const SmartLocationInput = lazy<React.ComponentType<any>>(() => import("../../components/CampoAutoCompleteCoordenadas/SmartLocationInput"));

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
                                        name="piso"
                                        id="piso"
                                        required
                                        isMulti
                                        onInput={(e: any) => {
                                            formik.setFieldValue("piso", e);
                                        }}
                                        formik={formik?.getFieldMeta("piso")}
                                    />
                                    <br />
                                </Grid>
                                <Suspense fallback={
                                    <div style={{
                                        width: '100%', minHeight: '50px',
                                        background: 'white',
                                        border: '1px solid #e5e6e9',
                                        borderRadius: '5px',
                                        padding: '1rem',
                                        margin: '0 auto',
                                    }}>Cargando componente...</div>
                                }>
                                    <SmartLocationInput value={location} apiKey={env.GOOGLE_API_KEY} enAccion={(d: any) => {
                                        setLocation(d?.address);
                                    }} />
                                </Suspense>
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