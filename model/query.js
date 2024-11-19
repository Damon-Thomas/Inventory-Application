const pool = require("./pool");

async function getAllTools() {
  const { rows } = await pool.query("SELECT * FROM all_inventory");
  console.log('all tools', rows)
  return rows;
}

async function insertProduct(name, brand, battery, price, image = 'assets/generaltool.png') {
  await pool.query("INSERT INTO all_inventory (name, brand, battery, price, image) VALUES ($1, $2, $3, $4, $5)", [name, brand, battery, price, image]);
}

async function updateProduct(id, name, brand, battery, price, image = 'assets/generaltool.png') {
  await pool.query(`UPDATE all_inventory SET name=${name}, brand=${brand}, battery=${battery}, price=${price}, image=${image} WHERE id=${id}`);
}

async function getDistinctBrands(brand) {
  const { rows } = await pool.query("SELECT DISTINCT brand FROM all_inventory;")
  console.log('distinct brands', rows)
  return rows;
}

async function getToolsFromBrand(brand) {
  const { rows } = await pool.query(`SELECT * FROM all_inventory WHERE brand = ${brand};`)
  console.log('tools by brand', rows)
  return rows;
}

async function toolsWithOrWOPower(bool) {
  const { rows } = await pool.query(`SELECT * FROM all_inventory WHERE battery = ${bool};`)
  console.log('tools by power', rows)
  return rows;
}

async function deleteBrand(brand) {
  await pool.query(`UPDATE all_inventory SET brand='other' WHERE brand=${brand}`);
}

module.exports = {
  getAllTools,
  insertProduct,
  getDistinctBrands,
  getToolsFromBrand,
  toolsWithOrWOPower,
  updateProduct,
  deleteBrand
};
