const fs = require('fs');
const targetPath = './src/environments/environments.prod.ts';

const content = `
export const environment = {
  production: true,
  lastFmUser: '${process.env.LAST_FM_USER}',
  lastFmApi: '${process.env.LAST_FM_API}'
};
`;

fs.writeFileSync(targetPath, content);
