import axios from './config'
import env from "react-dotenv";

export const SET_USER = "@SET_USER";
export const RESET_STATE = "@RESET_STATE";

export const setUser = (user: any) => {
    return {
        type: SET_USER,
        value: user,
    };
};

export const resetState = () => {
    return {
        type: RESET_STATE,
    };
};

export const getDataGrid = async (): Promise<any> => {
    try {
        const response: any = await axios.get(
             `${env.API_URL}${"example-assets/olympic-winners.json"}`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};