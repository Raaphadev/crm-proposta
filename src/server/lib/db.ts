import Database from 'better-sqlite3';
import { join } from 'path';

const db = new Database(join(process.cwd(), 'database.sqlite'), { verbose: console.log });

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT CHECK(role IN ('ADMIN', 'MANAGER', 'COLLABORATOR')) DEFAULT 'COLLABORATOR',
    permissions TEXT,
    avatar TEXT,
    company_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies (id)
  );

  CREATE TABLE IF NOT EXISTS deals (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    value REAL NOT NULL,
    status TEXT CHECK(status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST')) DEFAULT 'NEW',
    created_by_id TEXT NOT NULL,
    assigned_to_id TEXT NOT NULL,
    company_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by_id) REFERENCES users (id),
    FOREIGN KEY (assigned_to_id) REFERENCES users (id),
    FOREIGN KEY (company_id) REFERENCES companies (id)
  );
`);

// Prepare statements
const statements = {
  // Users
  createUser: db.prepare(`
    INSERT INTO users (id, email, name, password, role, permissions, company_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  
  findUserByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),
  
  findUserById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),
  
  updateUser: db.prepare(`
    UPDATE users
    SET name = ?, role = ?, permissions = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `),
  
  deleteUser: db.prepare(`
    DELETE FROM users WHERE id = ?
  `),
  
  // Companies
  createCompany: db.prepare(`
    INSERT INTO companies (id, name, logo)
    VALUES (?, ?, ?)
  `),
  
  findCompanyById: db.prepare(`
    SELECT * FROM companies WHERE id = ?
  `),
  
  // Deals
  createDeal: db.prepare(`
    INSERT INTO deals (id, title, value, status, created_by_id, assigned_to_id, company_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `),
  
  findDealsByCompany: db.prepare(`
    SELECT * FROM deals WHERE company_id = ?
  `),
  
  updateDeal: db.prepare(`
    UPDATE deals
    SET title = ?, value = ?, status = ?, assigned_to_id = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)
};

export { db, statements };