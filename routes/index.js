var express = require('express');
var router = express.Router();
var monk = require('monk');
var converter = require('number-to-words');
var db = monk('mongodb+srv://syampatnala007:11062001syam@examcell.msppj.mongodb.net/aditya?retryWrites=true&w=majority');
var collection = db.get('examinor');
var collection1 = db.get('clgdet');
var collection2=db.get('col2');
var collection3=db.get('col3');
var admin = db.get('Admin');
var cities=db.get('CitiesDet');
var session=require('client-sessions');
//----------------------------------AR17---------------
var esa =db.get('Bexcel');
var msa = db.get('Mexcel');
var isa=db.get('Iexcel');
var mbasa=db.get('MBAexcel');
var mcasa=db.get('MCAexcel');
//-----------------------------------------------------
//---------------------------------AR19----------------
var esa2 =db.get('Bexcel2');
var msa2 = db.get('Mexcel2');
var isa2=db.get('Iexcel2');
var mbasa2=db.get('MBAexcel2');
var mcasa2=db.get('MCAexcel2');
//-----------------------------------------------------
var bb=db.get('Bbranch');
var mbr=db.get('Mbranch');
var mbb=db.get('MBAbranch');
var mcb=db.get('MCAbranch');
var imbb=db.get('IMBAbranch');
//var collection1 = db.get('sample');
var dateFormat = require('dateformat');
//var popupS = require('popups');
//var confirm = require('confirm-dailog');
/* GET home page. */
router.get('/', function(req, res) {
	collection.find({},function(err,docs){
		esa.find({},function(err,docs1){
			msa.find({},function(err,docs2){
				isa.find({},function(err,docs3){
					mbasa.find({},function(err,docs4){
						mcasa.find({},function(err,docs5){


		if (err) {
			console.log(err);
		}
		else{
			var s = docs.length
            console.log(docs[s-1])
            var bdata=[docs1[0],docs1[9],docs1[19],docs1[29],docs1[49],docs1[59],docs1[69],docs1[79]]/**/
            var mdata=[docs2[0],docs2[12],docs2[23],docs2[26]]
            var idata=[docs3[1],docs3[7],docs3[13],docs3[18],docs3[24],docs3[28],docs3[35],docs3[50],docs3[64],docs3[73]]
            var mbadata=[docs4[1],docs4[11],docs4[22],docs4[50]]
            var mcadata=[docs5[1],docs5[12],docs5[18],docs5[32],docs5[39],docs5[49]]
			res.render('index',{"title": docs,"seme":bdata,"msem":mdata,"isem":idata,"mbasem":mbadata,"mcasem":mcadata});
		}
	})
	})
				})
			})
		})
	})
	/*esa.find({},function(err,docs){
		console.log("kjsdf,sjdhf  :"+docs);
	})*/
});

