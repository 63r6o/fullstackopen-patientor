import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Dispatch } from "react";

interface Props {
  rating: number;
  setRating: Dispatch<React.SetStateAction<number>>;
}

const HealthCareFormControls = ({ rating, setRating }: Props) => {
  return (
    <FormControl required>
      <FormLabel>Health check rating</FormLabel>
      <RadioGroup
        value={rating}
        onChange={({ target }) => setRating(Number(target.value))}
      >
        <FormControlLabel value="0" control={<Radio />} label="Healthy" />
        <FormControlLabel value="1" control={<Radio />} label="Low Risk" />
        <FormControlLabel value="2" control={<Radio />} label="High Risk" />
        <FormControlLabel value="3" control={<Radio />} label="Critical Risk" />
      </RadioGroup>
    </FormControl>
  );
};

export default HealthCareFormControls;
