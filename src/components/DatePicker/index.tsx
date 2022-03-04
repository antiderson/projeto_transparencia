import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useField } from "@unform/core";

import "react-datepicker/dist/react-datepicker.css";
import { Container } from "./styles";

interface Props extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
}

const DatePicker: React.FC<Props> = ({ name, ...rest }) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      path: "props.selected",
      clearValue: (ref: any) => {
        ref.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <ReactDatePicker
        ref={datepickerRef}
        selected={date}
        onChange={setDate}
        {...rest}
      />
    </Container>
  );
};
export default DatePicker;
