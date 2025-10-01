import { Request, Response, NextFunction } from 'express';
import { validationResult, Result, ValidationError } from 'express-validator';
import { logger } from '../utils/logger';

/**
 * Middleware to validate request using express-validator
 * If validation fails, it will return a 400 response with the validation errors
 * If validation passes, it will call next()
 */
export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    logger.warn('Validation failed', { 
      path: req.path,
      method: req.method,
      errors: errors.array() 
    });
    
    return res.status(400).json({
      status: 'fail',
      message: 'Validation Error',
      errors: formatValidationErrors(errors)
    });
  }
  
  next();
};

/**
 * Format validation errors to a more client-friendly format
 */
const formatValidationErrors = (errors: Result<ValidationError>) => {
  const formattedErrors: Record<string, string> = {};
  
  errors.array().forEach((error) => {
    // If the error has a path (from express-validator v6+)
    const field = error.type === 'field' ? error.path : error.param || 'unknown';
    
    if (!formattedErrors[field]) {
      formattedErrors[field] = error.msg;
    } else if (Array.isArray(formattedErrors[field])) {
      (formattedErrors[field] as string[]).push(error.msg);
    } else {
      formattedErrors[field] = [formattedErrors[field] as string, error.msg];
    }
  });
  
  return formattedErrors;
};

/**
 * Middleware to validate request body against a schema
 * @param schema Joi schema to validate against
 */
export const validateSchema = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      logger.warn('Schema validation failed', { 
        path: req.path,
        method: req.method,
        error: error.message 
      });
      
      if (error.isJoi) {
        const formattedErrors: Record<string, string> = {};
        error.details.forEach((detail: any) => {
          formattedErrors[detail.context.key] = detail.message;
        });
        
        return res.status(400).json({
          status: 'fail',
          message: 'Validation Error',
          errors: formattedErrors
        });
      }
      
      // If it's not a Joi error, pass it to the error handler
      next(error);
    }
  };
};
