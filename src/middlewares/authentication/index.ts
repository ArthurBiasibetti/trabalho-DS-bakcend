import * as express from 'express';
import { get } from 'lodash';
import { verifyJwt } from '../../utils/security';
import { JwtPayload } from 'jsonwebtoken';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): any {
  if (securityName === 'jwt') {
    const accessToken = get(request, 'headers.authorization', '').replace(
      /^Bearer\s/,
      ''
    );

    if (!accessToken && request.res) {
      return request.res
        .status(401)
        .json({ message: 'User is not authenticated' });
    }

    const user = verifyJwt(accessToken);

    if (user.decoded && request.res?.locals && request.next) {
      request.res.locals = user.decoded as JwtPayload;
      request.next();
    }
  }
}
