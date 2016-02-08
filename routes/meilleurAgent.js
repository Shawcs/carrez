var http = require('http');
var htmlToJson = require("html-to-json");

var dataResult ="";

module.exports = function (url, callback){
	downloadUrl(url, function(data){
		htmlToJson.parse(data, {
			"priceFloat": function(doc){	
			//this can generate beug taking information in the script is safer			
			//var str = doc.find('div[class="prices-summary__values"]')[0].children[3].children[5].children[0].data.split(' ')[12].replace(/\s+/g,'');
			return prixSurface = fill(data,22,'Prix m2 appartement :');
			//return str;
		},
			"priceHouse": function(doc){				
			//var str = doc.find('div[class="prices-summary__values"]')[0].children[5].children[5].children[0].data.split(' ')[12].replace(/\s+/g,'');
			return prixSurface = fill(data,18,'Prix m2 maison :');
			//		return str;
		},
			"priceRent": function(doc){		
			try{		
				//some time it can generate error when the good is not to rent and we search for it any way ( so shildren are empty)
			var str = doc.find('div[class="prices-summary__values"]')[0].children[7].children[5].children[0].data.split(' ')[12].replace(/\s+/g,'').replace(',','.');
					return str;
				}
				catch(err) {
              console.log(err.message);
}
		}				
		}, function (err, result) {
				if(err)
					throw err;
				return callback(result);
			}
		);
	})
}

function fill(data,begin,type_of)
{
  var index = data.indexOf(type_of);
  var filled ="";
  for(var i = begin; data[index+i]!=' '; i++)
  {
    filled = filled.concat(data[index+i])
  }
  return filled;
}

function getPriceHouse(result, information){

	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[3+(i*2)].children[1].data === "Prix m2 maison")
			return element.children[3+(i*2)].children[5].children[0].data.split(' ')[12];
	return '';
}

function getPriceFloat(element){

	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[3+(i*2)].children[1].data === "Prix m2 appartement")
			return element.children[3+(i*2)].children[3].children[0].data.split(' ')[12];
	return '';
}

function getPriceRent(element){
	var size = element.children.length;
	for(var i = 0;i < size;++i)
		if(element.children[3+(i*2)].children[1].data === "Loyer mensuel/m2")
			return element.children[3+(i*2)].children[5].children[0].data.split(' ')[12];
	return '';
}

function downloadUrl(url,callback){
	var option = { 
		hostname : 'www.meilleursagents.com',
		path : url,
		port : 80,
		headers:{
		'Cookie' : 'session=eyJfZnJlc2giOmZhbHNlLCJfaWQiOiJjODRiZTI5ZDVjMjVhOTc4ZDJjYjU1MTQ1MTIwM2MyYiIsImFuYWx5dGljc190YWdzIjpbXSwidXNlcl9pZCI6MTM4NDEyOX0.CZoo2A.I3wzVrlYH_5VTXP7Yz1ZFYuAnSA'
	}
	}
		http.get(option, function(response)
		{
			response.setEncoding("utf8")  // language en quoi c'est traduit
			response.on("data", function(data) // reception des donnees
				{
					dataResult += data;			
				})
			response.on("end", function()  // quand c'est la fin on retourne la fonction 
				{
					return callback(dataResult);
				})
		})
    }
