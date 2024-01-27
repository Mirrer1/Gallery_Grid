const breakPoints = [576, 992, 1200];
const [mobile, tablet, desktop] = breakPoints.map(bp => `@media (max-width: ${bp}px)`);

const media = { mobile, tablet, desktop };

export default media;
