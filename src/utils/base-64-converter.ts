import { PayloadSignInDto } from '../auth/dto/payload-sign-in.dto';

export const authorizationToPayloadSignIn = (
  authorization: string,
): PayloadSignInDto | undefined => {
  const authorizationSplited = authorization.split('.');

  if (authorizationSplited.length < 3 || !authorizationSplited[1])
    return undefined;

  return JSON.parse(
    Buffer.from(authorizationSplited[1], 'base64').toString('ascii'),
  );
};
