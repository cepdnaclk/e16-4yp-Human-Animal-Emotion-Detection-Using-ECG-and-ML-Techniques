import { React } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, Typography, Link } from '@material-ui/core/';

const useStyle = makeStyles((theme) => ({

    header: {
        flexGrow: 1,
    },
    bar: {
        background: '#051726'
    },
    title: {
        flexGrow: 1,
        color: "#AEB7BF",
        display: 'none',
        fontSize: 25,
        fontWeight: "bolder",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    login: {
        margin: 20,
        fontWeight: "bolder",
        [theme.breakpoints.down('sm')]: {
            padding: 5,
        },
        background: "#AEB7BF",
        /*color: '#AEB7BF'*/
    },
    search: {
        position: 'relative',
        borderRadius: 20,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchicon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: "#AEB7BF"
    },
    inputRoot: {
        color: 'inherit',
    },
    avatar: {
        marginRight: 20,
        background: "#164773",
    },
    user: {
        margin: 25
    },
    gh: {
        color: "white",
        margin: 15,
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch',
            },
        },
    },
}));

export default function HeaderBar() {
    const classes = useStyle();
    return (
            <div className={classes.header}>
                <AppBar position='static' >
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Data Collector
                        </Typography>
                        <Link href="/">
                            <Button variant="contained" className={classes.login} >Register</Button>
                        </Link>
                        <Link href="/videos">
                            <Button variant="contained" className={classes.login} >Select Videos</Button>
                        </Link>
                        {/*<Link href="/play">
                            <Button variant="contained" className={classes.login} >Play</Button>
                        </Link>
                        <Link href="/feedback">
                            <Button variant="contained" className={classes.login} >Feedback</Button>
                        </Link>*/}
                    </Toolbar>
                </AppBar>
            </div>
    );

}