export const formatUsername = (username) => {
    // Remove leading/trailing whitespace
    username = username.trim();
  
    // Replace multiple spaces with a single space
    username = username.replace(/\s+/g, ' ');
  
    // Remove non-alphanumeric characters except for underscores
    username = username.replace(/[^a-zA-Z0-9_]/g, '');
  
    // Truncate to a maximum length (e.g., 20 characters)
    username = username.slice(0, 20);
  
    return username;
  };
  