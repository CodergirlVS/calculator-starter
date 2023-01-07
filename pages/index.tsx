import { Typography, Container, Stack } from "@mui/material";
import Calculator from "../components/Calculator";


export default function Home(initialValue: string[]): JSX.Element {
  return (
    <Container maxWidth="sm">
      <Stack>
        <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
          The Amazing Calculator
        </Typography>
        <Calculator initialValue={initialValue}/>
      </Stack>
    </Container>
  );
}