router.post('/form',function(req,res) {
	var ta=0;
	//var remuneration=req.body.count*10;
	var da=0;
	var c=req.body.count;
	//---------------------city--------------------------------
	if (req.body.college=='S.R.K.R. Engineering College, Bhimavaram') {
		ta=452;
	}
	else if (req.body.college=='Shri Vishnu Engineering College for Women, Bhimavaram') {
		ta=432;
	}
	else if (req.body.college=='Swarnandhra College of Engineering & Technology, Narsapur') {
		ta=472;
	}else if (req.body.college=='Gudlavalleru Engineering CollegeGudivada') {
		ta=756;
	}else if (req.body.college=='C.R.Reddy College of Engineering, Eluru') {
		ta=556;
	}else if (req.body.college=='P.V.P.Siddartha Institute of Technology,Vijayawada') {
		ta=752;
	}else if (req.body.college=='V.R.Siddartha Engineering College,Vijayawada') {
		ta=756;
	}else if (req.body.college=='Lakkireddy Balireddy College of Engineering,Mylavaram') {
		ta=804;
	}else if (req.body.college=='RVR & JC CollegeGuntur') {
		ta=980;
	}else if (req.body.college=='M.V.G.R.College of EngineeringVizianagaram') {
		ta=872;
	}else if (req.body.college=='Raghu Engineering College, Visakhapatnam') {
		ta=840;
	}else if (req.body.college=='GMR Institute of TechnologyRazam') {
		ta=1168;
	}else if (req.body.college=='BVC Engineering College, Odalarevu') {
		ta=460;
	}else if (req.body.college=='Sasi Institute of Technology, Tadepalligudem') {
		ta=352;
	}else if (req.body.college=='Vasavi Engineering College, Tadepalligudem') {
		ta=368;
	}else if (req.body.college=='Aditya Institute of Technology & Management, Tekkali') {
		ta=1276;
	}
	else if (req.body.college=='Gayatri Vidya Parishad College of Engineering, Visakhapatnam') {
		ta=784;
	}
		else if (req.body.college=="Vignan's Institute of Information Technology, Visakhapatnam") {
		ta=648;
	}
	else if (req.body.college=="Anil Neerukonda Institute of Technology & Science, Visakhapatnam") {
		ta=812;
	}
	//---------------------city--------------------------------

	if (req.body.designation=='Assistant_Professor') {
		da=200;
	}
	else if (req.body.designation=='Professor') {
		da=400;
	}
	else if (req.body.designation=='Associate_Professor') {
		da=300;
	}
	var mode=req.body.mode;
	if (req.body.mode=='Scrutinizer') {
		if(req.body.pps=='3'||req.body.pps==3){
			remunerationP=3;
		}
		else{
			remunerationP=1.5;
		}
		da=0;
		ta=0;
	}
	else if (req.body.mode=='project'||req.body.mode=='Project') {
		remunerationP=1500;
		da=0;
		ta=0;
	}
	else {
		if(req.body.program=='mtech'||req.body.program=='mba'||req.body.program=='mca') {
			remunerationP=25;
		}
		else if(req.body.program=='btech'||req.body.program=='imba')
		{
			remunerationP=20;
		}
	}
	
	var date2=new Date(req.body.todate);
	var date1=new Date(req.body.fromdate);
	//------------29-09-2021
	var dddd1="";
	var dddd2="";
	if(req.body.mode!='Scrutinizer'){
		dddd1=dateFormat(date1, "d-m-yyyy");
		dddd2=dateFormat(date2, "d-m-yyyy");
	}
	//------------29-09-2021
	console.log("date--------------------"+dddd1)



	var a=Math.abs(date1-date2)/1000;
	var remuneration=remunerationP*c;
	var totaldays=Math.floor(a/86400)+1;
	//------------29-09-2021
	if(req.body.mode="Scrutinizer"){
		totaldays=1;
	}
	//------------29-09-2021
	var dad=da*totaldays;
	var total=ta+dad+remuneration;
	console.log(dad)
	console.log(total)
	var totalinwords=converter.toWords(total);
	console.log("hiiiiiiiiiiiiiiiiiii"+totalinwords)

	console.log(totaldays+" days")
	var data={
		program:req.body.program,
		sem:req.body.sem,
		examtype:req.body.examtype,
		month:req.body.month,
		regulation:req.body.regulation,
		fromdate:dddd1,
		todate:dddd2,
		name:req.body.name,
		college:req.body.college,
		dept:req.body.department,
		city:req.body.city,
		designation:req.body.designation,
		sem:req.body.sem,
		lab_name:req.body.lab_name,
		coursecode:req.body.coursecode,
		stdcount:req.body.count,
		acc:req.body.bank_acc_no,
		ifsc:req.body.ifsc,
		remp:remunerationP,
		rem:remuneration,
		totaldays:totaldays,
		ta:ta,
		da:da,
		totalda:dad,
		total:total,
		totalinwords:totalinwords,
		bnkname:req.body.bnkname,
		phno:req.body.phno,
		mail:req.body.email,
		mode:req.body.mode,
		empid:req.body.EmpID,
		section:req.body.section,
		le:req.body.les,
		added:req.body.added,
		addressing:req.body.addressing,
		bundle_num:req.body.bnum,//------------29-09-2021
	}

	collection.findOne({"mail":req.body.email},function(err,docs) {
		// body...
		if (docs) {
			
			collection1.insert(data,function(err,docs){
				console.log(docs);
				res.render('exist',{"backup":docs});
			});
		}
		else
		{
			collection.insert(data,function(err,docs){
				console.log(docs);
				res.render('page2',{"success":"one record inserted successfuly !"});
			});

		}
	})
	//console.log(data);
		
})
router.post('/remuneration',function(req,res){
	res.redirect('/remuneration')
});
router.post('/rem',function(req,res){
	res.redirect('/remuneration_data')
});
router.post('/rl',function(req,res){
	res.redirect('/releave_letter')
});


