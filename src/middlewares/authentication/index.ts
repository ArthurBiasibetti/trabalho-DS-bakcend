import * as express from 'express';
import { get } from 'lodash';
import * as jwt from 'jsonwebtoken';
import { verifyJwt } from '../../utils/security';
import { UnauthorizedError } from '../../Errors/instances/UnauthorizedError';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  const token = get(request, 'headers.authorization', '').replace(
    /Bearer\s/,
    ''
  );

  return new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('No token provided'));
    }

    const jwtData = verifyJwt(token);

    if (!jwtData.decoded) {
      reject(new UnauthorizedError('JWT Invalido!'));
    }

    resolve(jwtData.decoded);
  });
}
