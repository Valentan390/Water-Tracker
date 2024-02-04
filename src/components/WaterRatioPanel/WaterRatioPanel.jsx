// import s from './WaterRatioPanel.module.css'
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

const WaterRatioPanel = () => {
  const StyledSlider = styled(Slider)(() => ({
    "& .MuiSlider-valueLabelOpen": {
      transform: "translateY(40px) scale(1)",
    },
    "& .MuiSlider-valueLabel": {
      color: "#407BFF",
      backgroundColor: "white",
    },
    "& .MuiSlider-valueLabel::before": {
      color: "#407BFF",
      transform: "translate(-50%, -330%)",
      width: "1px",
      backgroundColor: "#D7E3FF",
    },
    "& .MuiSlider-thumb:hover": {
      boxShadow: "none",
    },
    ".MuiSlider-thumb ": {
      backgroundColor: "white",
      border: "2px solid #407BFF",
      "&.Mui-active": {
        boxShadow: "none",
      },
      "&::before": {
        boxShadow: "none",
      },
    },
  }));

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
  return (
    <div>
      WaterRatioPanel
      <StyledSlider
        aria-label="Volume"
        value={50}
        onChange={() => {}}
        valueLabelDisplay="on"
        marks={marks}
        valueLabelFormat={() => `50%`}
      />
    </div>
  );
};

export default WaterRatioPanel;
