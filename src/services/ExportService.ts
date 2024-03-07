/**
 * Service for exporting collections of objects.
 */
export class ExportService {
  /**
   * Export a collection of items as a text file.
   *
   * @param filename the name of the file to export
   * @param rows the items to export to the file
   * @param stringifier how to convert each item to a string
   * @param separator how to separate each item in the output file
   */
  static exportToTxt<T>(
    filename: string,
    rows: T[],
    stringifier: (r: T) => string,
    separator: string = '\n\n',
  ) {
    this.downloadBlob(filename, rows.map(stringifier).join(separator), 'plain')
  }

  /**
   * Export a collection of items as a csv file.
   *
   * @param filename the name of the file to export
   * @param rows the items to export to the file
   * @param keys the keys (and order) to of properties of each item to export
   * @param displayKeys the header column names for the export file (default keys)
   */
  static exportToCsv<T extends Record<string, any>>(
    filename: string,
    rows: T[],
    keys?: (keyof T)[],
    displayKeys?: string[],
  ) {
    const csvContent = this.buildCsvString(rows, keys, displayKeys)
    this.downloadBlob(filename, csvContent)
  }

  private static buildCsvString<T extends Record<string, any>>(
    rows: T[],
    keys?: (keyof T)[],
    displayKeys?: string[],
  ) {
    const separator = ', '
    const header = keys ?? (Object.keys(rows[0]) as (keyof T)[])
    const headerDisplay: string[] = (displayKeys as string[]) ?? header

    return [
      headerDisplay.join(separator),
      ...rows.map((row) => this.stringifyRow(row, header, separator)),
    ].join('\n')
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
        }
        return cell
      })
      .join(separator)
  }

  private static downloadBlob(
    filename: string,
    content: string,
    format: 'csv' | 'plain' = 'csv',
  ) {
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

export default ExportService
