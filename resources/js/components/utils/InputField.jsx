import { Grid, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

const InputField = ({
    name,
    placeholder,
    label = null,
    variant = "filled",
    type = "text",
}) => {
    const [fields, { error }] = useField(name);
    const { value, ...others } = fields;

    return (
        <Grid mb={1}>
            <TextField
                label={label ? label : undefined}
                {...others}
                type={type}
                error={!!error}
                helperText={error}
                hiddenLabel
                id={name}
                name={name}
                variant={variant}
                placeholder={placeholder}
                sx={{ bgcolor: "white", step: "0.01" }}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                InputProps={{
                    step: 0.01,
                }}
            />
        </Grid>
    );
};

export default InputField;
