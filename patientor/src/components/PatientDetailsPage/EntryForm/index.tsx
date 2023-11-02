import { Button, FormLabel, Grid, Input, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues, HealthCheckRating } from "../../../types";
import HealthCareFormControls from "./HealthCheckForm";
import HospitalFormControls from "./HospitalFormControls";
import { assertNever } from "../../../utils";
import OccupationalFormControls from "./OccupationalFormControl";
import DiagnosisCodeControl from "./DiagnosisCodeControl";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  type: "HealthCheck" | "Hospital" | "OccupationalHealthcare";
}

const EntryForm = ({ onCancel, onSubmit, type }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [rating, setRating] = useState(0);

  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  const addHealthCheckEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating: rating as HealthCheckRating,
    });
  };

  const addHospitalEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: "Hospital",
      discharge: {
        criteria,
        date: dischargeDate,
      },
    });
  };

  const addOccupationalEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      description,
      date,
      specialist,
      diagnosisCodes,
      type: "OccupationalHealthcare",
      employerName,
      sickLeave:
        sickLeaveStartDate.length && sickLeaveEndDate.length
          ? {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          }
          : undefined,
    });
  };

  const submit = (e: SyntheticEvent) => {
    switch (type) {
      case "HealthCheck":
        addHealthCheckEntry(e);
        break;
      case "Hospital":
        addHospitalEntry(e);
        break;
      case "OccupationalHealthcare":
        addOccupationalEntry(e);
        break;
      default:
        assertNever(type);
    }
  };

  const formTitle = () => {
    switch (type) {
      case "HealthCheck":
        return "Health Check";
      case "Hospital":
        return "Hospital";
      case "OccupationalHealthcare":
        return "Occupational Health Care";
      default:
        assertNever(type);
    }
  };

  return (
    <div style={{ border: "1px dotted black", padding: "8px" }}>
      <h3>New {formTitle()} entry</h3>
      <form onSubmit={submit}>
        <TextField
          label="Description"
          required
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginBottom: "4px", width: "100%" }}
        />
        <FormLabel>
          Date
          <Input
            type="date"
            required
            fullWidth
            value={date}
            onChange={({ target }) => setDate(target.value)}
            style={{ marginBottom: "4px" }}
          />
        </FormLabel>
        <TextField
          label="Specialist"
          required
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginBottom: "4px" }}
        />
        <DiagnosisCodeControl
          diagnosisCodes={diagnosisCodes}
          setDiagnosisCodes={setDiagnosisCodes}
        />
        {type === "HealthCheck" && (
          <HealthCareFormControls rating={rating} setRating={setRating} />
        )}
        {type === "Hospital" && (
          <HospitalFormControls
            criteria={criteria}
            setCriteria={setCriteria}
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
          />
        )}
        {type === "OccupationalHealthcare" && (
          <OccupationalFormControls
            employerName={employerName}
            setEmployerName={setEmployerName}
            sickLeaveStartDate={sickLeaveStartDate}
            setSickLeaveStartDate={setSickLeaveStartDate}
            sickLeaveEndDate={sickLeaveEndDate}
            setSickLeaveEndDate={setSickLeaveEndDate}
          />
        )}
        <Grid
          justifyContent="space-between"
          container
          direction="row"
          style={{ marginTop: "8px" }}
        >
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default EntryForm;
