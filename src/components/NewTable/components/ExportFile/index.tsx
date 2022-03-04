/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
import React, { useCallback, useEffect, useState } from "react";
import { IconBaseProps } from "react-icons";
import {
  GrDocumentCsv,
  GrDocumentExcel,
  GrDocumentPdf,
  GrDocumentRtf,
  GrDocumentTxt,
  GrPrint,
} from "react-icons/gr";
import XLSX, { BookType } from "xlsx";
import { saveAs } from "file-saver";
import JsPDF from "jspdf";
import autotable from "jspdf-autotable";
import formatHeader from "../../utils/formatHeader";
import formatBody from "../../utils/formatBody";
import { Container, Content, TypeContainer } from "./styles";
import { HeaderProps } from "../..";
import LoaderPage from "../../../LoaderPage";

interface ExportFileProps {
  exportFile: string[] | "all";
  data: any;
  header: HeaderProps[];
}

type PDFProps = "pdf" | "print";

type TypeDownloadProps = PDFProps | BookType;

interface TypeProps {
  type: TypeDownloadProps;
  name: string;
  Icon: React.ComponentType<IconBaseProps>;
  handleClick: (type: any, dataTable: any[], header: HeaderProps[]) => void;
}

const ExportFile: React.FC<ExportFileProps> = ({
  exportFile,
  data,
  header,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSheet = useCallback(
    (type: BookType, dataTable: any[], headerTable: HeaderProps[]) => {
      const wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Portal da Transparencia",
        Subject: "Test",
        Author: "Pmfi",
        CreatedDate: new Date(),
      };
      wb.SheetNames.push("AAAAA");
      const ws = XLSX.utils.json_to_sheet(dataTable);
      wb.Sheets.AAAAA = ws;

      const wbout = XLSX.write(wb, { bookType: type, type: "binary" });

      saveAs(
        new Blob([s2ab(wbout)], { type: "application/octet-stram" }),
        `teste.${type}`,
      );
    },
    [],
  );
  const handlePDF = useCallback(
    (type: PDFProps, dataTable: any[], headerTable: HeaderProps[]) => {
      const doc = new JsPDF();
      autotable(doc, {
        head: formatHeader(headerTable),
        body: formatBody(dataTable, headerTable),
      });
      if (type === "pdf") {
        doc.save("table.pdf");
      }
      if (type === "print") {
        doc.autoPrint();
        doc.output("dataurlnewwindow");
      }
    },
    [],
  );

  const [allTypeFile, setAllTypeFile] = useState<TypeProps[]>([
    {
      type: "print",
      name: "Imprimir",
      Icon: GrPrint,
      handleClick: handlePDF,
    },
    {
      type: "pdf",
      name: "PDF",
      Icon: GrDocumentPdf,
      handleClick: handlePDF,
    },
    {
      type: "xls",
      name: "XLS",
      Icon: GrDocumentExcel,
      handleClick: handleSheet,
    },
    {
      type: "txt",
      name: "TXT",
      Icon: GrDocumentTxt,
      handleClick: handleSheet,
    },
    {
      type: "csv",
      name: "CSV",
      Icon: GrDocumentCsv,
      handleClick: handleSheet,
    },
    {
      type: "rtf",
      name: "RTF",
      Icon: GrDocumentRtf,
      handleClick: handleSheet,
    },
  ]);
  const [typeFiles, setTypeFiles] = useState<TypeProps[]>([]);

  function s2ab(s: any) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
  }
  useEffect(() => {
    if (exportFile === "all") {
      setTypeFiles(allTypeFile);
    } else {
      const selectTypeFiles = allTypeFile.filter(types =>
        exportFile.includes(types.type),
      );
      setTypeFiles(selectTypeFiles);
    }
  }, []);

  function determineIfIsBookTypeOrString(
    type: TypeDownloadProps,
    dataTable: any[],
    headerTable: HeaderProps[],
  ): type is PDFProps {
    if ((type as PDFProps) === "pdf" || (type as PDFProps) === "print") {
      handlePDF(type as PDFProps, dataTable, headerTable);
      return true;
    }
    handleSheet(type as BookType, dataTable, headerTable);
    return false;
  }

  return (
    <>
      <Container>
        <Content>
          {typeFiles.map(types => (
            <TypeContainer
              onClick={() =>
                determineIfIsBookTypeOrString(types.type, data, header)
              }
            >
              <types.Icon />
              <p>{types.name}</p>
            </TypeContainer>
          ))}
        </Content>
      </Container>
      <LoaderPage loading={loading} />
    </>
  );
};

export default ExportFile;
