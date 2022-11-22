import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {hostIP} from "../server_adress";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {FilterDecimalValues, FilterIntegerValues, MyTextFieldWide} from "../utils";
import {
    fetchTradingSettings,
    sendTradingSettings,
    setAmountBTCLock,
    setAPIKey,
    setAPISecret,
    setApplyButtonStatus,
    setBackward,
    setBTCHoldPrice,
    setForward,
    setMinDifference,
    setOrderAmountPrc,
    setRecvWindow,
    setTakerFee,
    setTrading
} from "../store/settings/actions";
import {Switch} from "@material-ui/core";

const styles = {
    root: {
        marginTop: 35,
        textAlign: "center"
    },
    comboBox: {
        margin: 10
    },
    title: {
        color: "#696665",
        margin: 20,
        marginTop: 35
    },
    divider: {
        margin: 20,
    },
    checkbox_title: {
        color: "#696665",
        margin: 8,
    },
    text_field: {
        // marginLeft: 10,
        margin: 8
    },
    text_field_left: {
        // marginLeft: 20,
        float: "left",
    },
    text_field_right: {
        // marginRight: 20,
        float: "right",
    },
    checkbox: {
        margin: 15,
        float: "left",
    },
    checkbox_label: {
        marginTop: 25,
        float: "left",
    },
    root_container: {
        // marginLeft: 20,
        // marginRight: 20
    },
    comment: {
        color: "#ad8e8e",
        fontSize: "small",
        float: "left",
        marginLeft: 20
    },
    parameter_container: {
        // margin: 20,
        marginBottom: 30,
        marginLeft: 0,
        marginRight: 0,
        // padding: 20,
        minWidth: 400,
    },
};

function IsAllFilled(props) {
    return props.taker_fee !== "" && props.taker_fee !== null &&
        props.min_difference !== "" && props.min_difference !== null &&
        props.order_amount_prc !== "" && props.order_amount_prc !== null &&
        props.amount_btc_lock !== "" && props.amount_btc_lock !== null &&
        props.btc_hold_price !== "" && props.btc_hold_price !== null &&
        props.recv_window !== "" && props.recv_window !== null
}

