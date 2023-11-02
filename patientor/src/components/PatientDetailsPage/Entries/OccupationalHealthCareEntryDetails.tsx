import { Card } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: OccupationalHealthcareEntry;
}
const OccupationalHealthcareEntryDetails = ({ entry }: Props) => (
  <Card sx={{ border: "1px solid black", padding: "4px", marginBottom: "4px" }}>
    <h3>
      {entry.date} <WorkIcon /> {entry.employerName}
    </h3>
    <i>{entry.description}</i>
    <p>diagnose by {entry.specialist}</p>
  </Card>
);

export default OccupationalHealthcareEntryDetails;
