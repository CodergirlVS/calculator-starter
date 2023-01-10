import React, { useEffect } from "react";
import { Typography, Container, Stack } from "@mui/material";
import Calculator from "../components/Calculator";
import { useRouter } from "next/router";

const operationsArray: string[] = ["add", "subtract", "multiply", "divide"];

export default function Calculate(): JSX.Element {
  const router = useRouter();
  const params = router.query.params as string[];

  useEffect(() => {
    if (
      params &&
      (params.length < 3 ||
        isNaN(parseInt(params[1])) ||
        isNaN(parseInt(params[2])) ||
        !operationsArray.includes(params[0]))
    ) {
      router.push("/notfound");
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        {params?.length === 3 && <Calculator initialValue={params} />}
      </Stack>
    </Container>
  );
}
