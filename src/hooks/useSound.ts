// Enhanced sound hook with multiple sound effects
// In a real implementation, this would play actual sound files
// For now, we're just providing the interface for sound effects

export const useSound = () => {
  const playClick = () => {
    // Play a click sound
    // In a real implementation: playSound('click.mp3')
  };

  const playSuccess = () => {
    // Play a success sound
    // In a real implementation: playSound('success.mp3')
  };

  const playError = () => {
    // Play an error sound
    // In a real implementation: playSound('error.mp3')
  };

  const playNotification = () => {
    // Play a notification sound
    // In a real implementation: playSound('notification.mp3')
  };

  const playHover = () => {
    // Play a hover sound
    // In a real implementation: playSound('hover.mp3')
  };

  return { 
    playClick, 
    playSuccess, 
    playError, 
    playNotification, 
    playHover 
  };
};