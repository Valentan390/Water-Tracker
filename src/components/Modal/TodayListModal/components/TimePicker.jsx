import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledTimePicker } from "./timePicker.styles";

const TimePicker = ({ setData, data }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledTimePicker
        value={data}
        onChange={(newValue) => setData(newValue)}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
