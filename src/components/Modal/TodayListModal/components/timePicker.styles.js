import { styled } from "@mui/system";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

export const StyledTimePicker = styled(MobileTimePicker)(() => ({
  "&": {
    width: "100%",
  },
  "& .MuiInputBase-root-MuiOutlinedInput-root": {
    // borderColor: "red",
    // color: "red!important",
    paddingRight: "0!important",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    // border: "1px solid red!important",
    border: "1px solid var(--light-blue-2)!important",
    paddingRight: "0!important",
  },
  "& .MuiInputBase-input-MuiOutlinedInput-input": {
    // color: "red",
  },
  "& .MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputAdornedEnd": {
    color: "var(--dark-blue)",
    // border: "1px solid var(--dark-blue)",
    borderRadius: "6px",
    padding: "12px 10px",
  },
}));
