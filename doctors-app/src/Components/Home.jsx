import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logoutUser } from '../redux/auth/actions';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: '10px'
    },
    paper: {
        padding: '20px 20px 20px 20px',
        width: '90%',
        paddingBottom: '60px',
        borderRadius: '15px',
        background: '#fafdff',
        alignItems: 'center',
        boxShadow: '20px 20px 64px #dadcde ,-20px -20px 64px #ffffff'
    },
    control: {
        padding: theme.spacing(2)
    },
    button: {
        width: '60%',
        height: '40px',
        marginLeft: '-100px',
        marginTop: '10px'
    },
    mainGrid: {
        marginTop: '40px',
        marginBottom: '40px'
    },
    formControl: {
        width: '100%'
    },
    link: {
        textDecoration: 'none'
    }
}));
export default function Home(props) {
    const [ data, setdata ] = useState([]);
    const [ temp, setTemp ] = useState([]);
    const { isAuth, error } = useSelector((state) => state.auth);
    const [ params, setParams ] = useState({ name: '', age: '', gender: '', page: 1, perPage: 6 });
    const classes = useStyles();
    const dispatch = useDispatch();
    let totalPages = Math.ceil(temp.length / params.perPage);
    const array = new Array(totalPages).fill(0);
    console.log(totalPages, array);
    useEffect(
        () => {
            axios.get('http://localhost:5000/api/patients').then((res) => setTemp(res.data.data));
            axios
                .get(
                    `http://localhost:5000/api/patients?page=${params.page}&limit=${params.perPage}&age=${params.age}&gender=${params.gender}&name=${params.name}`
                )
                .then((res) => setdata(res.data.data));
        },
        [ params.name, params.page, params.perPage, params.age, params.gender, isAuth ]
    );
    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const handleLogout = (e) => {
        dispatch(logoutUser(e));
    };
    console.log(data, params);
    if (!isAuth) {
        return <Redirect to="/" />;
    } else {
        return (
            <Grid container className={classes.root} spacing={2} justify="center">
                <Grid item container lg={12}>
                    <Grid item container lg={11} />
                    <Grid item container lg={1}>
                        <Button variant="contained" color="secondary" onClick={handleLogout}>
                            LOGOUT
                        </Button>
                    </Grid>
                </Grid>
                <Grid item container lg={12} className={classes.mainGrid}>
                    <Grid item container lg={4}>
                        <Grid item container lg={12}>
                            <Grid item container lg={4}>
                                <h4>Patient Name:</h4>
                            </Grid>
                            <Grid item container lg={8}>
                                <TextField
                                    id="outlined-password-input"
                                    label="name"
                                    name="name"
                                    value={params.name}
                                    type="text"
                                    autoComplete="current-password"
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container lg={6}>
                        <Grid item container lg={6}>
                            <Grid container item lg={4} sm={2} xs={2}>
                                <h4>Sort by Age:</h4>
                            </Grid>
                            <Grid container item lg={8} sm={5} xs={10}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        name="age"
                                        onChange={handleChange}
                                        label="age"
                                        value={params.age}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        <MenuItem value="asc">Ascending Order</MenuItem>
                                        <MenuItem value="desc">Descending Order</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid item container lg={1} />
                        <Grid item container lg={5}>
                            <Grid container item lg={2} sm={2} xs={2}>
                                <h4>Gender:</h4>
                            </Grid>
                            <Grid item container lg={1} />
                            <Grid container item lg={8} sm={5} xs={10}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        name="gender"
                                        onChange={handleChange}
                                        label="gender"
                                        value={params.gender}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="center" spacing={2}>
                        {data.length > 0 ? (
                            data.map((value) => (
                                <Grid key={value._id} item lg={4} justify="center">
                                    <Paper className={classes.paper}>
                                        <h3>Name:{value.name}</h3>
                                        <h3>Age:{value.age}</h3>
                                        <h3>Gender:{value.gender}</h3>
                                        <h3>No of Medicins:{value.noOfmedicins}</h3>
                                        <Link to={`Home/${value._id}`} className={classes.link}>
                                            <Button variant="contained" color="secondary">
                                                More Details
                                            </Button>
                                        </Link>
                                    </Paper>
                                </Grid>
                            ))
                        ) : null}
                    </Grid>
                    <Grid item container lg={12} justify="center">
                        {array.map((a, index) => (
                            <Button
                                className={classes.mainGrid}
                                key={index}
                                value={index + 1}
                                variant="contained"
                                style={{ marginLeft: '10px' }}
                                color="secondary"
                                onClick={(e) => setParams({ ...params, page: index + 1 })}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}
