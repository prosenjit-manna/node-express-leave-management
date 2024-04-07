import { Response } from 'express';
import { ZodError } from 'zod';

export function sendErrorResponse({ error, res, message }: { res: Response; error?: any; message?: string }) {
  if (message) {
    res.status(500).json({ message: message });
  } else if (error) {
    if (error instanceof ZodError) {
      return res.status(500).json({ message: 'Data Validation Errors', errors: error.errors });
    }
    res.status(500).json({ message: error.message });
  }
}

export function sendForbiddenResponse({ error, res, message }: { res: Response; error?: any; message?: string }) {
  if (!message && !error) {
    return res.status(403).send({ message: 'Access Forbidden!' });
  } else if (message) {
    return res.status(403).send({ message: message });
  } else if (error) {
    return res.status(403).send({ message: error.message });
  }
}

export function sendSuccessResponse({ res, message, data }: { res: Response; message: string; data?: any }) {
  res.send({ message, data: data || {} });
}
