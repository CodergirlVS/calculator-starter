import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  NativeSelect,
  Paper,
  TextField,
  OutlinedInput,
  Typography,
  Tooltip,
} from "@mui/material";
import { ChangeEvent, useRef, FormEvent, useState, useEffect } from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import axios from "axios";
import { useRouter } from "next/router";

interface InitialValue {
  initialValue: string[];
}

const Calculator = ({ initialValue }: InitialValue): JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [firstError, setfirstError] = useState("");
  const [secondError, setSecondError] = useState("");
  const [operationError, setOperationError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  //const [paramsArray, setParamsArray] = useState<string[]>([]);

  useRef<HTMLInputElement>();
  const first = useRef<HTMLInputElement>();
  const second = useRef<HTMLInputElement>();
  //const operationRef = useRef<HTMLSelectElement>();
console.log("InitialValue data", initialValue)

  // useEffect(() => {
  //   if (initialValue?.length === 3) {
  //     setParamsArray(initialValue);
  //     setOperation(initialValue[0]);
  //   }
  // }, []);

  useEffect(()=>{
if(initialValue.length) {
  if(initialValue[0]) {
    setOperation(initialValue[0])
   }

    if(first.current && initialValue[1]) {
       first.current.value = initialValue[1]
    }
    if(second.current && initialValue[2]) {
      second.current.value = initialValue[2]
   }
   
}
   console.log('use effect is runnig')
  },[])

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setOperation(e.target.value);
    // setOperationError("");
  };

  interface MyForm extends HTMLFormControlsCollection {
    first: HTMLInputElement;
    second: HTMLInputElement;
  }
console.log(operation, "OPS")
  const isNumeric = (value: string) => {
    return /^-?\d+$/.test(value);
  };

  const handleCalculate = (e: FormEvent<HTMLFormElement>) => {
    console.log("I am here")
    e.preventDefault();
    const target = e.currentTarget.elements as MyForm;
    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    };

    let error = false;

    if (!isNumeric(query.first)) {
      setfirstError("Value is not numeric");
      error = true;
    }

    if (!isNumeric(query.second)) {
      setSecondError("Value is not numeric");
      error = true;
    }

    if (!query.operation) {
      setOperationError("Choose the operation");
      error = true;
    }

    if (!error) {
      setIsDisabled(true);
      console.log("clicked");
      axios
        .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)
        .then((res) => {
          console.log("SUCCESS ", res)
          //setTimeout(() => {
          setResult(res.data.result);
          setIsDisabled(false);
          //}, 5000)
        })
        .catch((err) => {
          console.log("ERR: ", error)
          setResult(err.response.data.message);
          setIsDisabled(false);
        });
    }
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
              error={!!firstError}
              helperText={firstError || ""}
              onFocus={() => {
                setfirstError("");
              }}
              inputRef={first}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              //defaultValue={""}
              value={operation || ""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
              error={!!operationError}
              onFocus={() => setOperationError("")}
            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
            <FormHelperText>{operationError || ""}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField
              id="second"
              label="Second Number"
              variant="outlined"
              // value={paramsArray[2] || ""}
              error={!!secondError}
              helperText={secondError || ""}
              onFocus={() => {
                setSecondError("");
              }}
              inputRef={second}
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>
            <Tooltip
              title={isDisabled ? "Waiting for operation response" : ""}
              placement="top"
              arrow
            >
              <Box style={isDisabled ? { cursor: "progress" } : undefined}>
                <Button
                  variant="contained"
                  type="submit"
                  // disabled={isDisabled}
                  fullWidth
                >
                  Calculate
                </Button>
              </Box>
            </Tooltip>
          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography
                align="center"
                variant="h3"
                gutterBottom
                id="result"
                data-testid="result-id"
              >
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
