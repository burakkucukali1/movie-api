const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('/api/movies/tests', () => {
	before((done)=>{
		chai.request(server)
			.post('/authenticate')
			.send({username:'fsener',password:'123456'})
			.end((err,res)=>{
				token = res.body.token;
				console.log(token)
				done()
               })
          describe('/GET movies', ()=> { 
               it('it should GET all the movies', (done)=>{
                    done()
               })
          })
	}) 
	
	
});