import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    console.log('GET');
    const resultsPath = path.join(process.cwd(), 'content', 'results.json');
    const groupResultsFile = fs.readFileSync(resultsPath, 'utf8');
    const results = JSON.parse(groupResultsFile);

    const num = parseInt(results?.num || 0);
    const newNum = num + 1;

    const newResults = {
      num: newNum,
    };

    fs.writeFileSync(resultsPath, JSON.stringify(newResults, null, 2));

    res.status(200).json({ newResults });
  }
}
