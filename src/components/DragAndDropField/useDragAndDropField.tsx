import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type { DragAndDropFieldProps } from "./types"
import { useIntl } from "react-intl";

export const useDragAndDropField = (props: DragAndDropFieldProps) => {
 
  const intl = useIntl();
  
  const [files, setFiles] = useState([]);
  
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: props?.multiple,
    accept: props?.acepted ? props?.acepted : {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "application/pdf": [],
      "application/vnd.ms-excel": [],
      "audio/*": [],
      "video/*": [],
      ".doc": [],
      ".docx": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    onDrop: (acceptedFiles: any) => {
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
        ,);
      setTimeout(() => {
        props?.onAction && props?.onAction(acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ));
      }, 1000);
    },
  });

  const thumbs = files.map((file: any, a: number) => {
    return (
      <div key={a} style={{textAlign:'left'}}>
        <h5 style={{}}>{file?.name}</h5>
      </div>
    )
  });

  const readableTypes: any = {
    "image/jpeg": intl.formatMessage({ id: 'general.imagenes.jpeg' }),
    "image/jpg": intl.formatMessage({ id: 'general.imagenes.jpg' }),
    "image/png": intl.formatMessage({ id: 'general.imagenes.png' }),
    "application/pdf": intl.formatMessage({ id: 'general.documentos.pdf' }),
    "application/vnd.ms-excel": intl.formatMessage({ id: 'general.documentos.xls' }) ,
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": intl.formatMessage({ id: 'general.documentos.xlsx' }),
    "audio/*": intl.formatMessage({ id: 'general.documentos.audio' }),
    "video/*": intl.formatMessage({ id: 'general.documentos.video' }),
    ".doc": intl.formatMessage({ id: 'general.documentos.doc' }) ,
    ".docx": intl.formatMessage({ id: 'general.documentos.docx' }) ,
    "application/msword": intl.formatMessage({ id: 'general.documentos.word' }),
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": intl.formatMessage({ id: 'general.documentos.word' }) 
  };


  const FileTypeList = () => {
    return (
      <ul style={{textAlign:'left'}}>
        {Object.keys(props?.acepted ? props?.acepted : {
          "image/jpeg": [],
          "image/jpg": [],
          "image/png": [],
          "application/pdf": [],
          "application/vnd.ms-excel": [],
          "audio/*": [],
          "video/*": [],
          ".doc": [],
          ".docx": [],
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        }).map((type) => (
          <li key={type}>{readableTypes[type] || type}</li>
        ))}
      </ul>
    );
  };

  return {
    intl,
    getRootProps,
    getInputProps,
    acceptedFiles,
    files,
    thumbs,
    FileTypeList
  }
}