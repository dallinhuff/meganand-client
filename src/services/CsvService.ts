export class CsvService {
  static exportToCsv<T extends Record<string, any>>(
    filename: string,
    rows: T[],
    keys?: (keyof T)[],
  ) {
    const separator = ', '
    const header = keys ?? Object.keys(rows[0]) as (keyof T)[];
    const csvContent = [
      header.join(separator),
      ...rows.map((row) => this.stringifyRow(row, header, separator)),
    ].join('\n')

    this.downloadBlob(filename, csvContent)
  }

  private static stringifyRow<T extends Record<string, any>>(
    row: T,
    keys: (keyof T)[],
    separator: string,
  ) {
    return keys
      .map((k) => {
        let cell: any = row[k] ?? ''
        cell =
          cell instanceof Date
            ? cell.toLocaleString()
            : cell.toString().replace(/"/g, '""')
        if (cell.search(/([",\n])/g) >= 0) {
          cell = `"${cell}"`
          console.log(cell)
        }
        return cell
      })
      .join(separator)
  }

  static downloadBlob(filename: string, content: string, format: 'csv' | 'plain' = 'csv') {
    const blob = new Blob([content], {type: `text/${format};charset=utf-8;`})
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export default CsvService
