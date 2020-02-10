const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const SELECT_ALL_PRODUCTS_QUERY =  'SELECT * FROM produit';



const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'tastycloud',
	database: 'new_schema'
})

connection.connect(err => {
	if(err) {
		return err;
	}
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json({ status: "success", message: "Welcome To Testing API" });
});

/*app.get('/products/add', (req, res) => {
	const {name, price, type} = req.query;
	const INSERT_PRODUCTS_QUERY = `INSERT INTO Produit (Name,Price,Type) VALUES ('${name}','${price}','${type}')`;
	connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send('successfully added product');
		}
	});
});*/

app.post('/products/add', (req,res) => {
	var name=req.body.name;
	var price=req.body.price;
	var type= req.body.type;
	console.log(req.body);
	console.log("name = "+name+", price is "+price+", type is "+type);
	const INSERT_PRODUCTS_QUERY = `INSERT INTO Produit (Name,Price,Type) VALUES ('${name}','${price}','${type}')`;
	connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send('successfully added product');
		}
	});
});

/*app.get('/products/edit', (req, res) => {
	const {productID, name, price, type} = req.query;
	const UPDATE_PRODUCTS_QUERY = `UPDATE produit SET Name='${name}', Price=${price}, Type= '${type}' where ProductID=${productID}`;
	connection.query(UPDATE_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send(`successfully edited product ${productID} with name:${name}, price:${price}, type:${type}`);
		}
	});
});*/

app.put('/products/edit', (req, res) => {
	var productID=req.body.productID;
	var name=req.body.name;
	var price=req.body.price;
	var type= req.body.type;
	console.log("productID = "+productID+" name = "+name+", price is "+price+", type is "+type);
	const UPDATE_PRODUCTS_QUERY = `UPDATE produit SET Name='${name}', Price=${price}, Type= '${type}' where ProductID=${productID}`;
	connection.query(UPDATE_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send(`successfully edited product ${productID} with name:${name}, price:${price}, type:${type}`);
		}
	});
});

/*app.get('/products/delete', (req, res) => {
	const {productID} = req.query;
	const DELETE_PRODUCTS_QUERY = `DELETE FROM produit where ProductID=${productID}`;
	connection.query(DELETE_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send(`successfully deleted product ${productID}`);
		}
	});
});*/

app.delete('/products/delete', (req, res) => {
	var productID=req.body.productID;
	const DELETE_PRODUCTS_QUERY = `DELETE FROM produit where ProductID=${productID}`;
	connection.query(DELETE_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.send(`successfully deleted product ${productID}`);
		}
	});
})

app.get('/products', (req, res) => {
	connection.query(SELECT_ALL_PRODUCTS_QUERY, (err, results) => {
		if(err){
			return res.send(err);
		}
		else{
			return res.json({
				data: results
			})
		}
	});
});

app.listen(4000, () => {
	console.log("products server listening on port 4000")
})

module.exports = app