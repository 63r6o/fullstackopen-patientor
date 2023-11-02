import { FormLabel, Input, TextField } from "@mui/material";
import { Dispatch } from "react";

interface Props {
  dischargeDate: string;
  setDischargeDate: Dispatch<React.SetStateAction<string>>;
  criteria: string;
  setCriteria: Dispatch<React.SetStateAction<string>>;
}

const HospitalFormControls = ({
  dischargeDate,
  setDischargeDate,
  criteria,
  setCriteria,
}: Props) => {
  return (
    <>
      <FormLabel>
        Discharge date
        <Input
          type="date"
          fullWidth
          required
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          style={{ marginBottom: "4px" }}
        />
      </FormLabel>
      <TextField
        label="Criteria"
        fullWidth
        required
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
      />
    </>
  );
};

export default HospitalFormControls;
