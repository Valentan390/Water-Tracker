import TimePicker from "../components/TimePicker";
import s from "./TimePickerContainer.module.css";

const TimePickerContainer = ({ setData, data }) => {
  return (
    <div className={s.timePickerCanteiner}>
      <p className={s.recordingTime}>Recording time:</p>
      <TimePicker setData={setData} data={data} />
    </div>
  );
};

export default TimePickerContainer;
