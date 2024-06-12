import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { cs } from "date-fns/locale/cs";

export function DateModule({ sendDate }) {
  const handleAccept = (date) => {
    sendDate(date);
    console.log(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
      <DatePicker
        onAccept={(value) => {
          console.log(value);
          handleAccept(
            value.toLocaleString().slice(0, 10).replaceAll("/", "-"),
          );
        }}
      />
    </LocalizationProvider>
  );
}
