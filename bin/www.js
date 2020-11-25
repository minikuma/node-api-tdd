/**
 * Created by wminikuma@gmail.com on 2020/11/25
 * Blog : https://minikuma-laboratory.tistory.com/
 * Github : http://github.com/minikuma
 */

const app = require('../index');
const syncDb = require('./syncDb');

syncDb().then(() => {
   console.log('Sync database!');
   app.listen(3000, function () {
      console.log('Server is running on 3000 port!');
   });
});