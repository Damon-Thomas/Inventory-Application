const pool = require("./pool");

async function getAllTools() {
  const { rows } = await pool.query("SELECT * FROM all_inventory Order By name;");
 
  return rows;
}

async function getToolsByBrand(brand) {
  const { rows } = await pool.query(`SELECT * FROM all_inventory WHERE brand='${brand}' Order By name;`);
  
  return rows;
}

async function insertProduct(name, brand, battery, price, image = 'https://cdn.pixabay.com/photo/2016/03/31/18/24/screwdriver-1294338_960_720.png') {
  await pool.query("INSERT INTO all_inventory (name, brand, battery, price, image) VALUES ($1, $2, $3, $4, $5)", [name, brand ? brand : 'other', battery, price, image]);
}

async function updateProduct(id, name, brand, battery, price, image) {
  
  let imageActual;
  if (image) imageActual = image
  else imageActual = 'https://cdn.pixabay.com/photo/2016/03/31/18/24/screwdriver-1294338_960_720.png'
 
  await pool.query(`UPDATE all_inventory SET name='${name}', brand='${brand ? brand : 'other'}', battery=${battery}, price=${price}, image='${imageActual}' WHERE id=${id};`);
}

async function getDistinctBrands() {
  const { rows } = await pool.query("SELECT DISTINCT brand FROM all_inventory WHERE brand != 'other';")
  
  return rows;
}

async function getToolsFromBrand(brand) {
  const { rows } = await pool.query(`SELECT * FROM all_inventory WHERE brand = ${brand};`)
  
  return rows;
}

async function toolsWithOrWOPower(bool) {
  const { rows } = await pool.query(`SELECT * FROM all_inventory WHERE battery = ${bool};`)
  
  return rows;
}

async function deleteBrand(brand) {
  await pool.query(`UPDATE all_inventory SET brand='other' WHERE brand=${brand}`);
}

async function getProductById(id) {
  const {rows} = await pool.query(`SELECT * FROM all_inventory WHERE ID = ${id};`)
  return rows[0]
}

module.exports = {
  getAllTools,
  insertProduct,
  getDistinctBrands,
  getToolsFromBrand,
  toolsWithOrWOPower,
  updateProduct,
  deleteBrand,
  getProductById,
  getToolsByBrand
};
