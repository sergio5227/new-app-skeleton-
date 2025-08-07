import { Card, CardContent, Container, Grid } from "@mui/material";
import useLogin from "./useLogin";
import LoginForm from "../../forms/login/LoginForm";

const Login = () => {

    const { login, intl } = useLogin();

    return (
        <Grid container spacing={2} >
            <Container style={{ marginTop: 100}}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} style={{ textAlign: 'center' }} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
                            <Grid size={{ xs: 6, md: 8, xl: 8 }} >
                                {intl.formatMessage({ id: "general.login" })}
                            </Grid>
                            <Grid size={{ md: 12 }}>
                                <LoginForm
                                    //item={{ usuario: 'juan' }}
                                    procesando={false}
                                    onAccion={(l) => {
                                        login(l)
                                    }} />
                            </Grid>
                        </Grid>

                    </CardContent>
                </Card>
            </Container>
        </Grid>
    )
}

export default Login;