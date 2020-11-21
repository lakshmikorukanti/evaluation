import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Edit from '../Components/Edit';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '50px'
    },
    paper: {
        padding: '10px',
        width: '100%'
    },
    control: {
        padding: theme.spacing(2)
    },
    link: {
        textDecoration: 'none'
    }
}));

export default function PollingStations(props) {
    const id = props.match.params.id;
    const [ status, setStatus ] = useState(false);
    const classes = useStyles();
    const [ data, setData ] = useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/patients/Id?id=${id}`)
            .then((res) => {
                setData([ res.data ]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const handleDelete = (id) => {
        console.log(id);
        data[0].medicins = data[0].medicins.filter((a) => a._id != id);
        setData([ ...data ]);
    };
    const handleAddPage = () => {
        setStatus(!status);
    };
    const handleAdd = (name, quantity) => {
        setStatus(!status);
        data[0].medicins.push({ name: name, quantity: quantity });
        setData([ ...data ]);
    };
    console.log(data, data.length);
    return (
        <Grid container className={classes.root} spacing={2} justify="center">
            <h1>Patient Details</h1>

            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    <Grid item container lg={6}>
                        <Paper className={classes.paper}>
                            {data.length != 0 ? (
                                <Grid>
                                    <h3>Name:{data[0].name}</h3>
                                    <h3>Age:{data[0].age}</h3>
                                    <h3>Gender:{data[0].gender}</h3>
                                    <h3>No of Medicins:{data[0].noOfmedicins}</h3>
                                    {data.length > 0 ? (
                                        data[0].medicins.map((a) => (
                                            <Grid>
                                                <h5>name:{a.name}</h5>
                                                <h5>quantity:{a.quantity}</h5>

                                                <button onClick={() => handleDelete(a._id)}>delete</button>
                                            </Grid>
                                        ))
                                    ) : null}
                                </Grid>
                            ) : null}
                            <button onClick={handleAddPage}>Add new Medicine</button>
                            {status == true ? <Edit handleAdd={handleAdd} /> : null}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Link to={'/Home'} className={classes.link}>
                <Button variant="contained" color="secondary">
                    Go Back
                </Button>
            </Link>
        </Grid>
    );
}
