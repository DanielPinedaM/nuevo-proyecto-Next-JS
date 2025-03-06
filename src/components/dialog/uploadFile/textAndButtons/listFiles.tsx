"use client";
import { IListFiles } from "@/types/interface/interface-upload-file";
import { truncateString } from "@/utils/func/general";
import dynamic from "next/dynamic";
const PrimeReactTooltip = dynamic(() => import("@/components/PrimeReactTooltip"));
const FaRegFileExcel = dynamic(() => import("react-icons/fa").then((mod) => mod.FaRegFileExcel));
const GrDocumentCsv = dynamic(() => import("react-icons/gr").then((mod) => mod.GrDocumentCsv));
const FaFilePdf = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFilePdf));
const FaRegFileImage = dynamic(() => import("react-icons/fa").then((mod) => mod.FaRegFileImage));
const FaFileWord = dynamic(() => import("react-icons/fa").then((mod) => mod.FaFileWord));
const FaFilePowerpoint = dynamic(() =>
  import("react-icons/fa6").then((mod) => mod.FaFilePowerpoint)
);
const BsFiletypeJson = dynamic(() => import("react-icons/bs").then((mod) => mod.BsFiletypeJson));
const TbFileTypeXml = dynamic(() => import("react-icons/tb").then((mod) => mod.TbFileTypeXml));
const MdDelete = dynamic(() => import("react-icons/md").then((mod) => mod.MdDelete));
const FaFileZipper = dynamic(() => import("react-icons/fa6").then((mod) => mod.FaFileZipper));

/**
Componente que lista los archivos cargados por react-dropzone
muestra un icono dependiendo del tipo de archivo cargado */
export default function ListFiles({ acceptedFile, onClickDeleteFile, i }: IListFiles) {
  const { name, size, type } = acceptedFile;

  /* tipos de archivos
  https://stackoverflow.com/questions/4212861/what-is-a-correct-mime-type-for-docx-pptx-etc */
  const ReactIcons = () => {
    if (
      type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      name.endsWith("xlsx")
    ) {
      return <FaRegFileExcel className="text-green-600 text-2xl" />;
    } else if (type === "text/csv" || name.endsWith("csv")) {
      return <GrDocumentCsv className="text-green-600 text-2xl" />;
    } else if (type === "application/pdf" || name.endsWith("pdf")) {
      return <FaFilePdf className="text-red-600 text-2xl" />;
    } else if (
      type.startsWith("image/") ||
      name.endsWith("jpg") ||
      name.endsWith("jpeg") ||
      name.endsWith("png")
    ) {
      return <FaRegFileImage className="text-blue-600 text-2xl" />;
    } else if (
      type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      type === "application/msword" ||
      name.endsWith("docx") ||
      name.endsWith("doc")
    ) {
      return <FaFileWord className="text-blue-600 text-2xl" />;
    } else if (name.endsWith("ppt") || name.endsWith("pptx") || name.endsWith("pptm")) {
      return <FaFilePowerpoint className="text-orange-600 text-2xl" />;
    } else if (type === "application/json" || name.endsWith("json")) {
      return <BsFiletypeJson className="text-2xl" />;
    } else if (type === "application/xml" || name.endsWith("xml")) {
      return <TbFileTypeXml className="text-2xl" />;
    } else if (
      type === "application/zip" ||
      name.endsWith("zip") ||
      type === "application/x-rar-compressed" ||
      name.endsWith("rar")
    ) {
      return <FaFileZipper className="text-2xl" />;
    } else {
      return null;
    }
  };

  return (
    <div className="flex justify-between items-center mb-2 gap-x-6">
      <div className="flex gap-x-2 items-center">
        <ReactIcons />
        <p>{truncateString(name, 40)}</p>
      </div>

      <div className="flex items-center gap-x-2">
        <p>
          <span>{size}</span> <span>Bytes</span>
        </p>

        <PrimeReactTooltip
          target={`tooltip-delete-file-${i}`}
          content={`Borrar ${name}`}
          position="top"
        />
        <button className={`tooltip-delete-file-${i}`} onClick={() => onClickDeleteFile(i)}>
          <MdDelete className="text-red-600" />
        </button>
      </div>
    </div>
  );
}
