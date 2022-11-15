import Paper from "@material-ui/core/Paper";
import ScrollToBottom from "react-scroll-to-bottom";
import Typography from "@material-ui/core/Typography";
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {disableRefreshLogButton, fetchGeneralLog} from "../store/log/actions";
import {bindActionCreators} from "redux";
import {hostIP} from "../server_adress";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {IconButton} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";


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
        maxHeight: 450,
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
    }
}

class Log extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchGeneralLog(hostIP + "/get_log");
    }

    render() {
        const {classes, refresh_log_button_disabled} = this.props;

        const handleRefreshLog = () => {
            this.props.disableRefreshLogButton();
            this.props.fetchGeneralLog(hostIP + "/get_log");
        }

        return (
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.t_title}>
                            General Log
                            <IconButton edge="end" aria-label="stop" onClick={() => handleRefreshLog()}
                                        disabled={refresh_log_button_disabled}
                                        color="primary">
                                <RefreshIcon/>
                            </IconButton>
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
                                    // <Typography variant="body2" gutterBottom key={getKey()}>
                                    //     {line}
                                    // </Typography>
                                    <div className={classes.log_string}>{line}</div>
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
        refresh_log_button_disabled: state.log.refresh_log_button_disabled
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchGeneralLog: bindActionCreators(fetchGeneralLog, dispatch),
        disableRefreshLogButton: bindActionCreators(disableRefreshLogButton, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(withStyles(styles)(Log));