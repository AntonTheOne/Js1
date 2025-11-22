const express = require('express');
const router = express.Router();
const Database = require('better-sqlite3');
const db = new Database('./data/db.db', { verbose: console.log });

// Utility: skapa slug från namn
function generateSlug(name) {
  return name.toLowerCase()
             .trim()
             .replace(/[^a-z0-9\s-]/g, '') // ta bort specialtecken
             .replace(/\s+/g, '-') // mellanslag → -
             .replace(/-+/g, '-'); // flera - → en -
}

// Route för att visa formulär för ny produkt
router.get('/products/new', (req, res) => {
  res.render('admin/new-product', {
    title: 'Ny produkt'
  });
});

// Route för admin-sida med produktlista
router.get('/products', (req, res) => {
  res.render('admin/products', {
    title: 'Adminsida'
  });
});

// API-route: sök produkter
router.get('/products/search', (req, res) => {
  const searchTerm = req.query.query;
  const stmt = db.prepare('SELECT * FROM products WHERE name LIKE ?');
  const rows = stmt.all(`%${searchTerm}%`);
  res.json(rows);
});

// API-route för att skapa produkt via POST
router.post('/api/products', (req, res) => {
  const { name, description, image, price, sku, color, published } = req.body;
  const slug = generateSlug(name);

  const stmt = db.prepare(`
    INSERT INTO products (name, sku, description, image, price, color, published, slug)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const info = stmt.run(
    name,
    sku || 'default-sku',
    description || 'Ingen beskrivning',
    image || 'https://via.placeholder.com/150',
    price || 0,
    color || 'okänd',
    published ? new Date().toISOString() : null,
    slug
  );

  res.status(201).json({ id: info.lastInsertRowid, slug });
});

router.get('/products/:id', (req, res) => {
  const productId = req.params.id; // fånga :id från URL
  const stmt = db.prepare('SELECT * FROM products WHERE id = ?');
  const product = stmt.get(productId); // get() returnerar ett objekt

  // Rendera en view "product-detail.ejs"
  res.render('admin/product-detail', {
    title: product ? product.name : 'Produkt saknas',
    product
  });
});

module.exports = router;
