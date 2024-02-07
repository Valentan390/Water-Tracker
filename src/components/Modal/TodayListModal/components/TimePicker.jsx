import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledTimePicker } from "./timePicker.styles";

const TimePicker = ({ setData, data }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledTimePicker
        value={data}
        onChange={(newValue) => setData(newValue)}
        views={["hours", "minutes"]}
        format="HH:mm"
        timeSteps={{ minutes: 1 }}
        ampm={false}
      />
    </LocalizationProvider>
  );
};

export default TimePicker;
