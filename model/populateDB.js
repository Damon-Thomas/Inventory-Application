#! /usr/bin/env node

const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE all_inventory (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR ( 255 ), brand VARCHAR ( 255 ), battery BOOLEAN, price FLOAT, image VARCHAR (255));

INSERT INTO all_inventory (name, brand, battery, price, image) 
VALUES
  ('Milwaukee Tool M18 18V Li-Ion Brushless Cordless Compact Hammer Drill/Impact Combo Kit 2-Tool w/2 2.0 Batteries',
   'Milwaukee',
    'true', 
    '198.00',
    'https://images.homedepot.ca/productimages/p_1001797887.jpg?product-images=l'),
    ('Milwaukee Tool 22-inch Packout Modular Tool Box Storage System',
    'Milwaukee',
    'false',
    '298.00',
    'https://images.homedepot.ca/productimages/p_1001076027.jpg?product-images=l'),
    ('Milwaukee Tool M18 18V Lithium-Ion Brushless Cordless 7-1/4 -inch Circular Saw Tool-Only',
    'Milwaukee',
    'true',
    '248.00',
    'https://images.homedepot.ca/productimages/p_1001160058.jpg?product-images=l'),
    ('DEWALT 20V MAX Atomic Cordless Brushless Compact Drill/Driver Kit with 1 2Ah Battery',
    'DEWALT',
    'true',
    '119.00',
    'https://images.homedepot.ca/productimages/p_1001769719.jpg?product-images=l'),
    ('MAKITA 12Vmax CXT Angle Drill w/Keyless Chuck Tool Only',
    'MAKITA',
    'true',
    '109.00',
    'https://images.homedepot.ca/productimages/p_1001311404.jpg?product-images=l'),
    ('RYOBI 18V ONE+ Lithium-Ion Cordless Drill/Driver Kit with 1.5 Ah Battery and Charger',
    'RYOBI',
    'true',
    '78.00',
    'https://images.homedepot.ca/productimages/p_1001686659.jpg?product-images=l'),
    ('DEWALT ATOMIC 25 ft. Tape Measure',
    'DEWALT',
    'false',
    '9.98',
    'https://images.homedepot.ca/productimages/p_1001663250.jpg?product-images=l'),
    ('Milwaukee Tool FASTBACK Folding Utility Knife with Blade Storage and Compact Folding Utility Knife (2-Pack)',
    'Milwaukee',
    'false',
    '19.98',
    'https://images.homedepot.ca/productimages/p_1001584648.jpg?product-images=l'),
    ('DEWALT 28oz Rip Claw Steel Framing Hammer',
    'DEWALT', 
    'false',
    '29.98',
    'https://images.homedepot.ca/productimages/p_1001221508.jpg?product-images=l'),
    ('MAKITA 120 Pc. Accessory Kit',
    'MAKITA',
    'false',
    '59.98',
    'https://images.homedepot.ca/productimages/p_1001757490.jpg?product-images=l'),
    ('RYOBI 18V ONE+ AirStrike 18-Gauge Cordless Lithium-Ion Brad Nailer (Tool-Only)',
    'RYOBI',
    'true',
    '118.00', 
    'https://images.homedepot.ca/productimages/p_1001627721.jpg?product-images=l');`;


async function main() {
  const client = new Client({
    connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.DBPORT}/${process.env.DB}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();