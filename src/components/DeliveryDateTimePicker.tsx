import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Stack } from "@mui/material";
import "dayjs/locale/ru";

import { ruRU } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";

const DeliveryDateTimePicker: React.FC<{
  label: string | null;
  setDateDelivery: Function | null;
  isReadOnly: boolean;
  defaultValue: string | null;
}> = ({
  label = "Дата и время доставки",
  setDateDelivery,
  isReadOnly,
  defaultValue = null,
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="ru"
      localeText={
        ruRU.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      <Stack spacing={2} direction="row" alignItems="center">
        <DateTimePicker
          disabled={isReadOnly}
          label={label}
          onChange={(newValue) => {
            if (setDateDelivery)
              setDateDelivery(newValue?.toISOString() || null);
          }}
          slotProps={{
            actionBar: {
              actions: ["clear", "accept"],
            },
          }}
          format="DD.MM.YYYY HH:mm"
          value={defaultValue ? dayjs(defaultValue) : null}
        />
      </Stack>
    </LocalizationProvider>
  );
};

export default DeliveryDateTimePicker;
