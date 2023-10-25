import { NextApiRequest, NextApiResponse } from 'next';
import readCSVFile from '../../../utils/csvReader';
import { parseForm } from '../../../utils/formParser';
import { convertArrayToCSV } from '../../../utils/csvExporter';
import { countOpposedVotesByBill, countVotesByBill } from '../../../utils/calculateBills';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {

  try {
    const { files } = await parseForm(req);

    if (!files['bills.csv'] || !files['votes.csv'] || !files['vote_results.csv'] || !files['legislators.csv']) {
      throw new Error('One or more required CSV files are missing');
    }

    const legislators = await readCSVFile(files['legislators.csv'].filepath);
    const bills = await readCSVFile(files['bills.csv'].filepath);
    const votes = await readCSVFile(files['votes.csv'].filepath);
    const vote_results = await readCSVFile(files['vote_results.csv'].filepath);

    const getLegislatorById = (id: string) => legislators.find(legislator => legislator.id === id);

    let billsReport: any[] = []
    bills.forEach(bill => {
      billsReport.push({
        'id': bill.id,
        'title': bill.title,
        'supporter_count': countVotesByBill(vote_results, votes, bill.id),
        'opposer_count': countOpposedVotesByBill(vote_results, votes, bill.id),
        'primary_sponsor': getLegislatorById(bill.sponsor_id)?.name || "Unknown",
      })
    })
    const csv = convertArrayToCSV(billsReport);

    // Set the HTTP headers for the response
    res.setHeader('Content-Disposition', 'attachment;filename=bills.csv');
    res.setHeader('Content-Type', 'text/csv');

    // Send the CSV data as the response body
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
