import axios from './config'

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
            `https://www.ag-grid.com/example-assets/olympic-winners.json`,
        );
        return response?.data || [];
    } catch (error) {
        const promise = new Promise((_, reject) => reject(error));
        return promise;
    }
};