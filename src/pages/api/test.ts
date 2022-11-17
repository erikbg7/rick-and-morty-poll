import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('POST');
    const filePath = path.join(process.cwd(), 'content', 'results.txt');
    const num = fs.readFileSync(filePath, 'utf-8');
    const editedNum = parseInt(num) + 1;
    fs.writeFileSync(filePath, editedNum.toString());
    res.status(200).json({ num: editedNum });
  }

  if (req.method === 'GET') {
    console.log('GET');
    const filePath = path.join(process.cwd(), 'content', 'results.txt');
    const num = fs.readFileSync(filePath, 'utf-8');
    res.status(200).json({ num });
  }
}
