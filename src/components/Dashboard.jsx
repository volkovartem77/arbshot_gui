import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Container from "@material-ui/core/Container";
import {
    fetchBalance,
    fetchSupervisorProcesses
} from "../store/dashboard/actions";
import {Balance} from "./Balance";
import {Supervisor} from "./Supervisor";

const styles = {
    root: {
        marginTop: 20,
    },
    divider: {
        marginTop: 20,
        marginBottom: 20
    },
    root_container: {
        paddingLeft: 0
    },
    paper: {
        textAlign: 'center',
        margin: 5,
        padding: 30,
    },
    divider_paper: {
        margin: 8
    },
    balance_paper: {
        minWidth: 250
    },

    // Supervisor
    listItemText:{
        fontSize:'1.0em',
        color: "gray"
    },
    item_title: {
        fontSize: 14,
        color: "#5a5a82",
    },
    process_status_stopped: {
        padding: 2,
        fontSize: 14,
        color: "gray",
    },
    process_status_running: {
        padding: 2,
        fontSize: 14,
        color: "green"
    },
    process_status_exited: {
        padding: 2,
        fontSize: 14,
        color: "red"
    },
    supervisor_paper: {
        minWidth: 350,
        maxHeight: 250
    },
}

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    render() {
        const { classes } = this.props;

        return <div>
            <div className={classes.root}>
                <Container maxWidth="sm" className={classes.root_container}>
                    <Grid item xs={12}>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item xs={3} className={classes.balance_paper}>
                                <Balance
                                    classes={classes}
                                    balance={this.props.balance}
                                    fetchBalance={this.props.fetchBalance}
                                />
                            </Grid>
                            <Grid item xs={3} className={classes.supervisor_paper}>
                                <Supervisor
                                    classes={classes}
                                    supervisor_processes={this.props.supervisor_processes}
                                    fetchSupervisorProcesses={this.props.fetchSupervisorProcesses}
                                />
                            </Grid>
                            <Grid item xs={6}/>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    };
}

const putStateToProps = (state) => {
    return {
        balance: state.dashboard.balance,
        supervisor_processes: state.dashboard.supervisor_processes,
    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchSupervisorProcesses: bindActionCreators(fetchSupervisorProcesses, dispatch),
        fetchBalance: bindActionCreators(fetchBalance, dispatch),
    };
};

export default withStyles(styles)(connect(putStateToProps, putActionsToProps)(Dashboard))