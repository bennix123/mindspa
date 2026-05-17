// Quick MySQL connection test.
// Usage: node test-db.js  (after filling in backend/.env)

require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  console.log('Attempting to connect to MySQL...');
  console.log(`  Host: ${process.env.DB_HOST}`);
  console.log(`  Port: ${process.env.DB_PORT || 3306}`);
  console.log(`  User: ${process.env.DB_USER}`);
  console.log(`  DB:   ${process.env.DB_NAME}`);
  console.log('');

  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 10000,
    });

    const [rows] = await conn.query('SELECT VERSION() AS v, NOW() AS t, DATABASE() AS d');
    console.log('✓ CONNECTED');
    console.log(`  MySQL version: ${rows[0].v}`);
    console.log(`  Server time:   ${rows[0].t}`);
    console.log(`  Database:      ${rows[0].d}`);

    const [tables] = await conn.query('SHOW TABLES');
    console.log(`  Tables:        ${tables.length} existing`);
    if (tables.length > 0) {
      tables.forEach((t) => console.log('    - ' + Object.values(t)[0]));
    }

    await conn.end();
    console.log('\nReady to start the server: npm start');
  } catch (err) {
    console.error('\n✗ CONNECTION FAILED:', err.message);
    console.error('\nCommon causes:');
    console.error('  1. Wrong credentials in .env');
    console.error('  2. Your IP is not whitelisted in Hostinger → Databases → Remote MySQL');
    console.error('  3. Hostinger Shared hosting blocks remote MySQL on non-standard IPs');
    console.error('     → Check hPanel → Databases → Remote MySQL and add your current IP');
    console.error(`     → Or add % (any host) temporarily for testing`);
    process.exit(1);
  }
})();
