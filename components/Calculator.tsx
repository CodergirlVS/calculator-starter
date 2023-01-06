import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
  Tooltip,
  OutlinedInput,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";

import { useState, useRef, ChangeEvent, FormEvent, useEffect } from "react";

const Calculator = (): JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [isFirstError, setIsFirstError] = useState("");
  const [isSecondError, setIsSecondError] = useState("");
  const [isOperationError, setIsOperationError] = useState("");
  const [disabled, setDisabled] = useState(false);

  //const first = useRef<HTMLInputElement>();
  // const second = useRef<HTMLInputElement>();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  interface MyForm extends HTMLFormControlsCollection {
    first: HTMLInputElement;
    second: HTMLInputElement;
  }

  useEffect(() => {
    if(!isFirstError && !isSecondError && !isOperationError) {
      setDisabled(false)
    }

  }, [isFirstError, isSecondError, isOperationError])

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setResult("");

    const target = e.currentTarget.elements as MyForm;

    let firstError = "";
    let secondError = "";
    let operationError = "";

    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    };
    console.log("TARGET:", JSON.stringify(query))
    if (isNaN(parseInt(query.first))) {
      firstError = "First is not a number";
    }
    if (isNaN(parseInt(query.second))) {
      secondError = "Second is not a number";
    }
    if (query.operation === "") {
      operationError = "Operation is not selected";
    }

    if (!firstError && !secondError && !operationError) {
      axios
        .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
        .then((res) => {
          setTimeout(() => {
            setDisabled(false);
            setResult(res.data.result);
          }, 3000);
        })
        .catch((err) => {
          setResult(err.response.data.message);
        });
    }
    setIsFirstError(firstError);
    setIsSecondError(secondError);
    setIsOperationError(operationError);
  };

  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="first"
              label="First Number"
              variant="outlined"
              error={!!isFirstError}
              helperText={isFirstError}
              //inputRef={first}
              onFocus={() => setIsFirstError("") }
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl
            fullWidth
            error={!!isOperationError}
            onFocus={() => setIsOperationError("")}
          >
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
            <FormHelperText>{isOperationError}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              error={!!isSecondError}
              helperText={isSecondError}
              //inputRef={second}
              onFocus={() => setIsSecondError("")}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
        <Tooltip
              title={disabled && "Waiting for the calculation to be done"}
              followCursor
            >
          <FormControl fullWidth>
              <Button variant="contained" type="submit" disabled={disabled} >
                Calculate
              </Button>
          </FormControl>
          </Tooltip>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom id="result">
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;
