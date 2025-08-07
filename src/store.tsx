import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers/appReducer';

const saveState = (state: any) => {
    try {
        localStorage.setItem('reduxState', JSON.stringify(state) );
    } catch (error) {
        console.log(error);
    }   
}

const loadState = () => {
    try {
        const serizedState = localStorage.getItem('reduxState');
        return serizedState ? JSON.parse(serizedState) : undefined;
    } catch (error) {
        return undefined;
    }
}

const preloadedState = loadState();

const store = configureStore({
    reducer:rootReducer,
    preloadedState,
    devTools:true
});

store.subscribe(()=> {
    saveState(store.getState());
});

export default store;