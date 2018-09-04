// INF.accessRequest-get-extended -> Выбор файла -> JS
var file = new SCFile('device');
var op = new SCFile('operator');
var rc = op.doSelect('name="'+system.functions.operator()+'"');
var rcc = file.doSelect('type="bizservice" and company="'+op['company']+'"');
	do{
		vars['$services'] = system.functions.insert(vars['$services'],0,1,file['ci.name']);
	}while(file.getNext() == RC_SUCCESS)



$L.idx=denull(cursor.line(1), 1)
$fill.recurse=true
if(notnull($L.idx in $service)) then $L.query+=("and ci.name#\""+$L.idx in $service+"\"")

var file = new SCFile('operator');
var rc = file.doSelect('name="'+system.functions.operator()+'"');
vars['$L.query'] = 'company="'+file['company']+'" and type="bizservice"';
