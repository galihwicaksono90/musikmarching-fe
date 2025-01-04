export function getPurchaseInvoiceNumber(serial: number) {
  return `INV-${serial % 10}`
}

export function getPurchaseStatusLabel(status: boolean) {
  return status ? 'Terverifikasi' : 'Belum terverifikasi'
}

