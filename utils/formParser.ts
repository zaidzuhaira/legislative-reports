import formidable from "formidable";
import type { NextApiRequest } from "next";

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: any }> => {
  const form = formidable({ multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject("error");
      }
      resolve({ fields, files });
    });
  });
};