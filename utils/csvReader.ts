import Papa from 'papaparse';
import * as fs from 'fs';

async function readCSVFile(path: string): Promise<any[]> {
  const contents = fs.readFileSync(path, 'utf8');
  const parsePromise = new Promise<any[]>((resolve) => {
    Papa.parse(contents, {
      header: true,
      complete: (result) => {
        resolve(result.data);
      }
    });
  });
  
  return await parsePromise;
}

export default readCSVFile;
