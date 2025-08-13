import React from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Button } from "react-bootstrap";
import "./index.css";
import type { DragAndDropFieldProps } from "./types";
import { useDragAndDropField } from "./useDragAndDropField";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

const DragAndDropField: React.FC<DragAndDropFieldProps> = (props: DragAndDropFieldProps) => {
  
  const {
    intl,
    getRootProps,
    getInputProps,
    acceptedFiles,
    files,
    thumbs,
    FileTypeList
  } = useDragAndDropField(props);

  return (
    <section className="container" data-testid="drag-and-drop-field">
      <div className={"drag-zone"} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{props?.multiple ? intl.formatMessage({ id: 'drag.drop.titulo.uno' }) : intl.formatMessage({ id: 'drag.drop.titulo.dos' })}</p>
      </div>
      {props?.muestraBoton ? <div style={{ float: "right", position: "relative", top: "10px" }}>
        <Button
          variant="primary"
          disabled={!acceptedFiles?.length}
          onClick={() => {
            props?.onAction && props?.onAction(files);
          }}
        >
          {intl.formatMessage({ id: 'drag.drop.titulo.tres' })}{acceptedFiles?.length > 1 ? "(s)" : ""}
        </Button>
      </div> : null}
      <aside>
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">{intl.formatMessage({ id: 'drag.drop.titulo.cuatro' })}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {FileTypeList()}
            </AccordionDetails>
          </Accordion>


        </>

        <br></br>
        <h5 style={{textAlign:'left'}}>{intl.formatMessage({ id: 'general.archivo' })}</h5>
        <>{thumbs}</>
      </aside>
    </section>
  );
};

export default DragAndDropField;
