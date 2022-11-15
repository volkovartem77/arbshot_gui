import Paper from "@material-ui/core/Paper";
import ScrollToBottom from "react-scroll-to-bottom";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {getKey} from "../utils";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {fetchGeneralLog} from "../store/log/actions";
import {bindActionCreators} from "redux";
import {hostIP} from "../server_adress";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";


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
        margin: 20,
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
    }
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
            10000
        );
    }

    tick() {
        this.props.fetchGeneralLog(hostIP + "/get_log");
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="h6" className={classes.t_title}>
                    General Log
                </Typography>
                <Divider className={classes.divider}/>
                <Container maxWidth="md" className={classes.root_container}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper} elevation={3}>
                            <p className={classes.title}><i>general.log</i></p>
                            <ScrollToBottom className={classes.scroll}>
                                {this.props.general_log.map((line) => (
                                    <Typography variant="body2" gutterBottom key={getKey()}>
                                        {line}
                                    </Typography>
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
        general_log: state.log.general_log
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchGeneralLog: bindActionCreators(fetchGeneralLog, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(withStyles(styles)(Log));