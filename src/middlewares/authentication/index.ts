import * as express from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../../utils/security';
import * as jwt from 'jsonwebtoken';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): any {
  if (securityName === 'jwt') {
    const token = get(request, 'headers.authorization', '').replace(
      /Bearer\s/,
      ''
    );

    return new Promise((resolve, reject) => {
      console.log('TOKEN: ', token);
      if (!token) {
        reject(new Error('No token provided'));
      }
      jwt.verify(
        token,
        process.env.JWT_SECRETE || '',
        function (err: any, decoded: any) {
          if (err) {
            reject(err);
          } else {
            if (scopes) {
              for (const scope of scopes) {
                if (!decoded.scopes.includes(scope)) {
                  reject(new Error('JWT does not contain required scope.'));
                }
              }
              resolve(decoded);
            }
          }
        }
      );
    });
  }
}
