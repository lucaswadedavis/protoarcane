$(document).ready(function(){
	app.c.init();
	app.v.init();
	app.c.listeners();
})
/////////////////////////////////////////////////////////////////////////////////

var app={m:{},v:{},c:{}};

/////////////////////////////////////////////////////////////////////////////////

app.m.codebase=[];
app.m.colors={
	lightGrey:"#999",
	primary:"#f37"
};

/*
Notes on ROILA:

a "bat"
e "red"
i "big"
o "frost"
u "but"

b 	p
f 	s
l 	w
m 	n

j
k 	
t


*/

///////////////

app.m.lexer=[
	[/^v/gi,"var "],
	[/^sp/gi,'function('],
	[/^k/gi,"{"],
	[/^b/gi,"["],
	[/^p/gi,"("],
	[/^d/gi,"."],
	[/^l/gi," else"],
	


	[/sh$/gi,"=function(iri){return "],
	[/n$/gi,'=function('],
	[/th$/gi,'='],
	[/r$/gi,'; '],
	[/ch$/gi,";};"],
	[/p$/gi,')'],
	[/s$/gi,'()'],
	[/k$/gi,'}'],
	[/l$/gi,'<'],
	[/g$/gi,'>'],
	[/z$/gi,'*'],



	//[/^f/gi,"for (var "],
	[/imai/gi,';'],
	[/apa/gi,'('],
	[/opo/gi,')'],
	[/aka/gi,'{'],
	[/oko/gi,'}'],
	[/aba/gi,'['],
	[/obo/gi,']'],

	[/ono/gi,"1"],
	[/utu/gi,'2'],
	[/ithri/gi,'3'],
	[/oro/gi,'4'],
	[/ivi/gi,'5'],
	[/iksi/gi,'6'],
	[/evi/gi,'7'],
	[/aeti/gi,'8'],
	[/ieni/gi,'9'],
	[/iro/gi,'0'],
	[/abo/gi,'+'],
	[/aboba/gi,'++'],
	[/imi/gi,'-'],
	[/idvi/gi,'/'],
	[/izi/gi,'*'],

	[/ofra/gi,"for ("],
	[/ifri/gi,"if ("],
	[/elsi/gi,"else {"],
	[/eru/gi,'return']
];

/////////////////////////////////////////////////////////////////////////////////

app.c.init=function(){
	app.m.metadata={"name":"Arcane","version":"0.0.2"};
};

app.c.listeners=function(){

$("#arcane").keyup(function(){
	var snipet={};
	var input=$("#arcane").val();
	snipet.arcane=input;
	input=app.c.lexer(input);
	snipet.js=input;

	$("div#inProgress").html(snipet.js );
});

$("input#compile").click(function(){
	var snipet={};
	var input=$("#arcane").val();
	snipet.arcane=input;
	input=app.c.lexer(input);
	snipet.js=input;
	app.m.codebase.push(snipet);

	$("div#compiled").html(app.v.codebase() );
});

$("input#run").click(function(){
	for (var i=0;i<app.m.codebase.length;i++){
		eval(app.m.codebase[i].js);
	}
	input=$("#codeToRun").val();
	input=app.c.lexer(input);
	input=eval(input);
	$("div#output").html(input);
});


};

app.c.lexer=function(input){
	input=input.split(" ");
	for (var i=0;i<input.length;i++){
		for (var j=0;j<app.m.lexer.length;j++){
			//console.log(app.m.lexer[j]);
			//console.log(app.m.lexer[j][0].exec(input[i]));
			input[i]=input[i].replace(app.m.lexer[j][0],app.m.lexer[j][1]);
		}
	}
	input=input.join(" ");
	return input;
};

///////////////////////////////////////////

