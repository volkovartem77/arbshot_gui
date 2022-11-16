import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {getKey} from "../utils";
import {hostIP} from "../server_adress";
import Container from "@material-ui/core/Container";
import {bindActionCreators} from "redux";
import {fetchBalance} from "../store/balance/actions";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

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
        margin: 20,
    },
    title: {
        color: "#5a5a82",
        fontSize:'0.9em'
    },
    divider: {
        margin: 8
    },
    listItemText:{
        fontSize:'1.2em',
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
                        <BalanceItem
                            asset={key}
                            amount={Number(value).toFixed(8)}
                            key={getKey()}
                        />
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

const styles = {
    root: {
        marginTop: 20,
    },
    divider: {
        marginTop: 20,
        marginBottom: 20
    },
    root_container: {
        // marginLeft: 0
    },
    balance_paper: {
        minWidth: 250
    },
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
        const {classes, balance} = this.props;

        return <div>
            <div className={classes.root}>
                <Container maxWidth="md" className={classes.root_container}>
                    <Grid item xs={3} className={classes.balance_paper}>
                        <BalancePaper balance={balance}/>
                    </Grid>
                    <Grid item xs={9}/>
                </Container>
            </div>
        </div>
    };
}

const putStateToProps = (state) => {
    return {
        balance: state.balance.balance,
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchBalance: bindActionCreators(fetchBalance, dispatch),
    };
};

export default withStyles(styles)(connect(putStateToProps, putActionsToProps)(Balance))