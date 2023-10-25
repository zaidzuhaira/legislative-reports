export const convertArrayToCSV = (data: any[]): string => {
    const header = Object.keys(data[0]);
    const headerString = header.join(',');
    // handle null or undefined values here
    const replacer = (key: any, value: any) => value ?? '';
    const rowItems = data.map((row) =>
        header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(',')
    );
    // join header and body, and break into separate lines
    const csv = [headerString, ...rowItems].join('\r\n');
    return csv;
}