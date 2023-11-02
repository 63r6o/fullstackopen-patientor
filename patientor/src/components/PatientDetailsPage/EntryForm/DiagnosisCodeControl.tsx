import { Dispatch, useEffect, useState } from "react";
import diagnosisService from "../../../services/diagnoses";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface Props {
  diagnosisCodes: string[];
  setDiagnosisCodes: Dispatch<React.SetStateAction<string[]>>;
}

const DiagnosisCodeControl = ({ diagnosisCodes, setDiagnosisCodes }: Props) => {
  const [codes, setCodes] = useState<string[]>([]);

  useEffect(() => {
    diagnosisService.getAll().then((ds) => setCodes(ds.map((d) => d.code)));
  }, []);

  // straight from the material ui docs
  const handleCodeChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCodes(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Diagnosis codes</InputLabel>
      <Select
        multiple
        fullWidth
        value={diagnosisCodes}
        onChange={handleCodeChange}
        input={<OutlinedInput label="Diagnosis codes" />}
      >
        {codes.map((code) => (
          <MenuItem key={code} value={code}>
            {code}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DiagnosisCodeControl;
