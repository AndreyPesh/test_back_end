export const setHeadersForPdf = (bufferLength: number) => {
  return {
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename=example.pdf',
    'Content-Length': bufferLength,
  };
};
