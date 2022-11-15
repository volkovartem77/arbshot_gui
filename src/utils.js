import React from "react";
import TextField from "@material-ui/core/TextField";


export function getKey() {
    return Math.random() * Math.random()
}

export const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
    first.toLocaleUpperCase(locale) + rest.join('')

export function MyTextFieldSmall(my_label, my_value, is_disabled, handle_fnc, is_error, my_type) {
    if (is_error) {
        return <TextField
            error
            label={my_label}
            type={my_type}
            // placeholder={label}
            variant="outlined"
            value={my_value}
            disabled={is_disabled}
            size="small"
            onChange={(e) => handle_fnc(e.target.value)}
        />
    }
    else {
        return <TextField
            label={my_label}
            // placeholder={label}
            type={my_type}
            variant="outlined"
            value={my_value}
            disabled={is_disabled}
            size="small"
            onChange={(e) => handle_fnc(e.target.value)}
        />
    }
}

export function MyTextFieldWide(my_label, my_value, is_disabled, handle_fnc, is_error, my_type) {
    if (is_error) {
        return <TextField
            error
            fullWidth
            label={my_label}
            type={my_type}
            // placeholder={label}
            variant="outlined"
            value={my_value}
            disabled={is_disabled}
            onChange={(e) => handle_fnc(e.target.value)}
        />
    }
    else {
        return <TextField
            fullWidth
            label={my_label}
            // placeholder={label}
            type={my_type}
            variant="outlined"
            value={my_value}
            disabled={is_disabled}
            onChange={(e) => handle_fnc(e.target.value)}
        />
    }
}

export function FilterDecimalValues(value) {
    let reg = new RegExp('^\\d*\\.?\\d*$');
    return reg.test(value);
}

export function FilterDecimalValuesNegative(value) {
    let reg = new RegExp('^-?\\d*\\.?\\d*$');
    return reg.test(value);
}

export function FilterPrcValues(value) {
    if (value > 100) {
        return false
    }
    // let _value = value.toString().split(".")
    // let int_part = _value[0]
    // let decimal_part = _value.length === 2?_value[1]:""
    // console.log("int_part", int_part, "decimal_part", decimal_part)
    //
    // let reg1 = true
    //
    // if (int_part !== "") {
    //     let reg1 = new RegExp('^1?[0-9]?[0-9]$');
    //     console.log('reg1', reg1)
    // }

    let reg = new RegExp('^\\d?\\d?\\d?\\.?\\d?\\d?$');
    return reg.test(value);
}

export function FilterIntegerValues(value) {
    let reg = new RegExp('^\\d*$');
    return reg.test(value);
}


export function getTargetMarkers(t1, t2, t3, t4, t5, t6, t7, t8, t9, t10) {
    let result = {}
    if (t1) {result['target1'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t2) {result['target2'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t3) {result['target3'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t4) {result['target4'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t5) {result['target5'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t6) {result['target6'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t7) {result['target7'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t8) {result['target8'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t9) {result['target9'] = "TP" + (Object.keys(result).length + 1).toString()}
    if (t10) {result['target10'] = "TP" + (Object.keys(result).length + 1).toString()}
    return result
}