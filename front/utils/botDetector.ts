const botDetector = (userAgent: string | undefined): boolean => {
  if (!userAgent) return false;
  return (
    userAgent.includes('facebookexternalhit') ||
    userAgent.includes('Twitterbot') ||
    userAgent.includes('Slackbot') ||
    userAgent.includes('WhatsApp') ||
    userAgent.includes('kakaotalk-scrap')
  );
};

export default botDetector;
