import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import DehazeIcon from '@mui/icons-material/Dehaze';
import useAccionesTabla from "./useAccionesTabla";


const AccionesTabla = (props:any) => {

    const { 
        anchorEl,
        handleClick,
        handleClose,
        enAccion
    } = useAccionesTabla();

    return (<>
        <Button
            size="small"
            type="button"
            variant="contained"
            color="primary"
            onClick={handleClick}
            style={{ color: 'white' }}
        >
            <DehazeIcon />
        </Button>
        <Menu
            id="simple-menu-user-options"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => handleClose()}
        >
            <MenuItem onClick={() => enAccion(props)}>
                <IconButton aria-label={''} size="small" style={{ color: 'rgb(31, 40, 62)' }}>
                    <RecentActorsIcon />
                </IconButton>
            </MenuItem>
        </Menu>
    </>)
}

export default AccionesTabla;