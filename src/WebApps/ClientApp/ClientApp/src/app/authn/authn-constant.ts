export const ReturnUrlType = 'returnUrl';

export const QueryParameterNames = {
  returnUrl: ReturnUrlType,
  message: 'message'
};

export const LoginActions = {
  loginCallback: 'login-callback',
  profile: 'profile',
  register: 'register'
};

export const LogoutActions = {
  logoutCallback: 'logout-callback',
  loginfailCallback: 'signout'
};

let authenticationPaths: AuthenticationPathsType = {
  defaultLoginRedirectPath: '/',
  loginCallback: `authentication/${LoginActions.loginCallback}`,
  register: `authentication/${LoginActions.register}`,
  profile: `authentication/${LoginActions.profile}`,
  logOutCallback: `authentication/${LogoutActions.logoutCallback}`,
  loginfailCallback: LogoutActions.loginfailCallback,
  loginPathComponents: [],
  loginFailedPathComponents: [],
  loginCallbackPathComponents: [],
  registerPathComponents: [],
  profilePathComponents: [],
  logOutCallbackPathComponents: [],
  identityRegisterPath: '/Account/Register',
  identityManagePath: '/Account/Manage'
};

authenticationPaths = {
  ...authenticationPaths,
  registerPathComponents: authenticationPaths.register.split('/'),
  profilePathComponents: authenticationPaths.profile.split('/'),
  logOutCallbackPathComponents: authenticationPaths.logOutCallback.split('/')
};

interface AuthenticationPathsType {
  readonly defaultLoginRedirectPath: string;
  readonly loginCallback: string;
  readonly register: string;
  readonly profile: string;
  readonly logOutCallback: string;
  readonly loginfailCallback: string;
  readonly loginPathComponents: string[];
  readonly loginFailedPathComponents: string[];
  readonly loginCallbackPathComponents: string[];
  readonly registerPathComponents: string[];
  readonly profilePathComponents: string[];
  readonly logOutCallbackPathComponents: string[];
  readonly identityRegisterPath: string;
  readonly identityManagePath: string;
}

export const AuthenticationPaths: AuthenticationPathsType = authenticationPaths;
