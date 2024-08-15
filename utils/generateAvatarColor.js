export const generateAvatarColor = (username) => {
    // Convert the username to a hash value
    const hash = username.split('').reduce((prevHash, currVal) => (prevHash << 5) - prevHash + currVal.charCodeAt(0), 0);
  
    // Generate a color based on the hash value
    const color = `#${Math.abs(hash).toString(16).slice(-6).padStart(6, '0')}`;
  
    return color;
  };
  