import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { authorizationToPayloadSignIn } from '../utils/base-64-converter';

export const UserId = createParamDecorator(
  (_, context: ExecutionContext): string | undefined => {
    const { authorization } = context.switchToHttp().getRequest().headers;

    const payloadSignIn = authorizationToPayloadSignIn(authorization);

    return payloadSignIn?.id;
  },
);
