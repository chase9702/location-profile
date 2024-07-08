export const hasPermission = (
  authRole: string[] | string,
  menuAuth: string
): boolean => {
  const userRole = authRole ?? 'GUEST';

  if (userRole.includes('ROLE_ADMIN')) {
    return true;
  } else if (userRole.includes('ROLE_DASHBOARD')) {
    return menuAuth === 'ROLE_DASHBOARD';
  } else {
    return false;
  }
};
