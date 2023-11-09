import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: 1
        },
    },
    paper: {
        padding: 10,
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    input:{
        margin:10
    },
    fileInput: {
        width: '97%',
        margin: 10,
    },
    buttonSubmit: {
        marginBottom: 10,
    },
}));