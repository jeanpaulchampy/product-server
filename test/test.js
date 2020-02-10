const app = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
//const helper = require("../helper");

const { expect } = chai;
chai.use(chaiHttp);

/*function getProductIDWithName(name)
{
	var productID = 0;
    chai
      .request(app)
      .get("/products/")
      .end((err, res) => {
		  var json=res.text;
		  json= JSON.parse(json);
		
		  for (var i=0 ; i < json.data.length ; i++)
		{
			//console.log(json.data[i].Name);
			if (json.data[i].Name == name) {
				productID = json.data[i].ProductID;
			}
		}
		console.log("product " +name+"  ID is "+productID);
		return productID;
});
}*/

let getProductIDWithName = (name) => {
  return new Promise(
    (resolve, reject) => {
      chai
      .request(app)
      .get("/products/")
      .end((err, res) => {
		  if (err) reject(err);
		  var json=res.text;
		  json= JSON.parse(json);
		var productID=0;
		  for (var i=0 ; i < json.data.length ; i++)
		{
			//console.log(json.data[i].Name);
			if (json.data[i].Name == name) {
				productID = json.data[i].ProductID;
			}
		}
        
          

        resolve(productID);
      })
   }
 );
};

describe("Server!", () => {
  it("welcomes user to the api", done => {

    chai
      .request(app)
      .get("/")
      .end((err, res) => {
		expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.message).to.equals("Welcome To Testing API");
        done();
      });
  });
  

it("adds fromtest dish", done => {
    chai
      .request(app)
      .post("/products/add")
      .send({ name: "fromtest", price: 5,type: "plat" })
      .end((err, res) => {
        expect(res).to.have.status(200);
		expect(getProductIDWithName("fromtest")).to.not.equals(0);
        done();
      });
  });


     

it("edit fromtest dish to fromtestedited", done => {
	
/*var result =0;
 getProductIDWithName("fromtest").then(
   id => result= id
   // actually outputs a string
   
   
).catch(
   err => console.log(err)
);*/
var productID = 0;
    chai
      .request(app)
      .get("/products/")
      .end((err, res) => {
		  var json=res.text;
		  json= JSON.parse(json);
		
		  for (var i=0 ; i < json.data.length ; i++)
		{
			//console.log(json.data[i].Name);
			if (json.data[i].Name == "fromtest") {
				productID = json.data[i].ProductID;
			}
		}
		console.log("product " +"fromtest"+"  ID is "+productID);
		chai
		.request(app)
		.put("/products/edit")
		.send({productID:  productID, name: "fromtestedited", price: 50,type: "plat" })
		.end((err, res) => {
			expect(res).to.have.status(200);
			getProductIDWithName("fromtestedited").then(
				id => expect(id).to.not.equals(0)
			).catch(
				err => console.log(err)
			);
			//expect(getProductIDWithName("fromtestedited")).to.not.equals(0);
			//expect(asyncToResultingValue(getProductIDWithName("fromtestedited"))).to.eventually.not.equal(0);
			getProductIDWithName("fromtest").then(
				id => expect(id).to.equals(0)
			).catch(
				err => console.log(err)
			);
	   });	
		//console.log(productID);
        done();
		
   });
});

 

it("delete fromtestedited dish", done  => {
	var productID = 0;
    chai
      .request(app)
      .get("/products/")
      .end((err, res) => {
		  var json=res.text;
		  json= JSON.parse(json);
		
		  for (var i=0 ; i < json.data.length ; i++)
		{
			//console.log(json.data[i].Name);
			if (json.data[i].Name == "fromtestedited") {
				productID = json.data[i].ProductID;
			}
		}
		console.log("product " +"fromtestedited"+"  ID is "+productID);
    
  		chai
		.request(app)
		.delete("/products/delete")
		.send({productID: productID})
		.end((err, res) => {
			expect(res).to.have.status(200);
			getProductIDWithName("fromtestedited").then(
				id => expect(id).to.equals(0)
			).catch(
				err => console.log(err)
			);
			done();
	   });	
		//console.log(productID);
        //expect(res).to.have.status(200);
		//myFunction();
  });
});


  
  
});