import React from 'react';
import {connect} from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import withStyles from "@material-ui/core/styles/withStyles";
import {fetchBotStatus, setBotStatusPending, startStopBot,} from "../store/header/actions";
import {bindActionCreators} from "redux";
import {hostIP} from "../server_adress";
import Grid from "@material-ui/core/Grid";

const styles = {
    root: {
        flexGrow: 1,
        // textAlign: "center"
    },
    root_dark: {
        flexGrow: 1,
        backgroundColor: "#000000b5"
    },
    title: {
        // flexGrow: 1,
        marginLeft: 10,
        // paddingTop: 10,
    },
    title_dark: {
        color: "antiquewhite",
        marginLeft: 10,
    },
    title_label: {
        color: "antiquewhite",
        marginLeft: 10,
        fontSize: 16
    },
    status_active: {
        marginLeft: 15,
        marginRight: 15,
        color: "green"
    },
    status_stopped: {
        marginLeft: 15,
        marginRight: 15,
        color: "gray"
    },
    status_pending: {
        marginLeft: 15,
        marginRight: 15,
        color: "gray"
    },
    status_error: {
        marginLeft: 15,
        marginRight: 15,
        color: "red"
    },
    status_active_dark: {
        marginLeft: 15,
        marginRight: 15,
        color: "#49c349"
    },
    status_stopped_dark: {
        marginLeft: 15,
        marginRight: 15,
        color: "antiquewhite"
    },
    status_pending_dark: {
        marginLeft: 15,
        marginRight: 15,
        color: "antiquewhite"
    },
}


function BotStatusLabel(classes, status, dark_mode) {
    if (status === "Stopped") {
        return <p className={dark_mode==='dark'?classes.status_stopped_dark:classes.status_stopped}>{status}</p>
    }
    if (status === "Active") {
        return <p className={dark_mode==='dark'?classes.status_active_dark:classes.status_active}>{status}</p>
    }
    if (status === "Pending") {
        return <p className={dark_mode==='dark'?classes.status_pending_dark:classes.status_pending}>{status}</p>
    }
    return <p className={classes.status_error}>{status}</p>
}


class Header extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }
    componentDidMount() {
        this.props.fetchBotStatus(hostIP + "/get_bot_status");
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }

    tick() {
        if (this.props.bot_status.bot_status !== "Pending") {
            this.props.fetchBotStatus(hostIP + "/get_bot_status");
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleStartBotClick() {
        this.props.setBotStatusPending();
        this.props.startStopBot(hostIP + "/start");
    }

    handleStopBotClick() {
        this.props.setBotStatusPending();
        this.props.startStopBot(hostIP + "/stop");
    }

    render() {
        const {classes, bot_status} = this.props;

        return <div className={classes.root_dark}>
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Grid container justifyContent="center" spacing={2}>
                        <Grid item xs={1}/>
                        <Typography variant="h6" className={classes.title_dark}>
                            TRIANGULAR - BINANCE
                        </Typography>
                    </Grid>
                    <IconButton edge="end" aria-label="start"
                        onClick={() => this.handleStartBotClick()}
                        disabled={bot_status.bot_status === "Active" || bot_status.bot_status === "Pending"}
                                color="primary"
                    >
                        <PlayArrowIcon/>
                    </IconButton>
                    <IconButton edge="end" aria-label="stop"
                        onClick={() => this.handleStopBotClick()}
                        disabled={bot_status.bot_status !== "Active"}
                                color="secondary"
                    >
                        <StopIcon/>
                    </IconButton>
                    {BotStatusLabel(classes, bot_status.bot_status, true)}
                </Toolbar>
            </AppBar>
        </div>
    }
}

const putStateToProps = (state) => {
    return {
        bot_status: state.header.bot_status
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchBotStatus: bindActionCreators(fetchBotStatus, dispatch),
        startStopBot: bindActionCreators(startStopBot, dispatch),
        setBotStatusPending: bindActionCreators(setBotStatusPending, dispatch)
    };
};

export default withStyles(styles)(connect(putStateToProps, putActionsToProps)(Header))