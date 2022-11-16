import Paper from "@material-ui/core/Paper";
import ScrollToBottom from "react-scroll-to-bottom";
import Typography from "@material-ui/core/Typography";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {fetchGeneralLog, setAutoRefreshLog} from "../store/log/actions";
import {bindActionCreators} from "redux";
import {hostIP} from "../server_adress";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Switch} from "@material-ui/core";
import {getKey} from "../utils";


const styles = {
    root: {
        marginTop: 35,
        textAlign: "center",
    },
    root_container: {
        // marginLeft: 0
    },
    t_title: {
        color: "#696665",
        margin: 0,
    },
    divider: {
        margin: 20,
    },
    paper: {
        padding: 20,
        textAlign: 'left',
        maxHeight: 540,
        overflow: 'auto',
        paddingTop: 5,
        paddingLeft: 5,
    },
    title: {
        color: "#5a5a82",
        fontSize: 13,
        margin: 5
    },
    scroll: {
        height: 400,
        paddingTop: 20,
        paddingLeft: 25,
    },
    log_string: {
        padding: 4,
        fontSize: 13,
    },
    checkbox: {
        // margin: 15,
        // float: "left",
    },
    checkbox_label: {
        marginTop: 25,
        float: "left",
    },
}

class Log extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchGeneralLog(hostIP + "/get_log");
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    tick() {
        if (this.props.auto_refresh_log) {
            this.props.fetchGeneralLog(hostIP + "/get_log");
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handleChangeAutoRefreshLogCheckbox = (checked) => {
        this.props.setAutoRefreshLog(checked);
    }

    render() {
        const {classes, auto_refresh_log} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.t_title}>
                            General Log
                            <Switch
                                checked={auto_refresh_log}
                                onChange={(e) => this.handleChangeAutoRefreshLogCheckbox(e.target.checked)}
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                <Container maxWidth="md" className={classes.root_container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={3}>
                            <p className={classes.title}><i>general.log</i></p>
                            <ScrollToBottom className={classes.scroll}>
                                {this.props.general_log.map((line) => (
                                    <div className={classes.log_string} key={getKey()}>{line}</div>
                                ))}
                            </ScrollToBottom>
                        </Paper>
                    </Grid>
                </Container>
                <Divider className={classes.divider}/>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        general_log: state.log.general_log,
        auto_refresh_log: state.log.auto_refresh_log,
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchGeneralLog: bindActionCreators(fetchGeneralLog, dispatch),
        setAutoRefreshLog: bindActionCreators(setAutoRefreshLog, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(withStyles(styles)(Log));