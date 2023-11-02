import FavoriteIcon from "@mui/icons-material/Favorite";
import { HealthCheckRating } from "../../../types";
import { assertNever } from "../../../utils";

interface Props {
  rating: HealthCheckRating;
}

const RatingIcon = ({ rating }: Props) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon sx={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon sx={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon sx={{ color: "purple" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon sx={{ color: "red" }} />;
    default:
      assertNever(rating);
  }
};

export default RatingIcon;
