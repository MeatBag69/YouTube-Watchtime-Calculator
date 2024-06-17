function getDurationInSeconds(duration) {
  const parts = duration.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  } else {
    return parts[0];
  }
}

function calculateTotalWatchTime() {
  const durations = Array.from(document.querySelectorAll('span.ytd-thumbnail-overlay-time-status-renderer')).map(el => el.textContent.trim());
  const totalSeconds = durations.reduce((total, duration) => total + getDurationInSeconds(duration), 0);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function displayTotalWatchTime() {
  const videoCountElement = document.querySelector('#videos-count');
  if (videoCountElement) {
    const totalWatchTime = calculateTotalWatchTime();
    const watchTimeElement = document.createElement('span');
    watchTimeElement.style.marginLeft = '10px';
    watchTimeElement.textContent = `Total Watch Time: ${totalWatchTime}`;
    videoCountElement.appendChild(watchTimeElement);
  }
}

window.addEventListener('load', () => setTimeout(displayTotalWatchTime, 3000));
