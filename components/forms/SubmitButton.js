import React from "react";
import { useFormikContext } from "formik";

import Button from "../AppButton";

function SubmitButton({ title, type, width="100%" }) {
  const { handleSubmit, resetForm } = useFormikContext();

  return <Button title={title} width={width} onPress={type === 'clear' ? resetForm : handleSubmit} />;
}

export default SubmitButton;
