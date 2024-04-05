import { Response } from 'express';

export function sendErrorResponse({ error, res, message }: { res: Response; error?: any; message?: string }) {
  if (message) {
    res.status(500).send({ message: message });
  } else if (error) {
    res.status(500).send({ message: error.message });
  }
}
