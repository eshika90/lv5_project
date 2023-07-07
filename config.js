const variable = {
  db: {
    host: 'express-database.chsegd7gavec.ap-northeast-2.rds.amazonaws.com',
    username: 'root',
    password: 'sparta1234',
    database: 'lv4_report',
  },
  jwt: {
    secretKey: 'lv4_report',
    expireIn: '120s',
    expireIn2: '1d',
  },
  port: 3030,
};

module.exports = variable;
