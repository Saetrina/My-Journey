import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { cs } from "date-fns/locale/cs";

export function DateModule({ sendDate }) {
  const handleAccept = (date) => {
    sendDate(date);
    console.log("EDITED " + date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={cs}>
      <DatePicker
        onAccept={(value) => {
          handleAccept(
            value
              .toLocaleDateString("cs", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .replaceAll(". ", "-")
          );
        }}
      />
    </LocalizationProvider>
  );
}
