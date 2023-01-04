import Grid2 from "@mui/material/Unstable_Grid2";
import {
  Box,
  Paper,
  TextField,
  MenuItem,
  FormControl,
  NativeSelect,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { OutlinedInput } from "@mui/material";
import axios from "axios";

import { useState, useRef, ChangeEvent, FormEvent } from "react";

const Calculator = (): JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [isFirstError, setIsFirstError] = useState("");
  const [isSecondError, setIsSecondError] = useState("");
  const [isOperationError, setIsOperationError] = useState("");

  //const first = useRef<HTMLInputElement>();
  // const second = useRef<HTMLInputElement>();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
  };

  interface MyForm extends EventTarget {
    first: HTMLInputElement;
    second: HTMLInputElement;
  }

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    setResult("");
    e.preventDefault();
    const target = e.target as MyForm;

    let firstError = "";
    let secondError = "";
    let operationError = "";

    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    };

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
      console.log("I am here");
      axios
        .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
        .then((res) => {
          setResult(res.data.result);
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
              onFocus={() => setIsFirstError("")}
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
          <FormControl fullWidth>
            <Button variant="contained" type="submit">
              Calculate
            </Button>
          </FormControl>
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
