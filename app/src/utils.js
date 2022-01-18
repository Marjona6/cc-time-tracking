export const getTotalTime = (sessionArray = []) => {
  let total = 0; // in milliseconds
  for (let i = 0; i < sessionArray.length; i++) {
    if (sessionArray[i].end && sessionArray[i].begin) total += Math.abs(sessionArray[i].end - sessionArray[i].begin);
  }
  return (total / 1000).toFixed(1); // return in seconds
};

export const getNumberOfSessions = (sessionArray = []) => {
  return sessionArray.length;
};

export const getAverageSessionLength = (sessionArray = []) => {
  let numberOfSessions = getNumberOfSessions(sessionArray);
  if (numberOfSessions < 1) return 0;
  let totalTime = getTotalTime(sessionArray);
  return totalTime / numberOfSessions;
};
