// filepath: gestor_gastos_backend/src/db/migrate.js
const { sequelize } = require('./index');
const models = require('../models/index');

async function migrate() {
  try {
    console.log('🔄 Starting database migration...');
    
    // Drop existing tables to avoid conflicts
    await sequelize.query('DROP TABLE IF EXISTS "transactions" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "users" CASCADE;');
    
    console.log('🗑️  Existing tables dropped');
    
    // Recreate tables with correct schema
    await models.sequelize.sync({ force: true });
    
    console.log('✅ Database migration completed successfully');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrate()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = migrate;