router.get('/remuneration_data', function(req, res) {
		
	collection.find({},function(err,docs){
		console.log(docs);
		//console.log(ta);
		//console.log(rem2);
		//var s=docs.length
		res.render('all_data',{"title":docs});
		//res.render('remuneration',{"title":docs,"ta":ta,"da":da,"rem":rem,"total":rem+ta+da})
		//res.render('remuneration',{ta:ta,da:da})
	});
});

router.get('/remuneration', function(req, res) {
		/*var ta=20;
		var da=50;
		var rem=10;
		var rem2=rem;
		var total=ta+da+rem2;
		*/
	collection.find({},function(err,docs){
		console.log(docs);
		//console.log(ta);
		//console.log(rem2);
		var s=docs.length
		console.log(s)
		res.render('remuneration',{"titile":docs[s-1]});
		//res.render('remuneration',{"title":docs,"ta":ta,"da":da,"rem":rem,"total":rem+ta+da})
		//res.render('remuneration',{ta:ta,da:da})
	});
});
router.post('/insert',function(req,res) {
	// body...
	var data={
		sem:req.body.sem,
		examtype:req.body.examtype,
		month:req.body.month,
		regulation:req.body.regulation,
		program:req.body.program,
		mode:req.body.mode,

	}
	console.log("amma raye");
	cities.find({},function(err,cit){
	//-------------------------------====AR17====--------------------------------------------
	if(data.regulation=="AR17"){
		if(data.program=="btech"){
			console.log("amma ravalamma");
			esa.find({},function(err,btechdocs){
				console.log("amma aye babu :- "+btechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<btechdocs.length;i++){
					var r=x.localeCompare(btechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+btechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(btechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			bb.find({},function(err,btbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":btbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mtech"){
			console.log("amma ravalamma");
			msa.find({},function(err,mtechdocs){
				console.log("amma aye babu :- "+mtechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mtechdocs.length;i++){
					var r=x.localeCompare(mtechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mtechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mtechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			mbr.find({},function(err,mtbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mtbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mba"){
			console.log("amma ravalamma");
			mbasa.find({},function(err,mbadocs){
				console.log("amma aye babu :- "+mbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mbadocs.length;i++){
					var r=x.localeCompare(mbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mbb.find({},function(err,mbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mbbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="mca"){
			console.log("amma ravalamma");
			mcasa.find({},function(err,mcadocs){
				console.log("amma aye babu :- "+mcadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mcadocs.length;i++){
					var r=x.localeCompare(mcadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mcadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mcadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mcb.find({},function(err,mcbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mcbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="imba"){
			console.log("amma ravalamma");
			isa.find({},function(err,imbadocs){
				console.log("amma aye babu :- "+imbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<imbadocs.length;i++){
					var r=x.localeCompare(imbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+imbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(imbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			imbb.find({},function(err,imbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":imbbranch,"citys":cit});
			})
				});
				
			})
		}
		}
		//----------------------------------------------====AR19====--------------------------
		else if(data.regulation=="AR19"){
			if(data.program=="btech"){
			console.log("amma ravalamma");
			esa2.find({},function(err,btechdocs){
				console.log("amma aye babu :- "+btechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<btechdocs.length;i++){
					var r=x.localeCompare(btechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+btechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(btechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			bb.find({},function(err,btbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":btbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mtech"){
			console.log("amma ravalamma");
			msa2.find({},function(err,mtechdocs){
				console.log("amma aye babu :- "+mtechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mtechdocs.length;i++){
					var r=x.localeCompare(mtechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mtechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mtechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			mbr.find({},function(err,mtbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mtbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mba"){
			console.log("amma ravalamma");
			mbasa2.find({},function(err,mbadocs){
				console.log("amma aye babu :- "+mbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mbadocs.length;i++){
					var r=x.localeCompare(mbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mbb.find({},function(err,mbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mbbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="mca"){
			console.log("amma ravalamma");
			mcasa2.find({},function(err,mcadocs){
				console.log("amma aye babu :- "+mcadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mcadocs.length;i++){
					var r=x.localeCompare(mcadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mcadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mcadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mcb.find({},function(err,mcbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mcbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="imba"){
			console.log("amma ravalamma");
			isa2.find({},function(err,imbadocs){
				console.log("amma aye babu :- "+imbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<imbadocs.length;i++){
					var r=x.localeCompare(imbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+imbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(imbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			imbb.find({},function(err,imbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":imbbranch,"citys":cit});
			})
				});
				
			})
		}
		}	
		})

})
router.get('/releave_letter', function(req, res) {
	collection.find({},function(err,docs){
		console.log(docs);
		var s=docs.length
		res.render('releave_letter',{"titile":docs[s-1]})
	});
});

router.get('/back',function(req,res) {
	// body...
	res.render('page2')
})
router.get('/home',function(req,res) {
	// body...
	collection.find({},function(err,docs){
	esa.find({},function(err,docs1){
			msa.find({},function(err,docs2){
				isa.find({},function(err,docs3){
					mbasa.find({},function(err,docs4){
						mcasa.find({},function(err,docs5){
							var bdata=[docs1[0],docs1[9],docs1[19],docs1[29],docs1[49],docs1[59],docs1[69],docs1[79]]
            var mdata=[docs2[0],docs2[12],docs2[23],docs2[26]]
            var idata=[docs3[1],docs3[7],docs3[13],docs3[18],docs3[24],docs3[28],docs3[35],docs3[50],docs3[64],docs3[73]]
            var mbadata=[docs4[1],docs4[11],docs4[22],docs4[50]]
            var mcadata=[docs5[1],docs5[12],docs5[18],docs5[32],docs5[39],docs5[49]]
	res.render('index',{"title": docs,"seme":bdata,"msem":mdata,"isem":idata,"mbasem":mbadata,"mcasem":mcadata});
						})
					})
					})
				})
			})
		})

})
router.get('/yes',function(req,res) {
	collection1.find({},function(err,docs) {
		esa.find({},function(err,docs1){
			msa.find({},function(err,docs2){
				isa.find({},function(err,docs3){
					mbasa.find({},function(err,docs4){
						mcasa.find({},function(err,docs5){
		// body...
		var l=docs.length;
		console.log(l);
		console.log(docs[l-1]);
		collection.insert(docs[l-1],function(err,docs){
			var bdata=[docs1[0],docs1[9],docs1[19],docs1[29],docs1[49],docs1[59],docs1[69],docs1[79]]
            var mdata=[docs2[0],docs2[12],docs2[23],docs2[26]]
            var idata=[docs3[1],docs3[7],docs3[13],docs3[18],docs3[24],docs3[28],docs3[35],docs3[50],docs3[64],docs3[73]]
            var mbadata=[docs4[1],docs4[11],docs4[22],docs4[50]]
            var mcadata=[docs5[1],docs5[12],docs5[18],docs5[32],docs5[39],docs5[49]]
			res.render('index',{"title": docs,"seme":bdata,"msem":mdata,"isem":idata,"mbasem":mbadata,"mcasem":mcadata});
		})
		});
						})
	
				})
			})
		})

	})
/*	var data={
		program:req.body.program,
		sem:req.body.sem,
		examtype:req.body.examtype,
		month:req.body.month,
		regulation:req.body.regulation,
		fromdate:req.body.fromdate,
		todate:req.body.todate,
		name:req.body.name,
		college:req.body.college,
		dept:req.body.department,
		city:req.body.city,
		designation:req.body.designation,
		lab_name:req.body.lab_name,
		coursecode:req.body.coursecode,
		stdcount:req.body.count,
		acc:req.body.bank_acc_no,
		ifsc:req.body.ifsc,
		remp:req.body.remp,
		rem:req.body.rem,
		totaldays:req.body.totaldays,
		ta:req.body.ta,
		da:req.body.da,
		totalda:req.body.totalda,
		total:req.body.total,
		totalinwords:req.body.totalinwords,
		bnkname:req.body.bnkname,
		phno:req.body.phno,
		mail:req.body.email,
		mode:req.body.mode,
	}
	console.log(data)
	*/
})
router.post('/no',function(req,res) {
	// body...
	var data={
		sem:req.body.sem,
		examtype:req.body.examtype,
		month:req.body.month,
		regulation:req.body.regulation,
		program:req.body.program,
		mode:req.body.mode,

	}
	console.log(data.sem);
	console.log("amma raye");
	cities.find({},function(err,cit){
	//-------------------------------====AR17====--------------------------------------------
	if(data.regulation=="AR17"){
		if(data.program=="btech"){
			console.log("amma ravalamma");
			esa.find({},function(err,btechdocs){
				console.log("amma aye babu :- "+btechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<btechdocs.length;i++){
					var r=x.localeCompare(btechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+btechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(btechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			bb.find({},function(err,btbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":btbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mtech"){
			console.log("amma ravalamma");
			msa.find({},function(err,mtechdocs){
				console.log("amma aye babu :- "+mtechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mtechdocs.length;i++){
					var r=x.localeCompare(mtechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mtechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mtechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			mbr.find({},function(err,mtbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mtbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mba"){
			console.log("amma ravalamma");
			mbasa.find({},function(err,mbadocs){
				console.log("amma aye babu :- "+mbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mbadocs.length;i++){
					var r=x.localeCompare(mbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mbb.find({},function(err,mbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mbbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="mca"){
			console.log("amma ravalamma");
			mcasa.find({},function(err,mcadocs){
				console.log("amma aye babu :- "+mcadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mcadocs.length;i++){
					var r=x.localeCompare(mcadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mcadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mcadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mcb.find({},function(err,mcbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mcbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="imba"){
			console.log("amma ravalamma");
			isa.find({},function(err,imbadocs){
				console.log("amma aye babu :- "+imbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<imbadocs.length;i++){
					var r=x.localeCompare(imbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+imbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(imbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			imbb.find({},function(err,imbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":imbbranch,"citys":cit});
			})
				});
				
			})
		}
		}
		//----------------------------------------------====AR19====--------------------------
		else if(data.regulation=="AR19"){
			if(data.program=="btech"){
			console.log("amma ravalamma");
			esa2.find({},function(err,btechdocs){
				console.log("amma aye babu :- "+btechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<btechdocs.length;i++){
					var r=x.localeCompare(btechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+btechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(btechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			bb.find({},function(err,btbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":btbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mtech"){
			console.log("amma ravalamma");
			msa2.find({},function(err,mtechdocs){
				console.log("amma aye babu :- "+mtechdocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mtechdocs.length;i++){
					var r=x.localeCompare(mtechdocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mtechdocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mtechdocs[i]);
					////console.log(xx);
				}
			
			}
			////console.log(xx);
			mbr.find({},function(err,mtbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mtbranch,"citys":cit});
			})
				});
				
			})
		}
		if(data.program=="mba"){
			console.log("amma ravalamma");
			mbasa2.find({},function(err,mbadocs){
				console.log("amma aye babu :- "+mbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mbadocs.length;i++){
					var r=x.localeCompare(mbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mbb.find({},function(err,mbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mbbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="mca"){
			console.log("amma ravalamma");
			mcasa2.find({},function(err,mcadocs){
				console.log("amma aye babu :- "+mcadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<mcadocs.length;i++){
					var r=x.localeCompare(mcadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+mcadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(mcadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			mcb.find({},function(err,mcbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":mcbranch,"citys":cit});
			})
				});
				
			})
		}		
		if(data.program=="imba"){
			console.log("amma ravalamma");
			isa2.find({},function(err,imbadocs){
				console.log("amma aye babu :- "+imbadocs[1].Semester);
				var x=data.sem
				
				// console.log(r);
				collection1.insert(data,function(err,docs){
				console.log(docs);
				var xx=[];
				for(var i=0;i<imbadocs.length;i++){
					var r=x.localeCompare(imbadocs[i].Semester);
				if(r==0){
					console.log(data.sem+"|||"+imbadocs[i].Semester);
					// console.log("Btech :- "+btechdocs+" sd "+r);
				
					
					//xx.splice(btechdocs.length,0,btechdocs[i].CourseCode);
					xx.unshift(imbadocs[i]);
					//console.log(xx);
				}
			
			}
			//console.log(xx);
			imbb.find({},function(err,imbbranch){
			res.render('examinerdetails',{"college_det":docs,"ebcc":xx,"branch":imbbranch,"citys":cit});
			})
				});
				
			})
		}
		}	
		})
	
})
router.get('/lgn',function(req,res) {
	// body...
	res.render('login')
})
router.get('/aboutpage',function(req,res) {
	// body...
	res.render('about')
})
router.get('/contactpage',function(req,res) {
	// body...
	res.render('contact')
})
router.get('/feedbackpage',function(req,res) {
	// body...
	res.render('feedback')
})


router.get('/new',function(req,res) {
	// body...
	res.render('index')
})
router.post('/rel',function(req,res) {
	var dat={
		fdate1:req.body.fdate1,
		tdate1:req.body.tdate1,
		Name:req.body.Name,
		gmail:req.body.gmail,
		desig:req.body.desig,
		clg:req.body.clg,
		dept:req.body.dept,
		sem1:req.body.sem,
		lab:req.body.lab,
		stud:req.body.stud,
		ta:req.body.ta,
		da:req.body.da,
		rpp:req.body.rpp,
		rap:req.body.rap,
		totrem:req.body.totrem,
	}
	collection2.insert(dat,function(err,docs){
		console.log(docs);
		res.render('old_releave',{"vallu":docs});
	});
})


router.post('/orem',function(req,res) {

	var tot=req.body.totrem;
	var tinwords=converter.toWords(tot);
	var dat={
		fdate:req.body.fdate1,
		tdate:req.body.tdate1,
		Name:req.body.Name,
		gmail:req.body.gmail,
		desig:req.body.desig,
		clg:req.body.clg,
		dept:req.body.dept,
		sem:req.body.sem,
		lab:req.body.lab,
		stud:req.body.stud,
		ta:req.body.ta,
		da:req.body.da,
		rpp:req.body.rpp,
		rap:req.body.rap,
		totrem:req.body.totrem,
		ph:req.body.phno,
		bnk:req.body.bank,
		ifsc:req.body.ifsc,
		ac:req.body.acc,
		cc:req.body.course_code,
		tnd:req.body.totdays,
		tda:req.body.totda,
		tta:req.body.totta,
		tinwords:tinwords,

	}
	collection3.insert(dat,function(err,docs){
		console.log("hhh"+dat.lab[1]);
		console.log(docs);
		res.render('old_rem',{"vall":docs});
		console.log("\n\n\n\n\n na peru");
	});
})
//----------------------------------------LOGIN TAB--------------------------------------------------
router.post('/oreml',function(req,res) {

	var tot=req.body.totrem;
	var tinwords=converter.toWords(tot);
	var dat={
		fdate:req.body.fdate1,
		tdate:req.body.tdate1,
		Name:req.body.Name,
		gmail:req.body.gmail,
		desig:req.body.desig,
		clg:req.body.clg,
		dept:req.body.dept,
		sem:req.body.sem,
		lab:req.body.lab,
		stud:req.body.stud,
		ta:req.body.ta,
		da:req.body.da,
		rpp:req.body.rpp,
		rap:req.body.rap,
		totrem:req.body.totrem,
		ph:req.body.phno,
		bnk:req.body.bank,
		ifsc:req.body.ifsc,
		ac:req.body.acc,
		cc:req.body.course_code,
		tnd:req.body.totdays,
		tda:req.body.totda,
		tta:req.body.totta,
		tinwords:tinwords,

	}
	collection3.insert(dat,function(err,docs){
		console.log(docs);
		res.render('old_rem',{"vall":docs});
		console.log("\n\n\n\n\n na peru");
	});
})
//----------------------------------------LOGIN TAB--------------------------------------------------

router.get('/similar',function(req,res) {
	// body...
	collection1.find({},function(err,docs) {
		var l=docs.length;
		res.render('examinerdetails',{"college_det":docs[l-1]})
	})
})
router.post('/login',function(req,res) {
	var un=req.body.user;
	var pswd=req.body.password;
	console.log(un)

	admin.findOne({"username":un,"password":pswd},function(err,docs){
		if (!docs) {
			res.render('login',{"error":"Invalid user name or passsword try again"})
		}
		else if (docs)
		{
			delete docs.password;
			req.session.user=docs;
			res.redirect('/table')
		}
	});
});

/*
router.get('/table',function(req,res) {
		if(req.session && req.session.user){
		res.locals.user=req.session.user
		collection.find({},function(err,docs) {
			// body...
			console.log(docs);
			console.log("find")
			res.render('table',{"title": docs});
		})
		res.redirect()
	}
	else
	{
		req.session.reset();
		res.redirect('/login')
	}

})
*/
router.get('/table',function(req,res) {
	// body...
	if(req.session && req.session.user){
		res.locals.user=req.session.user
		collection.find({},function(err,docs){
		console.log(docs);
		//console.log(ta);
		//console.log(rem2);
		//var s=docs.length
		res.render('table',{"title":docs});
		//res.render('remuneration',{"title":docs,"ta":ta,"da":da,"rem":rem,"total":rem+ta+da})
		//res.render('remuneration',{ta:ta,da:da})
	});
		// res.render('table');
	}
	else
	{
		req.session.reset();
		res.redirect('/lgn')
	}
})
router.get('/getdata',function(req,res) {
	collection.find({},function(err,docs) {
		console.log("getdata daaaaaaataaaaaaaaaaaa")
		console.log(docs);
		res.send(docs);
	});
});
router.get('/getdatae',function(req,res) {
	esa.find({},function(err,docs1) {
		console.log("getdata daaaaaaataaaaaaaaaaaa")
		// console.log(docs);
		var datttt=[docs1[0],docs1[1],docs1[2],docs1[3],docs1[4],docs1[5],docs1[6],docs1[7]]
		res.send(datttt);
	});
});

router.post('/editdata',function(req,res){
	collection.update({"_id":req.body._id},{$set:req.body}, function(err,docs){
		console.log(docs)
		res.send(docs)
	})
})
router.post('/delete',function(req,res){
	collection.remove({"_id":req.body._id},function(err,docs){
		res.send(docs);
	});

})
router.get('/logout',function(req,res) {
	// body...
		res.clearCookie('session');
		req.session.destroy();
		res.redirect('/lgn');
})
//--------------------------------------RELADMIN---------------------------------------------------
router.get('/adminreleve',function(req,res) {
	// body...
	res.render('adminreleve')
})
router.post('/getreleve',function(req,res) {

	var id=req.body.a;
	console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii raaaaaaaaaaaaaaaaaaaaaaaaa "+id);
	admin.find({},function(err,docs){
		console.log("Amma fan amma "+docs);
	});
	res.send("hai "+id)
	console.log("Poooooooooooooooooooooooooooooo raaaaaaaaaaaaaaaaaaaaaaaaaaa "+id);
	//location.reload('/table')

	// body...
})
router.get('/esamp',function(req,res){
	esa.find({},function(err,docs){
		
		/*esa.insert({"Semester":"IISemester"},function(err,docs){
				console.log(docs);
			});*/
		res.render('excel sample')
		console.log("Avva fan avva");
		console.log("docsss "+docs);
	});
})
/*router.post('/esamp',function(req,res){
	esa.find({},function(err,docs){
		console.log("Avva fan avva");
		console.log("docsss "+docs);
		res.render('excel sample')
	});
})*/
router.get('/remexter',function(req,res){
	res.render('remunExter');
	console.log("Enterd");
})

// titile obj

var titile={};

router.post('/an_rel',function(req,res){
	
	collection.findOne({"fromdate":req.body.fromdate,"mail":req.body.mail},function(err,docs){
		console.log(req.body.fromdate+"\n"+req.body.mail);
		if(docs && !err){
			titile=req.body;
			console.log("titile------->"+titile);
			res.render('releave_letter',{"titile":req.body})
			// res.send(200)
		}
		if(!docs){
			res.send(500)
		}
		
});
	// console.log("Enterd");
})

router.post('/an_rem',function(req,res){
	console.log("hellowwwwwwwwwwwww-");
	collection.findOne({"fromdate":req.body.fromdate,"mail":req.body.mail},function(err,docs){
		console.log(req.body.fromdate+"\n"+req.body.mail);
		if(docs && !err){
			titile=req.body;
			console.log("titile------->"+titile);
			res.render('remuneration',{"titile":req.body})
			// res.send(200)
		}
		if(!docs){
			res.send(500)
		}
		
});
	// console.log("Enterd");
})

router.get('/arel',function(req,res){
	res.render('releave_letter',{"titile":titile});
	// console.log("Enterd");
})
router.get('/arem',function(req,res){
	res.render('remuneration',{"titile":titile});
	// console.log("Enterd");
})

module.exports = router;
