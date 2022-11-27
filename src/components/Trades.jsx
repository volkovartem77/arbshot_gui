import React from 'react';
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {bindActionCreators} from "redux";
import {fetchTrades, sendClearTrades, setPage, setRowsPerPage} from "../store/trades/actions";
import {hostIP} from "../server_adress";
import {TablePagination} from "@material-ui/core";

const styles = {
    root: {
        marginTop: 20,
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    root_container: {
        maxWidth: 1000,
    },
}

class TradesTable extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    handleChangePage = (event, newPage) => {
        this.props.setPage(newPage);
    };

    handleChangeRowsPerPage = (event) => {
        this.props.setRowsPerPage(+event.target.value);
        this.props.setPage(0);
    };

    render() {
        const {trades, page, rows_per_page} = this.props;

        // Styles
        const tbl_root = {
            maxHeight: 600,
            maxWidth: 1500
        }
        const tbl_root_md = {
            maxHeight: 600,
            maxWidth: 650
        }
        const tbl_root_small = {
            maxHeight: 600,
            maxWidth: 340
        }
        const tbl_cell = {
            whiteSpace: "nowrap",
            fontSize: 12,
        }
        const tbl_head = {
            fontSize: 12,
            color: "#687179",
        }

        let w = window.innerWidth

        return <Paper>
            <TableContainer style={w > 400?w > 700?tbl_root:tbl_root_md:tbl_root_small}>
                <Table stickyHeader size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={tbl_head}>SendTime</TableCell>
                            <TableCell align="left" style={tbl_head}>OrderId</TableCell>
                            <TableCell align="left" style={tbl_head}>Chain</TableCell>
                            <TableCell align="left" style={tbl_head}>TiF</TableCell>
                            <TableCell align="left" style={tbl_head}>Symbol</TableCell>
                            <TableCell align="left" style={tbl_head}>Amount</TableCell>
                            <TableCell align="left" style={tbl_head}>Price</TableCell>
                            <TableCell align="left" style={tbl_head}>Status</TableCell>
                            <TableCell align="left" style={tbl_head}>PS</TableCell>
                            <TableCell align="left" style={tbl_head}>CreationTime</TableCell>
                            <TableCell align="left" style={tbl_head}>UpdateTime</TableCell>
                            <TableCell align="left" style={tbl_head}>ReceiveTime</TableCell>
                            <TableCell align="left" style={tbl_head}>HoldingTime</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trades
                            .slice(page * rows_per_page, page * rows_per_page + rows_per_page)
                            .map((row) => (
                            <TableRow hover
                                      key={row.send_time}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={tbl_cell}>
                                    {row.send_time}
                                </TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.order_id.substring(4,14)}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.arb}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.time_in_force}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.symbol}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{parseFloat(row.amount)}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{parseFloat(row.price)}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.status}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.placing_speed}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.creation_time}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.update_time}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.recv_time}</TableCell>
                                <TableCell align="left" style={tbl_cell}>{row.holding_time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={trades.length}
                rowsPerPage={rows_per_page}
                page={page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
        </Paper>
    }
}

class Trades extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchTrades(hostIP + "/get_trades");
        this.timerID = setInterval(
            () => this.tick(),
            3000
        );
    }

    tick() {
        this.props.fetchTrades(hostIP + "/get_trades");
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        const { classes, trades, page, rows_per_page } = this.props;

        return <div>
            <div className={classes.root}>
                <Container maxWidth="xl" className={classes.root_container}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={2} className={classes.root}>
                            {typeof(trades) === "undefined"?<div/>:
                                <TradesTable
                                    trades={trades}
                                    page={page}
                                    rows_per_page={rows_per_page}
                                    setPage={this.props.setPage}
                                    setRowsPerPage={this.props.setRowsPerPage}
                                />
                            }
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    };
}

const putStateToProps = (state) => {
    return {
        trades: state.trades.trades,
        page: state.trades.page,
        rows_per_page: state.trades.rows_per_page

    };
};

const putActionsToProps = (dispatch) => {
    return {
        fetchTrades: bindActionCreators(fetchTrades, dispatch),
        sendClearTrades: bindActionCreators(sendClearTrades, dispatch),
        setPage: bindActionCreators(setPage, dispatch),
        setRowsPerPage: bindActionCreators(setRowsPerPage, dispatch),
    };
};

export default withStyles(styles)(connect(putStateToProps, putActionsToProps)(Trades))