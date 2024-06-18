const tokenExpired = (expiryTime) => {  
  const currentTime = Date.now(); 
  if (expiryTime !== undefined && expiryTime !== null) { 
    return currentTime > expiryTime * 1000;
  }
  return false; 
};
  
module.exports = tokenExpired;