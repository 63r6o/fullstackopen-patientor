import { FormGroup, FormLabel, Input, TextField } from "@mui/material";
import { Dispatch } from "react";

interface Props {
  employerName: string;
  setEmployerName: Dispatch<React.SetStateAction<string>>;
  sickLeaveStartDate: string;
  setSickLeaveStartDate: Dispatch<React.SetStateAction<string>>;
  sickLeaveEndDate: string;
  setSickLeaveEndDate: Dispatch<React.SetStateAction<string>>;
}

const OccupationalFormControls = ({
  employerName,
  setEmployerName,
  sickLeaveStartDate,
  setSickLeaveStartDate,
  sickLeaveEndDate,
  setSickLeaveEndDate,
}: Props) => {
  return (
    <>
      <TextField
        label="Employer"
        required
        fullWidth
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        style={{ marginBottom: "4px" }}
      />
      <FormGroup>
        <FormLabel>
          Sick Leave
          <FormGroup style={{ padding: "16px" }}>
            <FormLabel>
              Start
              <Input
                type="date"
                fullWidth
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
                style={{ marginBottom: "4px" }}
              />
              <FormLabel>
                End
                <Input
                  type="date"
                  fullWidth
                  value={sickLeaveEndDate}
                  onChange={({ target }) => setSickLeaveEndDate(target.value)}
                  style={{ marginBottom: "4px" }}
                />
              </FormLabel>
            </FormLabel>
          </FormGroup>
        </FormLabel>
      </FormGroup>
    </>
  );
};

export default OccupationalFormControls;
