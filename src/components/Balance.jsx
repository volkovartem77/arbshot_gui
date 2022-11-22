import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {getKey} from "../utils";
import {hostIP} from "../server_adress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: 5,
    },
    title: {
        color: "#5a5a82",
        fontSize:'0.9em'
    },
    title2: {
        color: "rgba(90,90,130,0.43)",
        fontSize:'0.8em'
    },
    divider: {
        margin: 8
    },
    divider2: {
        margin: 8,
    },
    listItemText:{
        fontSize:'1.0em',
        color: "gray"
        // paddingTop: 15
    },
}));

function BalancePaper(props) {
    const classes = useStyles();
    const {balance} = props

    return (
        <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className={classes.listItemText}>
                        Balance
                    </div>
                </Grid>
            </Grid>
            <Divider className={classes.divider}/>
            {
                Object.entries(balance.balance).map(
                    ( [key, value] ) => (
                        key!=="BTC(USDT)"?
                            <BalanceItem
                                asset={key}
                                amount={Number(value).toFixed(8)}
                                key={getKey()}
                            />:<div key={getKey()}/>
                    ))
            }
            <Divider className={classes.divider2}/>
            {
                Object.entries(balance.balance).map(
                    ( [key, value] ) => (
                        key==="BTC(USDT)"?
                            <BalanceItemSmall
                                asset={key}
                                amount={Number(value).toFixed(8)}
                                key={getKey()}
                            />:<div key={getKey()}/>
                    ))
            }
        </Paper>
    )
}

function BalanceItem(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid container item justifyContent="flex-start" xs={6} spacing={0}>
                <Typography variant="h6" className={classes.title}>
                    {props.asset}
                </Typography>
            </Grid>
            <Grid container item justifyContent="flex-end" xs={6} spacing={0}>
                <Typography variant="h6" className={classes.title}>
                    {props.amount}
                </Typography>
            </Grid>
        </Grid>
    )
}

function BalanceItemSmall(props) {
    const classes = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid container item justifyContent="flex-start" xs={6} spacing={0}>
                <Typography variant="h6" className={classes.title2}>
                    {props.asset}
                </Typography>
            </Grid>
            <Grid container item justifyContent="flex-end" xs={6} spacing={0}>
                <Typography variant="h6" className={classes.title2}>
                    {props.amount}
                </Typography>
            </Grid>
        </Grid>
    )
}

export class Balance extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchBalance(hostIP + "/get_balance");
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        this.props.fetchBalance(hostIP + "/get_balance");
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {balance} = this.props;

        return <div>
            <BalancePaper balance={balance}/>
        </div>
    };
}