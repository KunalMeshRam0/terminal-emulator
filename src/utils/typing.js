// Simulates typing text one character at a time
export const typeText = async (
    text,
    callback,      // function to handle each character
    speed = 5       // base speed in ms between characters
  ) => {
    return new Promise((resolve) => {
      let index = 0;
  
      const typeNextChar = () => {
        if (index < text.length) {
          callback(text[index], false); // pass next character
          index++;
          setTimeout(typeNextChar, speed + Math.random() * 20); // adds slight randomness
        } else {
          callback('', true); // signals done
          resolve();
        }
      };
  
      typeNextChar();
    });
  };
  
  // Basic sleep/delay function
  export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };
  