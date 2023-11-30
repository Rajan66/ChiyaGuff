import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    paper: {
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '18px',
    },
    avatar: {
        margin: '2px',
        backgroundColor: "dodgerblue",
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '10px',
    },
}));