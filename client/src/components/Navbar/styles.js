import { deepPurple } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 50px',
    },
    heading: {
      color: "blueviolet",
      textDecoration: 'none',
      fontSize: '2em',
      fontWeight: 300,
    },
    image: {
      marginLeft: '10px',
      marginTop: '5px',
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
      alignItems: 'center',
    },
    logout: {
      marginLeft: '20px',
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
    },
    brandContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    purple: {
      backgroundColor: deepPurple[500],
    },
  }));