class Settings extends React.Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    componentDidMount() {
        this.props.fetchSettings(hostIP + '/get_preferences')
    }

    handleApplyButtonClick() {
        this.props.setApplyButtonStatus(false);
        let data = {
            "api_key": this.props.api_key,
            "api_secret": this.props.api_secret,
            "taker_fee": this.props.taker_fee,
            "min_difference": this.props.min_difference,
            "order_amount_prc": this.props.order_amount_prc,
            "amount_btc_lock": this.props.amount_btc_lock,
            "btc_hold_price": this.props.btc_hold_price,
            "recv_window": this.props.recv_window,
            "forward": this.props.forward,
            "backward": this.props.backward,
            "trading": this.props.trading,
        }
        // console.log('data', data)
        this.props.sendSettings(hostIP + "/set_preferences", data)
        this.props.setAPIKey("");
        this.props.setAPISecret("");
    }

    handleChangeAPIKey = (api_key) => {
        this.props.setAPIKey(api_key);
        this.props.setApplyButtonStatus(true);
    }

    handleChangeSecretKey = (secret_key) => {
        this.props.setAPISecret(secret_key);
        this.props.setApplyButtonStatus(true);
    }

    handleChangeTakerFee = (taker_fee) => {
        if (FilterDecimalValues(taker_fee)) {
            this.props.setTakerFee(taker_fee);
            this.props.setApplyButtonStatus(true);
        }
    }

    handleChangeMinDifference = (min_difference) => {
        if (FilterDecimalValues(min_difference)) {
            this.props.setMinDifference(min_difference);
            this.props.setApplyButtonStatus(true);
        }
    }

    handleChangeOrderAmountPrc = (order_amount_prc) => {
        if (FilterDecimalValues(order_amount_prc)) {
            this.props.setOrderAmountPrc(order_amount_prc);
            this.props.setApplyButtonStatus(true);
        }
    }

    handleChangeAmountBTCLock = (amount_btc_lock) => {
        if (FilterDecimalValues(amount_btc_lock)) {
            this.props.setAmountBTCLock(amount_btc_lock);
            this.props.setApplyButtonStatus(true);
        }
    }

    handleChangeBTCHoldPrice = (btc_hold_price) => {
        if (FilterDecimalValues(btc_hold_price)) {
            this.props.setBTCHoldPrice(btc_hold_price);
            this.props.setApplyButtonStatus(true);
        }
    }

    handleChangeRecvWindow = (recv_window) => {
        if (FilterIntegerValues(recv_window)) {
            this.props.setRecvWindow(recv_window);
            this.props.setApplyButtonStatus(true);
        }
    }

    handleChangeForwardCheckbox = (checked) => {
        this.props.setForward(checked);
        this.props.setApplyButtonStatus(true);
    }

    handleChangeBackwardCheckbox = (checked) => {
        this.props.setBackward(checked);
        this.props.setApplyButtonStatus(true);
    }

    handleChangeTradingCheckbox = (checked) => {
        this.props.setTrading(checked);
        this.props.setApplyButtonStatus(true);
    }

    render() {
        const {classes, api_key, api_secret, taker_fee, min_difference, order_amount_prc, amount_btc_lock,
            btc_hold_price, recv_window, forward, backward, trading, apply_button_status, bot_status} = this.props;

        return (
            <div className={classes.root}>
                <Container maxWidth="lg" className={classes.root_container}>
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Container maxWidth="sm" className={classes.root_container}>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.title}>
                                            Settings
                                        </Typography>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("API Key", api_key, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeAPIKey,  false, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("API Secret", api_secret, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeSecretKey, false, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("Min Diff", min_difference, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeMinDifference, false, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("Taker Fee", taker_fee, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeTakerFee, taker_fee < 0, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("Order Size %", order_amount_prc, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeOrderAmountPrc, order_amount_prc < 0, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("BTC Lock", amount_btc_lock, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeAmountBTCLock, amount_btc_lock < 0, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("BTC HP", btc_hold_price, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeBTCHoldPrice, btc_hold_price < 0, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className={classes.text_field}>
                                                    {MyTextFieldWide("recvWindow", recv_window, bot_status.bot_status !== "Stopped",
                                                        this.handleChangeRecvWindow, recv_window < 0, "text")}
                                                </div>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.checkbox_title}>
                                                    Forward
                                                    <Switch
                                                        checked={forward}
                                                        disabled={bot_status.bot_status==="Active"}
                                                        onChange={(e) => this.handleChangeForwardCheckbox(e.target.checked)}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.checkbox_title}>
                                                    Backward
                                                    <Switch
                                                        checked={backward}
                                                        disabled={bot_status.bot_status==="Active"}
                                                        onChange={(e) => this.handleChangeBackwardCheckbox(e.target.checked)}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography className={classes.checkbox_title}>
                                                    Trading
                                                    <Switch
                                                        checked={trading}
                                                        disabled={bot_status.bot_status==="Active"}
                                                        onChange={(e) => this.handleChangeTradingCheckbox(e.target.checked)}
                                                        color="primary"
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Container>
                                <Divider className={classes.divider}/>
                                <Container maxWidth="sm" className={classes.root_container}>
                                    <Grid item xs={12}>
                                        <div className={classes.button}>
                                            <Box display="flex" justifyContent="flex-end">
                                                <Button
                                                    size="large"
                                                    color="primary"
                                                    onClick={() => {this.handleApplyButtonClick()}}
                                                    disabled={!apply_button_status || !IsAllFilled(this.props)}>
                                                    Apply
                                                </Button>
                                            </Box>
                                        </div>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const putStateToProps = (state) => {
    return {
        api_key: state.settings.api_key,
        api_secret: state.settings.api_secret,
        taker_fee: state.settings.taker_fee,
        min_difference: state.settings.min_difference,
        order_amount_prc: state.settings.order_amount_prc,
        amount_btc_lock: state.settings.amount_btc_lock,
        btc_hold_price: state.settings.btc_hold_price,
        recv_window: state.settings.recv_window,
        forward: state.settings.forward,
        backward: state.settings.backward,
        trading: state.settings.trading,
        apply_button_status: state.settings.apply_button_status,
        bot_status: state.header.bot_status,
    };
};

const putActionsToProps = (dispatch) => {
    return {
        setAPIKey: bindActionCreators(setAPIKey, dispatch),
        setAPISecret: bindActionCreators(setAPISecret, dispatch),
        setTakerFee: bindActionCreators(setTakerFee, dispatch),
        setMinDifference: bindActionCreators(setMinDifference, dispatch),
        setOrderAmountPrc: bindActionCreators(setOrderAmountPrc, dispatch),
        setAmountBTCLock: bindActionCreators(setAmountBTCLock, dispatch),
        setBTCHoldPrice: bindActionCreators(setBTCHoldPrice, dispatch),
        setRecvWindow: bindActionCreators(setRecvWindow, dispatch),
        setForward: bindActionCreators(setForward, dispatch),
        setBackward: bindActionCreators(setBackward, dispatch),
        setTrading: bindActionCreators(setTrading, dispatch),
        setApplyButtonStatus: bindActionCreators(setApplyButtonStatus, dispatch),
        fetchSettings: bindActionCreators(fetchTradingSettings, dispatch),
        sendSettings: bindActionCreators(sendTradingSettings, dispatch),

    };
};

export default withStyles(styles)(connect(putStateToProps, putActionsToProps)(Settings))