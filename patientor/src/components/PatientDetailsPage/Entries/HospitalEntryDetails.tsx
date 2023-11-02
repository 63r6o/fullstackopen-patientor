import { Card } from "@mui/material";
import { HospitalEntry } from "../../../types";
import MedicationIcon from "@mui/icons-material/Medication";

interface Props {
  entry: HospitalEntry;
}
const HospitalEntryDetails = ({ entry }: Props) => (
  <Card sx={{ border: "1px solid black", padding: "4px", marginBottom: "4px" }}>
    <h3>
      {entry.date} <MedicationIcon />
    </h3>
    <i>{entry.description}</i>
    <p>diagnose by {entry.specialist}</p>
  </Card>
);

export default HospitalEntryDetails;
