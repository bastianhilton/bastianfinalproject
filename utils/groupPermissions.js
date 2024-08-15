export const hasGroupPermission = (user, group, permission) => {
    const { role, permissions } = user.groups[group.id] || {};
  
    // Check if the user has the specific permission
    if (permissions && permissions.includes(permission)) {
      return true;
    }
  
    // Check if the user's role has the permission
    const rolePermissions = group.roles[role]?.permissions || [];
    return rolePermissions.includes(permission);
  };
  