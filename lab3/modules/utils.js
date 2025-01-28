function getDate(name, messageTemplate) {
    const serverTime = new Date().toString();
    const personalizedMessage = messageTemplate.replace("%1", name);
    return `<p style="color: blue;">${personalizedMessage} ${serverTime}</p>`;
  }
  
  module.exports = { getDate };
  