import { useEffect, useState } from "react";
import { Entry, EntryFormValues, PatientDetail } from "../../types";
import patientService from "../../services/patients";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import EntryDetails from "./Entries/index";
import { useParams } from "react-router-dom";
import EntryForm from "./EntryForm/index";
import { Alert, Button, Grid } from "@mui/material";
import axios from "axios";

const PatientDetailsPage = () => {
  const params = useParams();

  const [patientDetail, setNewPatientDetail] = useState<PatientDetail>();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<string>();
  const [formType, setFormType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >();

  const signalError = (message: string) => {
    setError(message);
    setTimeout(() => setError(undefined), 5000);
  };

  useEffect(() => {
    if (!params.id) return;

    patientService.getById(params.id).then((p) => {
      setNewPatientDetail(p);
      setEntries(p.entries);
    });
  }, [params.id]);

  if (!patientDetail) {
    return (
      <div>
        {error && <Alert severity="error">{error}</Alert>}
        Loading...
      </div>
    );
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(patientDetail.id, values);
      setEntries(entries.concat(entry));
      setFormType(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            ""
          );
          console.error(message);
          signalError(message);
        } else {
          signalError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        signalError("Unknown error");
      }
    }
  };

  const genderIcon =
    patientDetail.gender === "female" ? (
      <FemaleIcon />
    ) : patientDetail.gender === "male" ? (
      <MaleIcon />
    ) : (
      <TransgenderIcon />
    );

  return (
    <div>
      <h2>
        {patientDetail.name} {genderIcon}
      </h2>
      <p>ssn: {patientDetail.ssn}</p>
      <p>occupation: {patientDetail.occupation}</p>
      {error && (
        <Alert severity="error" style={{ marginBottom: "8px" }}>
          {error}
        </Alert>
      )}
      <Grid
        justifyContent="space-between"
        container
        direction="row"
        style={{ marginBottom: "16px" }}
      >
        <Button
          type="button"
          size="small"
          color="primary"
          variant="contained"
          onClick={() => setFormType("HealthCheck")}
        >
          New HealtchCheck
        </Button>
        <Button
          type="button"
          size="small"
          color="primary"
          variant="contained"
          onClick={() => setFormType("Hospital")}
        >
          New Hospital Entry
        </Button>
        <Button
          type="button"
          size="small"
          color="primary"
          variant="contained"
          onClick={() => setFormType("OccupationalHealthcare")}
        >
          New Occupational Entry
        </Button>
      </Grid>
      {formType && (
        <EntryForm
          onCancel={() => setFormType(undefined)}
          onSubmit={submitNewEntry}
          type={formType}
        />
      )}
      <h3>entries</h3>
      {entries &&
        entries.map((entry) => <EntryDetails key={entry.id} entry={entry} />)}
    </div>
  );
};

export default PatientDetailsPage;
