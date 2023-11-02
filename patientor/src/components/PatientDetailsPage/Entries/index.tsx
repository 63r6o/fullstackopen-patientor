import { Entry } from "../../../types";
import HospitalEntryDetails from "./HospitalEntryDetails";
import { assertNever } from "../../../utils";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import OccupationalHealthcareEntryDetails from "./OccupationalHealthCareEntryDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
