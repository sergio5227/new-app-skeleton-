import { useDispatch } from "react-redux"
import { setUser } from "../../actions/auth";
import { useIntl } from "react-intl";

const useLogin = () => {
    const intl = useIntl();
    const dispatch = useDispatch();

    const login = (l: { usuario: string }) => {
        dispatch(setUser({ id: 1, token: 'sdflkjasjflksnjfl', usuario: l?.usuario }))
    }

    return {
        intl,
        login
    }
}

export default useLogin;