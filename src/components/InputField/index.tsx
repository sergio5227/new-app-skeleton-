import React from "react";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import type { InputFieldProps } from "./types";
import Form from 'react-bootstrap/Form';
import { useInputField } from "./useInputField";
import "./index.css";
import { Button, InputGroup } from "react-bootstrap";
import CheckIcon from '@mui/icons-material/Check';
import _ from "lodash";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from "@mui/material";
const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {

  const {
    showFeedback,
    isValid,
    handleFocus,
    field,
    errorMessage,
    formik,
    esError,
    newPros
  } = useInputField(props);

  return (
    <div
      className={`${showFeedback ? isValid : ""}`}
      data-testid="input-field-container"
    >
      {props?.type !== "textArea" && (
        <>
          {props?.label && <Form.Label style={{ fontSize: 15, float: 'left', paddingLeft: 5 }}>{props?.label} {
            props?.info ?
              <Tooltip title={props?.info || ''} style={{ cursor: 'help' }}>
                <QuestionMarkIcon color="info" />
              </Tooltip>
              : null
          }  </Form.Label>}

          <InputGroup className="mb-3" style={esError ? { border: 'solid 1px red', borderRadius: '8px' } : formik?.touched || (!formik?.error && !_.isEmpty(formik?.value)) ? { border: 'solid 1px #01db01', borderRadius: '8px' } : { borderRadius: '8px' }}>
            <Form.Control
              placeholder={props?.placeholder || ""}
              onFocus={handleFocus}
              {...newPros}
              {...field}
            //style={{ border: 'none', }}
            />
            {esError || (formik?.touched && !formik?.error && !_.isEmpty(formik?.value)) ? <Button variant="outline-secondary" style={{ border: '1px solid rgb(227 215 215)', borderLeft: 'none' }} id="button-addon2">
              {
                esError ? <ErrorOutlineIcon color="error" /> :
                  formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ?
                    <CheckIcon color="success" /> : null
              }
            </Button> : null}
            {
              props?.onEdit ?
                <Button variant="outline-primary" id="button-addon3" onClick={() => {
                  props?.onEdit && props?.onEdit()
                }}>
                  <EditIcon />
                </Button>
                : null
            }

          </InputGroup>
        </>
      )}



      {props?.type === "textArea" && (
        <>
          {props?.label && <Form.Label style={{ fontSize: 14 }}>{props?.label}</Form.Label>}
          <InputGroup size="sm" className="mb-3" style={esError ? { border: 'solid 1px red', borderRadius: '8px' } : formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ? { border: 'solid 1px green', borderRadius: '8px' } : { borderRadius: '8px' }}>
            <Form.Control
              placeholder={props?.placeholder || ""}
              onFocus={handleFocus}
              {...props}
              {...field}
              as="textarea"
              style={{ borderRight: 'none' }}
            />
            {esError || (formik?.touched && !formik?.error && !_.isEmpty(formik?.value)) ? <Button variant="outline-secondary" style={{ border: '1px solid rgb(227 215 215)', borderLeft: 'none' }} id="button-addon2">
              {
                esError ? <ErrorOutlineIcon color="error" /> :
                  formik?.touched && !formik?.error && !_.isEmpty(formik?.value) ?
                    <CheckIcon color="success" /> : null
              }
            </Button> : null}
          </InputGroup>
        </>
      )}


      <div className="flex items-center space-between">
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live="polite"
            className="feedback text-sm"
            style={{ textAlign: "left", paddingLeft: "5px", color: "red", fontWeight: 'normal', fontSize: '12px' }}
          >
            {errorMessage}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputField;