export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
    convertImage: 'convert/image/',
    convertExcel: 'convert/xlsx-csv/',
    convertDocxPdf: 'convert/docx-to-pdf/',

    removeBg: 'image/remove-bg/',
    fillBg: 'image/fill-bg/',

    convertHeic: 'convert/heic/',
}
