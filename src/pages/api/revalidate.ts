import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  /*
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }
  */

  try {
    const path = req.body.path;
    await res.revalidate(path);
    //console.log(`${path} was revalidated`);
    return res.json({ revalidated: true });
  } catch (err) {
    //will still show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
