import { Card } from "@mui/material";
import { HealthCheckEntry } from "../../../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import RatingIcon from "./RatingIcon";

interface Props {
  entry: HealthCheckEntry;
}
const HealthCheckEntryDetails = ({ entry }: Props) => (
  <Card sx={{ border: "1px solid black", padding: "4px", marginBottom: "4px" }}>
    <h3>
      {entry.date} <HealthAndSafetyIcon />
    </h3>
    <i>{entry.description}</i>
    <div>
      <RatingIcon rating={entry.healthCheckRating} />
    </div>
    <p>diagnose by {entry.specialist}</p>
  </Card>
);

export default HealthCheckEntryDetails;
