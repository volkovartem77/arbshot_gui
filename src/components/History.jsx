import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {hostIP} from "../server_adress";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import {fetchHistory, sendClearHistory} from "../store/history/actions";
import {getKey} from "../utils";
import Container from "@material-ui/core/Container";

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
    paper: {
        textAlign: 'center',
        margin: 20,
        padding: 30,
    },
    divider_paper: {
        margin: 8
    },
    history_container: {
        minWidth: 375
    },

    // Table
    root_table: {
        paddingRight: 20,
        paddingLeft: 20,
        // paddingTop: 5,
        // paddingBottom: 5,
    },
    table_header: {
        fontSize: 12,
        color: "#687179",
    },
    table_datetime: {
        minWidth: 130,
        maxWidth: 135,
    },
    table_chain: {
        minWidth: 150,
        maxWidth: 155,
    },
    table_size: {
        minWidth: 40,
        maxWidth: 50,
    },
    table_status: {
        minWidth: 100,
        maxWidth: 110,
    },
    table_diff: {
        minWidth: 50,
        maxWidth: 60,
    },
    table_profit: {
        maxWidth: 60
    },

    // Position Item
    pi_datetime: {
        fontSize: 12,
        color: "#4e5558",
    },
    pi_chain: {
        fontSize: 12,
        color: "#4e5558",
    },
    pi_size: {
        fontSize: 12,
        color: "#4e5558",
    },
    pi_status: {
        fontSize: 12,
        color: "#4e5558",
    },
    pi_diff: {
        fontSize: 12,
        color: "#3e434b",
    },
    pi_profit: {
        fontSize: 12,
        color: "#3e434b",
    },

    // Chain Statuses
    chain_status_completed: {
        color: "rgba(12,80,1,0.8)",
    },
    chain_status_holding: {
        color: "rgb(255,162,0)",
    },
    chain_status_canceled: {
        color: "#4e5558",
    },

    // Profit Style
    profit_positive: {
        color: "rgba(17,105,3,0.89)",
    },
    profit_negative: {
        color: "rgba(231,71,71,0.86)",
    },
    profit_zero: {
        color: "#4e5558",
    },
}

function sort_hist(_hist) {
    let sorted_hist = []
    let hist_len = _hist.length
    for (let i = 0; i < hist_len; i++) {
        let max = 0
        let max_item = {}
        let max_item_index = 0
        for (let it = 0; it < _hist.length; it++) {
            if (Date.parse(_hist[it].datetime) > max) {
                max = Date.parse(_hist[it].datetime)
                max_item = _hist[it]
                max_item_index = it
            }
        }
        sorted_hist.push(max_item)
        _hist.splice(max_item_index, 1)
    }
    return sorted_hist
}

function profitStyle(classes, profit) {
    if (profit > 0) {
        return <span className={classes.profit_positive}>{profit}</span>
    }
    if (profit < 0) {
        return <span className={classes.profit_negative}>{profit}</span>
    }
    return <span className={classes.profit_zero}>{profit}</span>
}


function chainStatus(classes, status) {
    if (status === "COMPLETED") {
        return <span className={classes.chain_status_completed}>{status}</span>
    }
    if (status === "HOLDING") {
        return <span className={classes.chain_status_holding}>{status}</span>
    }
    if (status === "CANCELED") {
        return <span className={classes.chain_status_canceled}>{status}</span>
    }
    return <span className={classes.chain_status_canceled}>{status}</span>
}

class HistoryHeaders extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        const {classes} = this.props;

        return <div>
            <Grid container justifyContent="flex-start" spacing={2} className={classes.root_table}>
                <Grid item xs={2} className={classes.table_datetime}>
                    <Typography className={classes.table_header}>DateTime</Typography>
                </Grid>
                <Grid item xs={3} className={classes.table_chain}>
                    <Typography className={classes.table_header}>Chain</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_size}>
                    <Typography className={classes.table_header}>Size</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_status}>
                    <Typography className={classes.table_header}>Status</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_diff}>
                    <Typography className={classes.table_header}>Diff%</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_profit}>
                    <Typography className={classes.table_header}>Profit</Typography>
                </Grid>
                <Grid item xs={3}/>
            </Grid>
        </div>
    }
}

class HistoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        const {classes, chain} = this.props;

        return <div>
            <Grid container justifyContent="flex-start" spacing={2} className={classes.root_table}>
                <Grid item xs={2} className={classes.table_datetime}>
                    <Typography className={classes.pi_datetime}>{chain['datetime']}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.table_chain}>
                    <Typography className={classes.pi_chain}>{chain['arb']}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_size}>
                    <Typography className={classes.pi_size}>{chain['size_usdt'].toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_status}>
                    <Typography className={classes.pi_status}>{chainStatus(classes, chain['status'])}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_diff}>
                    <Typography className={classes.pi_diff}>{chain['diff']}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.table_profit}>
                    <Typography className={classes.pi_profit}>{profitStyle(classes, chain['profit_usdt'])}</Typography>
                </Grid>
                <Grid item xs={3}/>
            </Grid>
        </div>
    }
}

class History extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchHistory(hostIP + "/get_history");
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }

    tick() {
        this.props.fetchHistory(hostIP + "/get_history");
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { classes, history } = this.props;

        let _hist = sort_hist(Object.values(history))

        return <div>
            <div className={classes.root}>
                <Container maxWidth="md" className={classes.root_container}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2} className={classes.root}>
                            <Grid item xs={12} className={classes.history_container}>
                                <Divider className={classes.divider}/>
                                <HistoryHeaders classes={classes}/>
                                <Divider className={classes.divider}/>
                                <p>{_hist.toString()}</p>
                                {Object.values(history).map((value) => (
                                    <HistoryItem
                                        classes={classes}
                                        chain={value}
                                        key={getKey()}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    };
}

const putStateToProps = (state) => {
    return {
        history: state.history.history,
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchHistory: bindActionCreators(fetchHistory, dispatch),
        sendClearHistory: bindActionCreators(sendClearHistory, dispatch)
    };
};

export default withStyles(styles)(connect(putStateToProps, putActionsToProps)(History))