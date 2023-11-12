import { deepPurple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
    appbar: {
        flexDirection:'row',    
        borderRadius:15,
        margin:'10px 0 30px',
        display:'flex',
        justifyContent:'space-between',
        padding:'10px 50px',
        alignItems:'center',
    },
    heading: {
        color: 'rgba(0,183,255, 1)',
        textDecoration: 'none',
    },
    image: {
        marginLeft: '15px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '400px',
    },
    profile: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '400px',
    },
    username: {
        display: 'flex',
        alignItems: 'center',
    },
    brandContainer: {
        display:'flex',
        alignItems:'center',
    }
}));