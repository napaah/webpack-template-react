const { join } = require('path');
const ENV = process.env.ENV;

const getEnv = () => {
  const path = join(process.cwd(), `.env.${ENV}`);
  const dotEnv = require('dotenv');
  const result = dotEnv.config({
    path,
  });

  const c = {};
  const { parsed } = result;
  for (const key in parsed) {
    c[key] = JSON.stringify(parsed[key]);
  }
  console.log(c, '----全局环境变量')
  return c;
};

module.exports = {
  getEnv,
};
