import React, { useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import CheckBox from "../AppCheckBox";

function AppCheckbox({ name, width, ...otherProps }) {
  const [isChecked, setChecked] = useState(false);
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <CheckBox
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        onValueChange={() => setFieldValue(name, setChecked)}
        color={isChecked ? "#4630EB" : undefined}
        width={width}
        name={name}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppCheckbox;
