import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { endpoints } from "./constants";


export const imageOpts = [
    {id:'removebg', name: 'Remove Background', apiPath: endpoints.removeBg, icon: CalendarIcon, current: false, dst:"" },
    {id:'fillbg', name: 'Fill background', apiPath: endpoints.fillBg, icon: DocumentDuplicateIcon, current: false, dst:"" },
    {id: 'color-extract', name: 'Color Extract', apiPath: endpoints.colorExtract, icon: DocumentDuplicateIcon, current: false, dst:"" },
  ]
export  const imageConvertOpts = [
    {id:'jpeg2png', name: 'Convert JPEG to PNG', apiPath: endpoints.convertImage, icon: HomeIcon, current: true, dst:"png" },
    {id:'png2jpeg', name: 'Convert PNG to JPEG', apiPath: endpoints.convertImage, icon: HomeIcon, current: true, dst:"jpeg" },
    {id:'jpeg2webp', name: 'Convert JPEG to WEBP', apiPath: endpoints.convertImage, icon: HomeIcon, current: true, dst:"webp" },
    {id:'heic2jpeg', name: 'Convert HEIC to JPEG', apiPath: endpoints.convertHeic, icon: HomeIcon, current: true, dst:"JPEG" },
    {id:'heic2png', name: 'Convert HEIC to PNG', apiPath: endpoints.convertHeic, icon: UsersIcon, current: false, dst:"PNG" },
  ]
export const imageEditOpts = [
    {id: 'edit-image', name: 'Edit Image', apiPath: 'photoEditor/', icon: XMarkIcon, current: false, dst:"" },
]
export  const excelOpts = [
    {id:'xlsx2csv', name: 'Excel to CSV', apiPath: endpoints.convertExcel, icon: ChartPieIcon, current: false, dst:"csv" },
    {id:'csv2xlsx', name: 'CSV to Excel', apiPath: endpoints.convertExcel, icon: ChartPieIcon, current: false, dst:"xlsx" },
  ]
export  const docxPdfOpts = [
    {id:'docx2pdf', name: 'Word to Pdf', apiPath: endpoints.convertDocxPdf, icon: FolderIcon, current: false, dst:"" },
  ]

// combine all options
export const navOpts = [...imageOpts, ...imageConvertOpts, ...excelOpts, ...docxPdfOpts];