app.v.init=function(){
	app.v.style();
	var d="";
	d+="<table width='100%' ><tr>";
		d+="<td id='farleft'>"+app.v.lexicon()+"</td>";
		d+="<td id='left'>";
		d+="<textarea rows='5' cols='5' id='arcane' autofocus></textarea>";
		d+="<input type='button' value='compile' id='compile'></input>";
		d+="<div id='inProgress'></div>";
		d+="<div id='compiled'></div>";
	d+="</td><td id='right'>";
		d+="<textarea rows='5' cols='5' id='codeToRun' ></textarea>";
		d+="<input type='button' value='run' id='run'></input>";
		d+="<div id='output'></div>";
	d+="</td></tr></table>";
	$("body").html(d);
};


app.v.codebase=function(){
	var d="";
	for (var i=0;i<app.m.codebase.length;i++){
		d+="<div class='snipet'>";
			d+="<div class='delete'>x</div>";
			d+="<p class='arcane'>"+app.m.codebase[i].arcane+"</p>";
			d+="<p class='js'>"+app.m.codebase[i].js+"</p>";
		d+="</div>";
	}
	return d;
};

app.v.lexicon=function(){
	var d="";
	d+="<h2>lexicon</h2>";
	d+="<table id='lexicon'><tr><th>regular expression</th><th>javascript</th></tr>";
		for (var i=0;i<app.m.lexer.length;i++){
			var rc="odd";
			if (i%2==0){rc="even"}
			d+="<tr class='"+rc+"'>";
				d+="<td>"+app.m.lexer[i][0]+"</td>";
				d+="<td>"+app.m.lexer[i][1]+"</td>";
			d+="</tr>";
		}
	d+="</table>";
	return d;
};

app.v.style=function(){
	davis.style("body",{
		"width":"100%",
		"margin":"0px",
		"padding":"0px",
		"text-align":"center",
		"background":"#555",
		"color":"#fff",
		"font-size":"3em"
	});
	davis.style("div",{
		"padding":"0",
		"font-size":"1.5em",
		"margin":"30px"
	});
	davis.style("input[type=button]",{
		"width":"100%",
		"font-size":"2em"
	});
	davis.style("textarea",{
		"width":"100%",
		"font-size":"1.5em",
		"margin":"0"
	});
	davis.style("table",{
		"height":"100%",
		"width":"100%",
		"margin":"0",
		"padding":"0",
		"table-layout":"fixed"
	});
	davis.style("td",{
		"padding":"20px",
		"margin":"30px",
		"vertical-align":"top",
		"text-align":"center"
	});
	davis.style("td#left",{
		"background":"#111",
		"color":"#fff"
	});
	davis.style("td#right",{
		"background":"#fff",
		"color":"#000"
	});
	davis.style("td#right input",{
		"background":"#000",
		"color":"#fff"
	});
	davis.style("td#left input",{
		"background":"#fff",
		"color":"#000"
	});

	davis.style("td#right textarea",{
		"background":"#000",
		"color":"#fff"
	});

	davis.style("td#left textarea",{
		"background":"#fff",
		"color":"#000"
	});

	davis.style("td#farleft",{"padding":"0"});
	davis.style("table#lexicon",{
		"margin":"0",
		"padding":"0",
		"width":"100%"
	})

	davis.style("table#lexicon tr.odd td, table#lexicon tr.even td",{
		"padding":"0",
		"margin":"0",
		"margin-top":"10px",
		"background":"#333"
	});

	davis.style("table#lexicon tr.odd td",{
		"background":"#555"
	});

	davis.style("div.delete",{
		"float":"right",
		"width":"20px",
		"height":"20px",
		"margin":"0",
		"text-align":"center",
		"cursor":"pointer",
		"border":"1px solid #000",
		"color":"#000",
		"font-size":"16px"
	});

	davis.style("div#compiled",{
		"margin":"0",
		"padding":"0"
	});


	davis.style("div.snipet",{
		"background":"#fff",
		"border":"1px solid #000",
		"margin":"0",
		"padding":"10px",
		"text-align":"left"
	});

	davis.style("p.arcane",{
		"color":app.m.colors.primary,
		"padding":"0",
		"margin":"0"
	});
	davis.style("p.js",{
		"padding":"0",
		"margin":"0",
		"font-size":"0.5em",
		"color":app.m.colors.lightGrey
	});
};