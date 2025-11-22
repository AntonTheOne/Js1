-- Skapa ny tabell med alla kolumner som behövs
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sku TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  price REAL NOT NULL,
  color TEXT NOT NULL,
  published TEXT DEFAULT NULL, -- datum i ISO-format eller NULL
  slug TEXT NOT NULL
);

-- Exempeldata
INSERT INTO products (name, sku, description, image, price, color, published, slug)
VALUES
('Svart T-shirt', 'TS-BLACK-01', 'En snygg svart T-shirt', 'https://example.com/images/svart-tshirt.jpg', 199.00, 'svart', '2025-01-10T12:00:00', 'svart-t-shirt'),
('Vit Hoodie', 'HD-WHITE-02', 'Mysig vit hoodie', 'https://example.com/images/vit-hoodie.jpg', 499.00, 'vit', NULL, 'vit-hoodie'), -- ej publicerad
('Svarta Jeans', 'JN-BLACK-03', 'Slim fit svarta jeans', 'https://example.com/images/svarta-jeans.jpg', 699.00, 'svart', '2024-11-01T08:30:00', 'svarta-jeans');
