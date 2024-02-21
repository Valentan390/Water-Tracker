import { styled } from "@mui/system";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export const StyledTimePicker = styled(MobileTimePicker)(() => ({
  "&": {
    width: "100%",
  },
  "& .MuiInputBase-root-MuiOutlinedInput-root": {
    paddingRight: "0!important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "1px solid var(--light-blue-2)!important",
    paddingRight: "0!important",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd": {
    color: "var(--dark-blue)",
    borderRadius: "6px",
    padding: "12px 10px",
  },
}));
