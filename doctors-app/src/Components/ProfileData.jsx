import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '10px',
        width: '100%',
        height: '100%'
    }
}));
const ProfileData = () => {
    const classes = useStyles();
    const { email } = useSelector((state) => state.auth);
    const [ data, setData ] = useState([]);
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/user/getData',
            data: {
                email
            }
        }).then((res) => setData(res.data.data));
    }, []);
    console.log(data);
    return (
        <Grid>
            <Grid container justify="center" spacing={2}>
                {data.length > 0 ? (
                    data.map((value) => (
                        <Grid key={value._id} item lg={4} justify="center" spacing={5} style={{ margin: '10px' }}>
                            <Paper className={classes.paper}>
                                <h3>Name:{value[0].name}</h3>
                                <h3>Age:{value[0].age}</h3>
                                <h3>Gender:{value[0].gender}</h3>
                                <h3>No of Medicins:{value[0].noOfmedicins}</h3>
                                {value[0].medicins.map((a) => (
                                    <Grid>
                                        <h3>Medicine Name:{a.name}</h3>
                                        <h3>Quantity:{a.quantity}</h3>
                                    </Grid>
                                ))}
                            </Paper>
                        </Grid>
                    ))
                ) : null}
            </Grid>
        </Grid>
    );
};

export default ProfileData;
