import { Request, Response } from 'express';
import { getPrivileges } from '../../lib/getPrivileges';

export async function getPrivilegesController(req: Request, res: Response) {
  if (req.role) {
    res.send(getPrivileges(req.role));
  } else {
    res.send({ message: 'No Auth available ' });
  }
}
