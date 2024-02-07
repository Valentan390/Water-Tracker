import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/system";

const marks = [
  {
    value: 0,
    label: "0%",
  },

  {
    value: 100,
    label: "100%",
  },
];

const StyledSlider = styled(Slider)(() => ({
  cursor: "default",

  "& .MuiSlider-thumb": {
    backgroundColor: "white",
    color: "red",
    border: "2px solid #407BFF",
    width: "20px",
    height: "20px",
  },

  "& .MuiSlider-rail": {
    color: "var(--Secondary-color-5, #D7E3FF)",
    borderRadius: "10px",
    height: "8px",
  },

  "& .MuiSlider-track": {
    color: "var(--Secondary-color-4, #9EBBFF)",
    borderRadius: "10px",
    height: "8px",
  },

  "& .MuiSlider-mark": {
    width: "0",
    height: "0",
    borderRadius: "0",
  },

  "& .MuiSlider-markLabel": {
    color: "var(--dark-blue)",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "16px",
    top: "44px",
  },

  "& .MuiSlider-markLabel::before": {
    position: "absolute",
    content: '""',
    width: "3px",
    height: "11px",
    transform: "translate(0, 0) rotate(0)",
    backgroundColor: "var(--light-blue-2)",
    bottom: "18px",
    left: "9px",
  },

  "& .MuiSlider-valueLabel.MuiSlider-valueLabelOpen": {
    backgroundColor: "transparent",
    transform: "translateY(150%) scale(1)",
    color: "var(--dark-blue)",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "20px",
  },

  "& .MuiSlider-valueLabel::before": {
    width: "3px",
    height: "11px",
    transform: "translate(0, 0) rotate(0)",
    backgroundColor: "var(--light-blue-2)",
    bottom: "24px",
    left: "24px",
  },

  "& .MuiSlider-thumb:hover": {
    boxShadow: "none",
  },
}));

function valuetext(value) {
  return `${value}%`;
}

export default function DiscreteSliderLabel({ percentDailyNorma }) {
  return (
    <Box sx={{ width: "391px", marginLeft: "8px" }}>
      <StyledSlider
        aria-label="Volume"
        value={percentDailyNorma}
        valueLabelFormat={valuetext}
        marks={marks}
        valueLabelDisplay="on"
      />
    </Box>
  );
}
