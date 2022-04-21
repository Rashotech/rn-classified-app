import React from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./ErrorMessage";
import CheckBox from "../AppCheckBox";
import colors from "../../config/colors";

function AppCheckbox({ name, title, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <CheckBox
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        onValueChange={() => setFieldValue(name, !values[name])}
        color={values[name] ? colors.primary : undefined}
        width={width}
        title={title}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppCheckbox;
