import { NextApiRequest, NextApiResponse } from 'next';
import readCSVFile from '../../../utils/csvReader';
import { parseForm } from '../../../utils/formParser';
import { convertArrayToCSV } from '../../../utils/csvExporter';
import { countVotesByLegislator, countOpposedVotesByLegislator } from '../../../utils/calculateVotes';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { files } = await parseForm(req);

    if (!files || !files['legislators.csv'] || !files['vote_results.csv']) {
      throw new Error('CSV files not found');
    }

    const legislators = await readCSVFile(files['legislators.csv'].filepath);
    const vote_results = await readCSVFile(files['vote_results.csv'].filepath);


    let legislatorsReport: any[] = []
    legislators.forEach(legislator => {
      legislatorsReport.push({
        'id': legislator.id,
        'name': legislator.name,
        'num_supported_bills': countVotesByLegislator(vote_results, legislator.id),
        'num_opposed_bills': countOpposedVotesByLegislator(vote_results, legislator.id)
      })
    })
    const csv = convertArrayToCSV(legislatorsReport);

    // Set the HTTP headers for the response
    res.setHeader('Content-Disposition', 'attachment;filename=legislators-support-oppose-count.csv');
    res.setHeader('Content-Type', 'text/csv');

    // Send the CSV data as the response body
    res.send(csv);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
