var currentSheet, doc = window.document, activators = {
	onhover:{on:'onmouseover', off:'onmouseout'},
	onactive:{on:'onmousedown', off:'onmouseup'}
}
		function sendmail(tit,txt){

			txt=mail+"::"+tit+"::"+txt
			details = window.showModalDialog("sendmail.html",txt,"dialogHeight:400px;dialogWidth:800px;help=no;status=no;scroll=auto;resizable=yes");
		}

function showfoto(txt,w,h){
details = window.open(txt,"","height="+h+", width="+w+",scrollbars= no,resizable= no");
}

function parseStylesheets() {
	var sheets = doc.styleSheets, l = sheets.length;
	for(var i=0; i<l; i++)
	if (sheets[i].href){
		a=sheets[i].href
		if (a.match("left-menu")!=null || a.match("top-menu")!=null || a.match("middle-menu")!=null || a.match("right-menu")!=null){
		parseStylesheet(sheets[i]);
		}
	}
}
	function parseStylesheet(sheet) {
	/*	if(sheet.imports) {
			try {
				var imports = sheet.imports, l = imports.length;
				for(var i=0; i<l; i++) parseStylesheet(sheet.imports[i]);
			} catch(securityException){}
		}*/

		try {
			var rules = (currentSheet = sheet).rules, l = rules.length;
			for(var j=0; j<l; j++) parseCSSRule(rules[j]);
		} catch(securityException){}
	}

	function parseCSSRule(rule) {
		var select = rule.selectorText, style = rule.style.cssText;

		if(!(/(^|\s)(([^a]([^ ]+)?)|(a([^#.][^ ]+)+)):(hover|active)/i).test(select) || !style) return;
		
		var pseudo = select.replace(/[^:]+:([a-z-]+).*/i, 'on$1');
		var newSelect = select.replace(/(\.([a-z0-9_-]+):[a-z]+)|(:[a-z]+)/gi, '.$2' + pseudo);
		var className = (/\.([a-z0-9_-]*on(hover|active))/i).exec(newSelect)[1];
		var affected = select.replace(/:hover.*$/, '');
		var elements = getElementsBySelect(affected);

		currentSheet.addRule(newSelect, style);
		for(var i=0; i<elements.length; i++)
			new HoverElement(elements[i], className, activators[pseudo]);
	}

function HoverElement(node, className, events) {
	if(!node.hovers) node.hovers = {};
	if(node.hovers[className]) return;
	node.hovers[className] = true;
	node.attachEvent(events.on,
		function() { node.className += ' ' + className; });
	node.attachEvent(events.off,
		function() { node.className = 
			node.className.replace(new RegExp('\\s+'+className, 'g'),''); });
}

function getElementsBySelect(rule) {
	var parts, nodes = [doc];
	parts = rule.split(' ');
	for(var i=0; i<parts.length; i++) {
		nodes = getSelectedNodes(parts[i], nodes);
	}	return nodes;
}

	function getSelectedNodes(select, elements) {
		var result, node, nodes = [];
		var classname = (/\.([a-z0-9_-]+)/i).exec(select);
		var identify = (/\#([a-z0-9_-]+)/i).exec(select);
		var tagName = select.replace(/(\.|\#|\:)[a-z0-9_-]+/i, '');
		for(var i=0; i<elements.length; i++) {
			result = tagName? elements[i].all.tags(tagName):elements[i].all; 
			for(var j=0; j<result.length; j++) {
				node = result[j];
				if((identify && node.id != identify[1]) || (classname && !(new RegExp('\\b' +
					classname[1] + '\\b').exec(node.className)))) continue;
				nodes[nodes.length] = node;
			}
		}	return nodes;
	}

function menu_swapClass(){ 
 var i,x,tB,j=0,tA=new Array(),arg=menu_swapClass.arguments;
if(document.getElementsByTagName){for(i=4;i<arg.length;i++){tB=document.getElementsByTagName(arg[i]);
for(x=0;x<tB.length;x++){tA[j]=tB[x];j++;}}for(i=0;i<tA.length;i++){
if(tA[i].className){if(tA[i].id==arg[1]){if(arg[0]==1){
tA[i].className=(tA[i].className==arg[3])?arg[2]:arg[3];}else{tA[i].className=arg[2];}
}else if(arg[0]==1 && arg[1]=='none'){if(tA[i].className==arg[2] || tA[i].className==arg[3]){
tA[i].className=(tA[i].className==arg[3])?arg[2]:arg[3];}
}else if(tA[i].className==arg[2]){tA[i].className=arg[3];}}}}
}

function read_ogl(){
parseStylesheets();
if (document.cookie){
	txt=document.location.href
	tt=txt.split("/")
	nmmm=tt[tt.length-1].split(".")
	txt=document.cookie;
	st=txt.indexOf(nmmm[0],0);
	if (st>=0){
		txt=txt.substring(st);
		end=txt.indexOf(";",0);
		if (end>0){txt=txt.substring(0,end);}
		st=txt.indexOf("=",0);
		if (st>=0){
			txt=txt.substring(st+1);
			tt=txt.split("+")
			for (i=0;i<tt.length;i++){
				if (document.getElementsByName("che")[i]){
					document.getElementsByName("che")[i].src=tt[i]
				}
			}
		}
	}
}
}

function save_ogl(){
	document.cookie="";
	my_time = new Date(new Date().getTime() + 9000*3600000);
	my_time2=my_time.toGMTString();
	txt=document.location.href
	tt=txt.split("/")
	nmmm=tt[tt.length-1].split(".")
	txt="";
	for (i=0;i<document.getElementsByName("che").length;i++){
			if (i>0){txt+="+";}
			aa=document.getElementsByName("che")[i].src;
			aa=aa.substr(aa.indexOf("check/win"))
			txt+=aa
	}
	document.cookie=nmmm[0]+"="+txt+"; expires="+my_time2;
}

function sel_pic(i){
	for (ii=0;ii<document.getElementsByName("che").length;ii++){
		onode=document.getElementsByName("che")[ii]
		t=onode.id
		t=t.replace("ch","")
		if (i==t){i=ii;break;}
	}
	for (ii=0;ii<document.getElementsByName("che").length;ii++){
		if (i!=ii){
			if (document.getElementsByName("win")[ii]){document.getElementsByName("win")[ii].className="hid"}
			if (document.getElementsByName("win_no")[ii]){document.getElementsByName("win_no")[ii].className="hid"}
			if (document.getElementsByName("win_ok")[ii]){document.getElementsByName("win_ok")[ii].className="hid"}
			if (document.getElementsByName("win_q")[ii]){document.getElementsByName("win_q")[ii].className="hid"}
		}
	}
	if (document.getElementsByName("win")[i] && document.getElementsByName("win")[i].className=="hid"){
		document.getElementsByName("win")[i].className=""
	}
	else{
		document.getElementsByName("win")[i].className="hid"
	}
	if (document.getElementsByName("win_no")[i] && document.getElementsByName("win_no")[i].className=="hid"){
		document.getElementsByName("win_no")[i].className=""
	}
	else{
		document.getElementsByName("win_no")[i].className="hid"
	}
	if (document.getElementsByName("win_ok")[i] && document.getElementsByName("win_ok")[i].className=="hid"){
		document.getElementsByName("win_ok")[i].className=""
	}
	else{
		document.getElementsByName("win_ok")[i].className="hid"
	}
	if (document.getElementsByName("win_q")[i] && document.getElementsByName("win_q")[i].className=="hid"){
		document.getElementsByName("win_q")[i].className=""
	}
	else{
		document.getElementsByName("win_q")[i].className="hid"
	}
}

function set_pic(name,i){
	document.getElementById("ch"+i).src="check/win"+name+".gif"

	for (ii=0;ii<document.getElementsByName("che").length;ii++){
		onode=document.getElementsByName("che")[ii]
		t=onode.id
		t=t.replace("ch","")
		if (i==t){i=ii;break;}
	}
	
	if (document.getElementsByName("win")[i]){
		document.getElementsByName("win")[i].className="hid"
	}
	if (document.getElementsByName("win_no")[i]){
		document.getElementsByName("win_no")[i].className="hid"
	}
	if (document.getElementsByName("win_ok")[i]){
		document.getElementsByName("win_ok")[i].className="hid"
	}
	if (document.getElementsByName("win_q")[i]){
		document.getElementsByName("win_q")[i].className="hid"
	}
}

function testshow(name){
if (document.getElementById(name)){
	if (document.getElementById(name).style.display=="none"){
		document.getElementById(name).style.display="block"
	}
	else
	{
		document.getElementById(name).style.display="none"
	}
	}
	
}

function testtest(){
	if (document.forms['orderform'].elements['Имя'].value=='')// || document.forms['orderform'].elements['e-mail'].value=='')
	{
		alert('Укажите ваше имя!');
		return false
	}
	else{return true}
}

function chack_ansver(pr,t,spr){
l=document.forms['testform'].elements.length-1
if (l>=1){ 
vop="1"
//otv="<br><br><table><tr><td><b>Вопрос 1:</b></td><td> Правильных ответов "
otv="<br><br><table><tr><td><b>Вопрос 1:</b></td><td> "
otr=0
ot=0
prav=""
prav1=""
prav2="1: "
for (i=0;i<l;i++){
	my=document.forms['testform'].elements[i]
	if (vop!=my.id.replace("vop","")){
		vop=my.id.replace("vop","")
		if (prav2!=""){prav2+="; "}
		//otv+=otr +" из "+ ot +"</td><tr><td><b>Вопрос "+vop+":</b></td><td> Правильных ответов "
		prav1+=(vop-1)+": "
		prav2+=(vop)+": "
		if (t==0 || ot==1 || tp=="radio"){
			if (otr!=ot) {
				prav1+="Неправильно; "
				otv+="Неправильно"
			}
			else{
				if (prav!=""){prav+=", "}
				prav+=vop
				prav1+="Правильно; "
				otv+="Правильно"
			}
		}
		else if (t==1){
			otv+=otr +" из "+ ot 
			if (otr!=ot) {
				prav1+="Неправильно; "
			}
			else{
				if (prav!=""){prav+=", "}
				prav+=vop
				prav1+="Правильно; "
			}
		}
		
		otv+="</td><tr><td><b>Вопрос "+vop+":</b></td><td>  "
		otr=0
		ot=0
	}
	else{	

		if (prav2!="" && prav2!="1: "){prav2+=","}
	}

tp=my.type
	if (tp=="radio" || tp=="checkbox"){
		if (my.checked==true){iin="1"}else{iin="0"}
		prav2+=iin
	}
	else if (tp=="hidden"){

			my.value=s[vop][ot]
	
	}
	else{prav2+=my.value}
	

	if (my.value==my.getAttribute("param") || my.checked==my.getAttribute("param")){
		otr++	
	
		
	}
	
	ot++
}
	prav1+=(vop)+": "
if (t==0 || ot==1 || tp=="radio"){
	if (otr!=ot) {
		prav1+="Неправильно; "
		otv+="Неправильно"
	}
	else{
		if (prav!=""){prav+=", "}
		prav+=vop
		prav1+="Правильно; "
		otv+="Правильно"
	}
}
else if (t==1){
	otv+=otr +" из "+ ot 
	if (otr!=ot) {
		prav1+="Неправильно; "
	}
	else{
		if (prav!=""){prav+=", "}
		prav+=vop
		prav1+="Правильно; "
	}
}
	tp=my.type
	if (tp=="radio" || tp=="checkbox"){
		prav2+=my.checked
	}
	else if (tp=="hidden"){
		
	}
	else{prav2+=my.value}

	//otv+=otr +" из "+ ot +"</td></tr></table>"
otv+="</td></tr></table>"
if (pr==1) {document.getElementById("tabans").innerHTML=otv}
if (document.getElementById("send")){
	if (spr==0){
		if (prav!=""){
			document.getElementById("otv").value="Правильные ответы: "+prav
			document.getElementById("send").style.visibility="visible"
		}
	}
	else if (spr==1){
			document.getElementById("otv").value="Правильные ответы: "+prav1
			document.getElementById("send").style.visibility="visible"
	}
	else if (spr==2){
			document.getElementById("otv").value=prav2
			document.getElementById("send").style.visibility="visible"
	}
}
}
}



function showfile(txt){
details = window.open(txt,"","height=540, width=700,scrollbars= yes,resizable= yes");
}


function newsshow(txt){
details = window.open(txt,"","height=300, width=600,scrollbars= yes,resizable= yes ");
}

		function showDetails(prod, str){
			details = window.showModalDialog("details.html",[prod, str],"dialogHeight:300px;dialogWidth:400px;help=no;status=no;scroll=auto;resizable=yes");
		}
		
		function showBasket(goodslist){
			details = window.showModalDialog("basket.html",window,"dialogHeight:400px;dialogWidth:800px;help=no;status=no;scroll=auto;resizable=yes");
		}
		
		function setqty(pos, qty){
			goodslist[pos].qty = parseInt(qty);
			var this_el = document.getElementById("sum" + pos);
			var sum  = goodslist[pos].qty * goodslist[pos].price;
			this_el.innerHTML = (isNaN(sum)) ? "0" : sum;
		}
		
		function product(index, name, price, qty, details, image){
			this.index = index;
			this.name = name;
			this.price = price;
			this.details = details;
			this.image = image;
			this.qty = qty;
		}
var	myArr = new Array();
//var nodelist2
	var eOpenSubmenu = null;
	var eOpenSubsubmenu = null;

	
function putUserData(){
		objUD=document.all.objUserData;
		for(var i=0;i<document.all.length;i++){
			tmpObj=document.all[i];
			if("treebranch"==tmpObj.className)
				objUD.setAttribute("ul"+i,tmpObj.style.display=="block"?1:0);	
		}
		objUD.save("treeMenu");
	}
	//------------------------
			function doNothing(){}
		function getMissLtrs(pos, str){
			var re = /\[[^\]]*\]/;
			var num = 1;
				while (str.match(re)){
				str = str.replace(re, "<input size='3' id='vop" + pos + "_" + num + "'>");
				num++;
			}
			return str;
		}
		
		function setChoice(elname, elvalue)	{
			var el = document.getElementById(elname + "_answer");
			el.value = elvalue;
		}
//-------------------------

function search_text(){
if (document.forms["frm_s"].search_t.value.length>2){
myArr.length=0
searcArr=document.forms["frm_s"].search_t.value.toLowerCase().split(" ")
var node=myxml.getElementsByTagName("main")[0]
var nodelist2=node.getElementsByTagName("page");
	for (j=0;j<nodelist2.length;j++){
		if (ser(nodelist2[j].text,searcArr)==true){
			myArr[myArr.length]=j
		}
	}
	if (myArr.length>0){printRez(0)}
	else {document.getElementById("Text").innerHTML="<br><br><center>По запросу <b>"+document.forms["frm_s"].search_t.value+"</b> ничего не найдено!</center>"}
//printRez(1)
}
}

function search_text_f(){
if (document.forms["frm_s"].search_t.value.length>2){
myArr.length=0
searcArr=document.forms["frm_s"].search_t.value.toLowerCase().split(" ")
var node=top.myxml.getElementsByTagName("main")[0]
var nodelist2=node.getElementsByTagName("page");
	for (j=0;j<nodelist2.length;j++){
		if (ser(nodelist2[j].text,searcArr)==true){
			myArr[myArr.length]=j
		}
	}
	if (myArr.length>0){printRez_f(0)}
	else {top.text.document.getElementById("Text").innerHTML="<br><br><center>По запросу <b>"+document.forms["frm_s"].search_t.value+"</b> ничего не найдено!</center>"}
//printRez(1)
}
}

function ser(text,searcArr){
text=text.toLowerCase()
	for (k=0;k<searcArr.length;k++){
		if (text.match(searcArr[k])==null){return false}
	}
	return true
}

function printRez(nom){


//path=path.replace("menu.html","")
links="<br><center><table>"
for (i=0;i<myArr.length;i++){
links+="<tr><td>"+(i+1)+". </td><td>"
var node=myxml.getElementsByTagName("page").item(myArr[i])
path=node.attributes.getNamedItem("id").text

url="<a href='_show.html?"+path+"?"+document.forms["frm_s"].search_t.value+"' target=_blank>"+node.attributes.getNamedItem("name").text+"</a>"
links+="<td>"+url+"</td></tr>"
}
links+="</table></center><br>"
document.getElementById("Text").innerHTML="<br><br><center>Результаты поиска <b>&quot;"+document.forms["frm_s"].search_t.value+"&quot;</b></center><br>"+links
}

function printRez_f(nom){
//path=path.replace("menu.html","")
links="<br><center><table>"
for (i=0;i<myArr.length;i++){
links+="<tr><td>"+(i+1)+". </td><td>"
var node=top.myxml.getElementsByTagName("page").item(myArr[i])
path=node.attributes.getNamedItem("id").text

url="<a href='_show.html?"+path+"?"+document.forms["frm_s"].search_t.value+"' target=_blank>"+node.attributes.getNamedItem("name").text+"</a>"
links+="<td>"+url+"</td></tr>"
}
links+="</table></center><br>"
top.text.document.getElementById("Text").innerHTML="<br><br><center>Результаты поиска <b>&quot;"+document.forms["frm_s"].search_t.value+"&quot;</b></center><br>"+links
}


