import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { endpoints } from "./constants";

export type NavOpt = {
  id : string;
  name: string;
  apiPath: string;
  icon: any;
  hasPath: boolean;
  dst: string;
}


export const imageOpts : NavOpt[] = [
    {id:'removebg', name: 'Remove Background', apiPath: endpoints.removeBg, icon: CalendarIcon, hasPath: false, dst:"" },
    {id:'fillbg', name: 'Fill background', apiPath: endpoints.fillBg, icon: DocumentDuplicateIcon, hasPath: false, dst:"" },
    {id: 'color-extract', name: 'Color Extract', apiPath: endpoints.colorExtract, icon: DocumentDuplicateIcon, hasPath: false, dst:"" },
  ]
export  const imageConvertOpts : NavOpt[] = [
    {id:'jpeg2png', name: 'Convert JPEG to PNG', apiPath: endpoints.convertImage, icon: HomeIcon, hasPath: false, dst:"png" },
    {id:'png2jpeg', name: 'Convert PNG to JPEG', apiPath: endpoints.convertImage, icon: HomeIcon, hasPath: false, dst:"jpeg" },
    {id:'jpeg2webp', name: 'Convert JPEG to WEBP', apiPath: endpoints.convertImage, icon: HomeIcon, hasPath: false, dst:"webp" },
    {id:'heic2jpeg', name: 'Convert HEIC to JPEG', apiPath: endpoints.convertHeic, icon: HomeIcon, hasPath: false, dst:"JPEG" },
    {id:'heic2png', name: 'Convert HEIC to PNG', apiPath: endpoints.convertHeic, icon: UsersIcon, hasPath: false, dst:"PNG" },
  ]
export const imageEditOpts : NavOpt[] = [
    {id: 'edit-image', name: 'Edit Image', apiPath: 'imageEditor/', icon: XMarkIcon, hasPath: true, dst:"" },
    {id: 'crop-image', name: 'Crop Image', apiPath: 'imageCrop/', icon: XMarkIcon, hasPath: true, dst:"" }
]
export  const excelOpts = [
    {id:'xlsx2csv', name: 'Excel to CSV', apiPath: endpoints.convertExcel, icon: ChartPieIcon, hasPath: false, dst:"csv" },
    {id:'csv2xlsx', name: 'CSV to Excel', apiPath: endpoints.convertExcel, icon: ChartPieIcon, hasPath: false, dst:"xlsx" },
  ]
export  const docxPdfOpts = [
    {id:'docx2pdf', name: 'Word to Pdf', apiPath: endpoints.convertDocxPdf, icon: FolderIcon, hasPath: false, dst:"" },
  ]

// combine all options
export const navOpts = [...imageOpts, ...imageConvertOpts, ...excelOpts, ...docxPdfOpts];