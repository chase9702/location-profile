export const hasPermission = (authRoles: string[], menuAuth: string): boolean => {
    if (authRoles.includes('ROLE_ADMIN')) {
        return true;
    } else if (authRoles.includes('ROLE_DASHBOARD')) {
        return menuAuth === 'ROLE_DASHBOARD';
    } else {
        return false;
    }
};
