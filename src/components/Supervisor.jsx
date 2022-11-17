import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import {getKey} from "../utils";
import {hostIP} from "../server_adress";


function supervisorProcessStatus(classes, status) {
    if (status === "STOPPED") {
        return <span className={classes.process_status_stopped}>{status}</span>
    }
    if (status === "RUNNING") {
        return <span className={classes.process_status_running}>{status}</span>
    }
    if (status === "EXITED") {
        return <span className={classes.process_status_exited}>{status}</span>
    }
    return <span className={classes.process_status_exited}>{status}</span>
}

function SupervisorItem(props) {
    const {classes, text, value} = props

    return (
        <div className={classes.stats_item}>
            <Grid container spacing={1}>
                <Grid container item justifyContent="flex-start" xs={10} spacing={0}>
                    <Typography variant="h6" className={classes.item_title}>{text}</Typography>
                </Grid>
                <Grid container item justifyContent="flex-end" xs={2} spacing={0}>
                    <Typography variant="h6" className={classes.item_title}>{value}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export class Supervisor extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchSupervisorProcesses(hostIP + "/get_supervisor_processes");
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }

    tick() {
        this.props.fetchSupervisorProcesses(hostIP + "/get_supervisor_processes");
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const {classes, supervisor_processes} = this.props;

        return <Paper className={classes.paper} elevation={3}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className={classes.listItemText}>
                        Supervisor
                    </div>
                </Grid>
            </Grid>
            <Divider className={classes.divider_paper}/>
            {
                supervisor_processes.map(({ process_name, status}) => (
                    <SupervisorItem
                        classes={classes}
                        text={process_name}
                        value={supervisorProcessStatus(classes, status)}
                        key={getKey()}
                    />
                ))
            }
        </Paper>
    };
}