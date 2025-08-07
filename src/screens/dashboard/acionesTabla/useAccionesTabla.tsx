import { useState } from "react";

const useAccionesTabla = () => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const enAccion = (data: any) => {
        alert(JSON.stringify(data));
    }


    return {
        anchorEl,
        handleClick,
        handleClose,
        enAccion
    }
}

export default useAccionesTabla;