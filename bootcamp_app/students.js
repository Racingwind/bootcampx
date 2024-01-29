const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const inputs = [`%${process.argv[2]}%`, process.argv[3]];

pool.query(`
  SELECT students.id AS id, students.name AS name, cohorts.name AS cohort_id
  FROM students
  JOIN cohorts ON cohorts.id = cohort_id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
`, inputs)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
  })
})
.catch(err => console.error('query error', err.stack));