//==============================================//
	var _lng = system.functions.lng;			//
	var _ins = system.functions.insert;			//
	var _op = system.functions.operator;		//
	var _date = system.functions.tod;			//
	var _val = system.functions.val;			//
	var _tod = system.functions.tod;			//
	var _conts = system.functions.contents		//
	var _ = lib.Underscore.require();			//
	var _index = system.functions.index			//
	var _getval = lib.context.GetValue;			//
	var $ = lib.c.$;							//
												//
//=============================================//


/**
	This function select the value of a specified field of a specified record in a specified table.
	Origin: context

*	@param {name} 			name	    - the field value of the record to be retrieved
*	@param {tablename} 		table	    - a table name
*	@param {field} 			field	    - the field name that is to contain the {name} value
*	@param {returnfield}	field	    - the field containing the value that the function returns.


	if nothing is selected or if select does not work properly function returns false
**/
function _getvalCustom(name, tablename, field, returnfield){
	var fRecord = new SCFile(tablename);
	var sql = field + "= \"" + name + "\"";
	var rc = fRecord.doSelect( sql );
	if(rc == RC_SUCCESS){
		return fRecord[returnfield];
	}
	else{
		return false
	}

}

function docnew_run(name,rec){
	var rteReturnValue = new SCDatum();
  	var rteNames = new SCDatum();
  	var rteVals = new SCDatum();
	rteNames.setType(8); //type array
	rteNames.push("file");        //Notification Name - INTO.NAME
	rteNames.push("name");      //Current File - INTO.FILE
	rteNames.push("prompt");
	rteNames.push("description");
	rteVals.setType(8);
	rteVals.push(rec); // Interaction Record
	rteVals.push(name);	//RuleSet Name //TODO: на текущий момент такого не существует
	rteVals.push(true)
	rteVals.push("add")
	system.functions.rtecall("callrad",rteReturnValue,"document.new",rteNames,rteVals,false);
	return rec['incident.id']
}

function docnew_cm3t(rec){
	var rteReturnValue = new SCDatum();
  	var rteNames = new SCDatum();
  	var rteVals = new SCDatum();
	rteNames.setType(8); //type array
	rteNames.push("file");        //Notification Name - INTO.NAME
	rteNames.push("name");      //Current File - INTO.FILE
	rteNames.push("prompt");
	rteNames.push("description");
	rteVals.setType(8);
	rteVals.push(rec); // Interaction Record
	rteVals.push("cm3t");	//RuleSet Name //TODO: на текущий момент такого не существует
	rteVals.push(true)
	rteVals.push("add")
	system.functions.rtecall("callrad",rteReturnValue,"document.new",rteNames,rteVals,false);
	return rec['number']
}

function task_new(rec,parent){
	var rteReturnValue = new SCDatum();
  	var rteNames = new SCDatum();
  	var rteVals = new SCDatum();
	rteNames.setType(8); //type array
	rteNames.push("file");        //Notification Name - INTO.NAME
	rteNames.push("second.file");      //Current File - INTO.FILE
	rteNames.push("boolean1");
	rteVals.setType(8);
	rteVals.push(rec); // Interaction Record
	rteVals.push(parent);	//RuleSet Name //TODO: на текущий момент такого не существует
	rteVals.push(true)
	//print('before task.new');
	//print('brief.desc '+rec['brief.desc']);
	//print('title '+rec['title']);
	//print('description '+rec['description']);
	system.functions.rtecall("callrad",rteReturnValue,"task.new",rteNames,rteVals,false);
	//print('after task.new');
	//print('brief.desc '+rec['brief.desc']);
	//print('title '+rec['title']);
	//print('description '+rec['description']);
	return rec['number'];
}

function getCommonItems(input){

	var index=[];
	var match = 1;
	var out = [];
	for(var i=0; i < input.length; i++){

		for(var k=0; k<input[i][1].length; k++){

			match = 1;
			for(var next = i+1; next<input.length; next++){
				if(input[i][1][k] == input[next][1][k]){
					index = (k);

					match++;

					if(match == input.length){
						if(findAccess(input,k,index)){

							out.push(input[i][1][k],input[i][2][k],input[i][3][k]);
							match = 1;
						}
					}
				}
			}
		}
	}
	return out;
}

function findAccess(input,originalIndex,index){
	var match = 1;
		for(var j = 1; j < input.length; j++){

			if(input[0][2][originalIndex]==input[j][2][index]){

				match++;

				if(match == input.length){
					return findRight(input,originalIndex,index);
				}
			}
			else match = 0;
		}
}

function findRight(input,originalIndex,index){
	var match = 1;

		for(var j = 1; j <input.length; j++){

			if(input[0][3][originalIndex]==input[j][3][index]){

				match++;

				if(match == input.length) return true;
			}
			else match = 0;
		}
}


function GetNextNumber(type){
	/*
		function returns next number for table
		type - table name
	*/
	var nRtn = new SCDatum;
	var nNumber = new SCDatum;
	system.functions.rtecall("getnumber", nRtn, nNumber, type);
	return nNumber.getText();
}

// оставляет в массиве только НЕуникальные занчения
function removeUnique(arr) {
	if(arr.length>1){
		var newArr = [];
		for (var i = 0; i < arr.length; i++) {
			var count = 0;
			for (var j = 0; j < arr.length; j++) {
				if (arr[j] == arr[i]) {
					count++;
				}
			}
			if (count >= 2) {
				newArr.push(arr[i]);
			}
		}
	    return newArr;
	}else return arr
}

// оставляет в массиве только уникальные значения
function uniqueArray(arr) {
   	var i = arr.length;
	arr.sort();
	while (i--) {
	    if (arr[i] == arr[i-1]) {
	        arr.splice(i, 1);
	    }
	}
	return arr;
}

function getCSS(){
	var style;
	style =		"<style> ";
	style +=	"body{border:0 0 0 0;margin:0;padding:0;font-family: Verdana, Arial, Helvetica, sans-serif;}";
	style +=	".error{color: #454323;background: white;}";
	style +=	".error td{padding:1 2 1 1;color: red;line-height: 12;}";
	style +=	".main{width:100%;font-size: 10;text-align: left}";
	style +=	".main th{font-weight: bold;padding:4;background: #E0E0E0;}";
	style +=	"th.rowtitle{font-weight: bold;padding:4;background: #99BBE8;}";
	style +=	".oddRow{background: #edf3fe;color: black}";
	style +=	".evenRow{background: white;color: black}";
	style +=	".message{background: white;color: blue}";
	style +=	"</style>"

	return style;

}

function showRoleContents(){
	vars['$roleTable']=null;
	vars['$serviceTable']=null;
	vars['$accsTable']=null;
	vars['$rightTable']=null;
	var device = new SCFile('device');
	var dQuery;
	for (var i = 0; i < _lng(vars['$roleID']); i++){
		dQuery = device.doSelect('logical.name="'+vars['$roleID'][i]+'"');
		if(dQuery == RC_SUCCESS){
			for(var bzsCount = 0; bzsCount<_lng(device['bzs.id']); bzsCount++){
					vars['$roleTable'] = _ins(vars['$roleTable'],0,1,device['ci.name']);
					vars['$serviceTable'] = _ins(vars['$serviceTable'],0,1,_getval(device['bzs.id'][bzsCount],'device','logical.name','ci_name'));
					vars['$accsTable'] = _ins(vars['$accsTable'],0,1,_getval(device['accs.id'][bzsCount],'device','logical.name','ci_name'));
					vars['$rightTable'] = _ins(vars['$rightTable'],0,1,_getval(device['right.id'][bzsCount],'device','logical.name','ci_name'));
					//print(bzs['logical.name']);
				}
			}
		}
}


function getBZS() {
	var arr = [];
	var serv = new SCFile('device');
	var rel = new SCFile('cirelationship');
	var rc = serv.doSelect('type="bizservice" and company="'+vars['$lo.operator']['company']+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.")');
	if (rc == RC_SUCCESS) {
		do{
			var rcc=rel.doSelect('logical.name="'+serv['logical.name']+'"');
			if (rcc == RC_SUCCESS) {
				do{
					if(rel['related.cis'][0].search('acss') != -1){
						arr.push(rel['logical.name']);
						break;
					}
				}while(rel.getNext() == RC_SUCCESS)
			}
		}while(serv.getNext() == RC_SUCCESS)
	}
	return arr;
}

function getACSS(){
	var arr = [];
	var serv = new SCFile('device');
	var rel = new SCFile('cirelationship');
	var rc = serv.doSelect('type="bizservice" and company="'+vars['$lo.operator']['company']+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.")');
		do{
			var rcc=rel.doSelect('logical.name="'+serv['logical.name']+'"')
			do{
				if(!(-1==rel['cis.related'].indexOf('acss'))){
					arr.push()
					vars['$acss']=_ins(vars['$acss'],0,1,rel['cis.related'].indexOf('acss'));
				}
			}while(rel.getNext() == RC_SUCCESS)
		}while(serv.getNext() == RC_SUCCESS)

}


function roleAccessTable(recipients){
	var roles = [];
	var roleIDs = [];
	var subIDs = [];
	var recIDs = [];
	var subscribers = [];
	var subscriptionIDs = [];
	var conts = new SCFile('contacts');
	var file = new SCFile('Subscription');
	for(var i  = 0; i < _lng(vars['$recIDs']); i++){
		var rc = file.doSelect('subscriber="'+vars['$recIDs'][i]+'" and type="Ролевой доступ" and active=true'); //Дописать активность записи
		if(rc == RC_SUCCESS){
			do{
				roles.push(file['role.name']);
				roleIDs.push(file['role.id']);
				subscribers.push(file['subscriber']);
				subscriptionIDs.push(file['subscriptionID']);
			}while(file.getNext() == RC_SUCCESS)
		}
		else{
			roles.push(null)
			roleIDs.push(null)
		}
	}
	if(_lng(vars['$recIDs']) >1){
		for(var i = 0; i< roleIDs.length; i++){
			for(var j = i+1; j<roleIDs.length; j++){
				if(roleIDs[i] == roleIDs[j]){
					print(roleIDs[i] +'=='+ roleIDs[j]);
					roleIDs.splice(i, 1);
					roles.splice(i,1);
				}
				else{
					print('no common');
					roles =[];
					roleIDs =[];
					break
				}
			}
		}
	}
		vars['$role'] = roles;
		vars['$roleID'] = roleIDs;
	vars['$lo.roleSubscriber']=subscribers
	vars['$lo.roleSubscriberID']=subscriptionIDs
}



function extAccessTable(recipients){
	vars['$recIDs'] = system.functions.insert(vars['$recIDs'],0,1,vars['$recipientID']);
	var subscribers = [];
	var subscriptionIDs = [];
	var subIDs=[];
	var datanew = [];
	var result = [];
	var bzsTemp = [];
	var accsTemp = [];
	var rightTemp = [];
	var file = new SCFile('Subscription');
	if(_lng(vars['$recIDs']) > 1){
		for(var i = 0; i < _lng(vars['$recIDs']); i++){
		var rc = file.doSelect('subscriber="'+vars['$recIDs'][i]+'" and type="Расширенный доступ" and active=true');
			if(rc==RC_SUCCESS){
				do{
					bzsTemp.push(file['serviceName']);
					accsTemp.push(file['acss.id']);
					rightTemp.push(file['right.id']);
					subscribers.push(file['subscriber']);
					subscriptionIDs.push(file['subscriptionID']);
				}while(file.getNext() == RC_SUCCESS)

				datanew.push([i,bzsTemp,accsTemp,rightTemp]);
				bzsTemp = [];
				accsTemp = [];
				rightTemp = [];
			}
			else{
				datanew.push([i,[null],[null],[null]]);
			}
		}
		result = getCommonItems(datanew);
	}
	else{
		var rc = file.doSelect('subscriber="'+vars['$recIDs'][0]+'" and type="Расширенный доступ" and active=true');
		if(rc==RC_SUCCESS){
			do{
				result.push(file['serviceName']);
				result.push(file['acss.id']);
				result.push(file['right.id']);
				subscribers.push(file['subscriber']);
				subscriptionIDs.push(file['subscriptionID']);
			}while(file.getNext() == RC_SUCCESS)
		}
	}
		var i = 0;
		while(i < result.length){
			var bzsFile = new SCFile('device');
			var brc = bzsFile.doSelect('logical.name="'+result[i]+'"');
			vars['$bzs'] = _ins(vars['$bzs'],0,1,bzsFile['ci.name']);
			vars['$bzsID'] = _ins(vars['$bzsID'],0,1,result[i]);
			var acsFile = new SCFile('device');
			var arc = acsFile.doSelect('logical.name="'+result[i+1]+'"');
			vars['$accs'] = _ins(vars['$accs'],0,1,acsFile['ci.name']);
			vars['$accsID'] = _ins(vars['$accsID'],0,1,result[i+1]);
			var rigFile = new SCFile('device');
			var rrc = rigFile.doSelect('logical.name="'+result[i+2]+'"')
			for(var j = 0; j < vars['$recIDs'].length; j++){
				var s = new SCFile('Subscription');
				var rc = s.doSelect('subscriber="'+vars['$recIDs'][j]+'" and right.id="'+result[i+2]+'" and active=true');
				if(rc == RC_SUCCESS){
					subIDs.push([s['subscriptionID'],vars['$recIDs'][j]]);
				}
			}
			vars['$right'] = _ins(vars['$right'],0,1,rigFile['ci.name']);
			vars['$rightID'] = _ins(vars['$rightID'],0,1,result[i+2]);
			i+=3;
		}
		result=[];
		vars['$lo.subscriber'] = subscribers;
		vars['$lo.subscriberID'] = subscriptionIDs;
}


function selectExt(id){
	var file = new SCFile('Subscription');
	var rc = file.doSelect('subscriptionID="'+id+'"');
	if(rc==RC_SUCCESS){
		if(file['type']=='Расширенный доступ'){
			vars['$subscrFile'] = file;
			vars['$wizardName'] = 'INF.accessRequest-mod-ext';
		}
	}
}


function getDateDifference(date2){
	var dt = _val(_val(date2, 3), 1);
	var target = 5*24*3600+_val(_tod(),1);
	if(dt>target){
		return true;
	}
	else{
		return false;
	}
}
function getDateDifference(date1,date2){
	var dt = _val(_val(date2, 3), 1);
	var target = 5*24*3600+_val(_val(date1, 3), 1);
	if(dt>target){
		return true;
	}
	else{
		return false;
	}
}
//getExtAccess_buldLinkQuery__service()

function initializeCombo(){
	var file = new SCFile('device');
	var rc = file.doSelect('type="bizservice" and company="'+vars['$lo.operator']['company']+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.")');
	if(rc == RC_SUCCESS){
		do{
			vars['$serviceIDCombo'] = system.functions.insert(vars['$serviceIDCombo'],0,1,file['logical.name']);
			vars['$serviceNameCombo'] = system.functions.insert(vars['$serviceNameCombo'],0,1,file['ci.name']);
		}while(file.getNext() == RC_SUCCESS)
	}
}

function getExtAccess_buldCombo__accs(id){
	var names = new Array;
	var ids = new Array;
	var rel = new SCFile('cirelationship');
	var device = new SCFile('device');
	var right_rel = new SCFile('cirelationship');
	var right = new SCFile('device');
	var rc = rel.doSelect('logical.name="'+id+'"')
	if(rc == RC_SUCCESS){
		var rcond = true;
		do{
			var rcc = device.doSelect('type="acss" and logical.name="'+rel['related.cis'][0]+'"  and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
			if(rcc == RC_SUCCESS){
				do{
					var rightRelQuery = right_rel.doSelect('logical.name="'+rel['related.cis'][0]+'"');
					if(rightRelQuery == RC_SUCCESS){
						if(right_rel['related.cis'][0].search('right')!=-1){
							do{
								var rightQuery = right.doSelect('logical.name="'+right_rel['related.cis'][0]+'"and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
								if(rightQuery == RC_SUCCESS){
									names.push(device['logical.name']);
									ids.push(device['ci.name']);
									rcond = false;
								}
								var rcccc = right_rel.getNext();
								if (rcccc != RC_SUCCESS) rcond = false;
							}while(rcond)
						}
					}
				}while(device.getNext() == RC_SUCCESS)
			}
		}while(rel.getNext()==RC_SUCCESS)
	}
	vars['$acssIDCombo'] = ids;
	vars['$acssNameCombo'] = names;
}

function getExtAccess_buldCombo__right(id){
	var names = new Array;
	var ids = new Array;
	var rel = new SCFile('cirelationship');
	var device = new SCFile('device');
	var rc = rel.doSelect('logical.name="'+id+'"')
	if(rc == RC_SUCCESS){
		do{
			var rcc = device.doSelect('type="right" and logical.name="'+rel['related.cis'][0]+'"  and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
			if(rcc == RC_SUCCESS){
				do{
					names.push(device['logical.name']);
					ids.push(device['ci.name']);
				}while(device.getNext() == RC_SUCCESS)
			}
		}while(rel.getNext()==RC_SUCCESS)
	}

	vars['$rightIDCombo'] = ids;
	vars['$rightNameCombo'] = names;
}


function getExtAccess__addToTable(sID,sName,aID,aName,rID,rName){
	var success = true;
	var sIDtemp,sNametemp,aIDtemp,aNametemp,rIDtemp,rNametemp;
	if((sID != null) && (sName != null) && (aID != null) && (aName != null) && (rID != null) && (rName != null)){
		if(_getvalCustom(sID,'device','logical.name','ci_name') != false && _getvalCustom(sID,'device','logical.name','ci_name') == sName && success){
			sIDtemp = sID
			sNametemp = sName;
		}
		else{
			success = false
			print('Некорректное значение \"Услуга\"');
		}
		if(_getvalCustom(aID,'device','logical.name','ci_name') != false && _getvalCustom(aID,'device','logical.name','ci_name') == aName && success){
			aIDtemp = aID;
			aNametemp = aName;
		}
		else{
			success = false
			print('Некорректное значение \"Обьект доступа\"')
		}
		if(_getvalCustom(rID,'device','logical.name','ci_name') != false && _getvalCustom(rID,'device','logical.name','ci_name') == rName && success){
			rIDtemp = rID;
			rNametemp = rName;
		}
		else{
			success = false
			print('Некорректное значение \"Право доступа\"')
		}
	}
	else{
		print('Атрибуты \"Услуга\", \"Обьект доступа\" или \"Право доступа\" не могут быть пустыми!');
	}

	if(success){
		vars['$serviceIDs'] = _ins(vars['$serviceIDs'],0,1,sIDtemp);
		vars['$serviceNames'] = _ins(vars['$serviceNames'],0,1,sNametemp);
		vars['$acssIDs'] = _ins(vars['$acssIDs'],0,1,aIDtemp);
		vars['$acssNames'] = _ins(vars['$acssNames'],0,1,aNametemp);
		vars['$rightIDs'] = _ins(vars['$rightIDs'],0,1,rIDtemp);
		vars['$rightNames'] = _ins(vars['$rightNames'],0,1,rNametemp);
	}
}


function getExtAccess__removeFromTable(element){
	var sId = vars['$serviceIDs'].toArray;
	var sName = vars['$serviceNames'].toArray;
	var acssId = vars['$acssIDs'].toArray;
	var acssName = vars['$acssNames'].toArray;
	var rightId = vars['$rightIDs'].toArray;
	var rightName = vars['$rightNames'].toArray;
	sId.splice(element,1);
	sName.splice(element,1);
	acssId.splice(element,1);
	acssName.splice(element,1);
	rightId.splice(element,1);
	rightName.splice(element,1);
	vars['$serviceIDs'] = sId;
	vars['$serviceNames'] = sName;
	vars['$acssIDs'] = acssId;
	vars['$acssNames'] = acssName;
	vars['$rightIDs'] = rightId;
	vars['$rightNames'] = rightName;
}

//	запрос расширеного доступа
function createARGetExt(serviceIds,serviceNames,accsIds,acssNames,rightIds,rightNames,desc,start,end){
	var incidentID;
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['related.cis'][0],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	inc['callback.contact'] = _op();
	inc['title'] = 'Запрос доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'request for change'
	inc['subcategory'] = 'access request'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');



	var rejectedAR = [];
	var rejectedARSUB = [];
	var approvedAR = [];
	var successCount = 0;
	var file = new SCFile('accessRequest');
	//print(serviceIds.length());
	for(var recipientCount = 0; recipientCount < _lng(vars['$recIDs']); recipientCount++){
		//print('recipient '+recipientCount);
		for(var attribCount = 0; attribCount < serviceIds.length(); attribCount++){
			//print('acess '+attribCount)
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('recipient="'+vars['$recIDs'][recipientCount]+'" and cis.bzs.id="'+serviceIds[attribCount]+'" and cis.acss.id="'+accsIds[attribCount]+'" and cis.right.id="'+rightIds[attribCount]+'" and category="Предоставление"  and status="Открыт"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+vars['$recIDs'][recipientCount]+'" and serviceName="'+serviceIds[attribCount]+'" and acss.id="'+accsIds[attribCount]+'" and right.id="'+rightIds[attribCount]+'" and type="Расширенный доступ" and active=true')
				if(rrc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['initiator'] = _op();
					file['date.open'] = _tod();
					file['oper.open'] = _op();
					file['recipient'] = vars['$recIDs'][recipientCount];
					file['category'] = 'Предоставление';	//предоставление изменние отзыв
					file['type'] = 'Расширеный';		//базовый расширеный ролевой
					file['description'] = desc;
					file['cis.bzs.id'][0] = serviceIds[attribCount];
					file['cis.bzs.name'][0] = serviceNames[attribCount];
					file['cis.acss.id'][0] = accsIds[attribCount];
					file['cis.acss.name'][0] = acssNames[attribCount];
					file['cis.right.id'][0] = rightIds[attribCount];
					file['cis.right.name'][0] = rightNames[attribCount];
					file['company'] = vars['$lo.operator']['company'];
					file['start.date'] = _val(start,3);
					file['end.date'] = _val(end,3);
					file['sd.id'] = inc['incident.id'];
					file['status'] = 'Открыт';
					var rc = file.doInsert();
					approvedAR.push(file['id']);
					if(rc == RC_SUCCESS){
						successCount++;
						//print(successCount);
					}
				}
				else{
					rejectedARSUB.push(s['subscriptionID']);
				}
			}
			else{
				rejectedAR.push(f['id']);
			}
		}
	}
	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['cis.bzs.name']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['cis.acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['cis.right.name'])
			vars['$extDate'] = _ins(vars['$extDate'],0,1,f['date.open']);
			vars['$extRecipient'] = _ins(vars['$extRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	for(var i = 0; i < rejectedARSUB.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedARSUB[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsSUB'] = _ins(vars['$bzsSUB'],0,1,f['displayName']);
			vars['$accsSUB'] = _ins(vars['$accsSUB'],0,1,f['acss.name']);
			vars['$rightSUB'] = _ins(vars['$rightSUB'],0,1,f['right.name'])
			vars['$extDateSUB'] = _ins(vars['$extDateSUB'],0,1,f['open.date']);
			vars['$extRecipientSUB'] = _ins(vars['$extRecipientSUB'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
		}
	}
	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		vars['$G.bg'] = true;
		incidentID = docnew_run('incidents',inc);
		vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
		var f = new SCFile('accessRequest');
		//print('select ' +approvedAR[i]);
		var rc = f.doSelect('id="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['cis.bzs.name']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['cis.acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['cis.right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['date.open']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
			//print('push into vars');
			f['sd.id'] = incidentID;
			var ff = f.doUpdate();
		}
	}
}



function createARModExt__time(newTime,user,bzs,acss,right){
	//print('func time');
	var bz = new SCFile('device');
	var ac = new SCFile('device');
	var ri = new SCFile('device');
	var file = new SCFile('accessRequest');
	file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
		file['initiator'] = _op();
		file['recipient'] = user;
		//print(user);
		file['date.open'] = _tod();
		file['oper.open'] = _op();
		file['category'] = 'Изменение';	//предоставление изменние отзыв
		file['type'] = 'Расширеный';		//базовый расширеный ролевой
		file['end.date'] = newTime;
		file['company'] = vars['$lo.operator']['company'];
		file['description'] = vars['$reason'];
		file['cis.bzs.id'][0] = bzs;
		var bq = bz.doSelect('logical.name="'+bzs+'"');
		file['cis.bzs.name'][0] = bz['ci.name'];
		file['cis.acss.id'][0] = acss;
		var aq = ac.doSelect('logical.name="'+acss+'"');
		file['cis.acss.name'][0] = ac['ci.name'];
		file['cis.right.id'][0] = right;
		var rq = ri.doSelect('logical.name="'+right+'"');
		file['cis.right.name'][0] = ri['ci.name'];

	var rc = file.doInsert();
	print(RCtoString(rc));
}

function createARModExt__right(bzs,acss,right,user){
	var bz = new SCFile('device');
	var ac = new SCFile('device');
	var ri = new SCFile('device');
	var device = new SCFile('device');
	var file = new SCFile('accessRequest');
	file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
		file['initiator'] = _op();
		file['recipient'] = user;
		//print(user);
		file['date.open'] = _tod();
		file['oper.open'] = _op();
		file['category'] = 'Изменение';	//предоставление изменние отзыв
		file['type'] = 'Расширеный';		//базовый расширеный ролевой
		file['cis.bzs.id'][0] = bzs;
		var bq = bz.doSelect('logical.name="'+bzs+'"');
		file['cis.bzs.name'][0] = bz['ci.name'];
		file['cis.acss.id'][0] = acss;
		var aq = ac.doSelect('logical.name="'+acss+'"');
		file['cis.acss.name'][0] = ac['ci.name'];
		file['cis.right.id'][0] = right;
		var rq = ri.doSelect('logical.name="'+right+'"');
		file['cis.right.name'][0] = ri['ci.name'];
		file['company'] = vars['$lo.operator']['company'];
		file['description'] = vars['$reason'];
		file['status'] = 'Открыт';
	var rc = file.doInsert();
	print(RCtoString(rc));
}
function createARModExt__rightTime(bzs,acss,right,newTime,user){
	var bz = new SCFile('device');
	var ac = new SCFile('device');
	var ri = new SCFile('device');
	var device = new SCFile('device');
	var file = new SCFile('accessRequest');
	file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
		file['initiator'] = _op();
		file['recipient'] = user;
		//print(user);
		file['date.open'] = _tod();
		file['oper.open'] = _op();
		file['category'] = 'Изменение';	//предоставление изменние отзыв
		file['type'] = 'Расширеный';		//базовый расширеный ролевой
		file['end.date'] = newTime;
		file['cis.bzs.id'][0] = bzs;
		var bq = bz.doSelect('logical.name="'+bzs+'"');
		file['cis.bzs.name'][0] = bz['ci.name'];
		file['cis.acss.id'][0] = acss;
		var aq = ac.doSelect('logical.name="'+acss+'"');
		file['cis.acss.name'][0] = ac['ci.name'];
		file['cis.right.id'][0] = right;
		var rq = ri.doSelect('logical.name="'+right+'"');
		file['cis.right.name'][0] = ri['ci.name'];
		file['company'] = vars['$lo.operator']['company'];
		file['description'] = vars['$reason'];
		file['status'] = 'Открыт';
	var rc = file.doInsert();
	print(RCtoString(rc));
}


function selectRm(id){
	var file = new SCFile('Subscription');
	var rc = file.doSelect('subscriptionID="'+id+'"');
	if(rc==RC_SUCCESS){
		if(file['type']=='Расширенный доступ'){
				vars['$subscrFile'] = file;
				vars['$wizardName'] = 'INF.accessRequest-rm-ext';
		}
	}
}

//	запрос ролевого доступа
function createARGetRoles(recipents,roles,roleNames,desc,start,end){
	var incidentID;
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	//inc['category'] =
	//inc['subcategory'] =
	inc['callback.contact'] = _op();
	inc['title'] = 'Запрос доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'request for change'
	inc['subcategory'] = 'access request'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');
	//inc.doAction('add');



	var rejectedAR = [];
	var rejectedARSUB = [];
	var approvedAR = [];
	var successCount = 0;
	var file = new SCFile('accessRequest');
	var rolesArray = new Array;
	if(typeof roles == 'string'){
		rolesArray.push(roles);
	}
	for(var recipientCount = 0; recipientCount < recipents.length(); recipientCount++){
		for(var attribCount = 0; attribCount < rolesArray.length; attribCount++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('recipient="'+recipents[recipientCount]+'" and role.logical.name="'+rolesArray[attribCount]+'" and category="Предоставление"  and status="Открыт"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+recipents[recipientCount]+'" and role.id="'+rolesArray[attribCount]+'" and active=true')
				if(rrc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['initiator'] = _op();
					file['date.open'] = _tod();
					file['oper.open'] = _op();
					file['recipient'] = recipents[recipientCount];
					file['category'] = 'Предоставление';	//предоставление изменние отзыв
					file['type'] = 'Ролевой';		//базовый расширеный ролевой
					file['description'] = desc;
					file['role.logical.name'] = rolesArray[attribCount];
					file['role.ci.name'] = roleNames[attribCount];
					file['company'] = vars['$lo.operator']['company'];
					file['start.date'] = _val(start,3);
					file['end.date'] = _val(end,3);
					file['sd.id'] = inc['incident.id'];
					file['status'] = 'Открыт';
					var rc = file.doInsert();
					approvedAR.push(file['id'])
					if(rc == RC_SUCCESS){
						successCount++;
					}
				}
				else{
					rejectedARSUB.push(s['subscriptionID']);
				}
			}
			else{
				rejectedAR.push(f['id']);
			}
		}
	}
	//print(rejectedAR,rejectedARSUB);
	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$role'] = _ins(vars['$role'],0,1,f['role.ci.name'])
			vars['$roleDate'] = _ins(vars['$roleDate'],0,1,f['date.open'])
			vars['$roleRecipient'] = _ins(vars['$roleRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	for(var i = 0; i < rejectedARSUB.length; i++){
		var f = new SCFile('Subscription');
		var rc = f.doSelect('subscriptionID="'+rejectedARSUB[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleSUB'] = _ins(vars['$roleSUB'],0,1,f['role.name'])
			vars['$roleDateSUB'] = _ins(vars['$roleDateSUB'],0,1,f['open.date'])
			vars['$roleRecipientSUB'] = _ins(vars['$roleRecipientSUB'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
		}
	}
	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		vars['$G.bg'] = true;
		incidentID = docnew_run('incidents',inc);
		vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.ci.name'])
			vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['date.open'])
			vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
			f['sd.id'] = incidentID;
			f.doUpdate();
		}
	}

}



function buildRemoveTable__ext(recipients){
	//print('rec ids = '+vars['$recIDs']);
	var subscribers = [];
	var subscriptionIDs = [];
	var recIDs=[];
	var datanew = [];
	var result = [];
	var conts = new SCFile('contacts');
	var bzsTemp = [];
	var accsTemp = [];
	var rightTemp = [];
	var file = new SCFile('Subscription');
	if(_lng(vars['$recIDs']) > 1){
		for(var i = 0; i < _lng(vars['$recIDs']); i++){
		var rc = file.doSelect('subscriber="'+vars['recIDs'][i]+'" and type="Расширенный доступ" and active=true');
			if(rc==RC_SUCCESS){
				do{
					bzsTemp.push(file['serviceName']);
					accsTemp.push(file['acss.id']);
					rightTemp.push(file['right.id']);
				}while(file.getNext() == RC_SUCCESS)

				datanew.push([i,bzsTemp,accsTemp,rightTemp]);
				bzsTemp = [];
				accsTemp = [];
				rightTemp = [];
			}
			else{
				datanew.push([i,[null],[null],[null]]);
			}
		}

		result = getCommonItems(datanew);
	}
	else{
		//print('line 683'+
		var rc = file.doSelect('subscriber="'+vars['$recIDs'][0]+'" and type="Расширенный доступ" and active=true');
		if(rc==RC_SUCCESS){
			do{
				result.push(file['serviceName']);
				result.push(file['acss.id']);
				result.push(file['right.id']);
			}while(file.getNext() == RC_SUCCESS)
		}
	}


		var i = 0;

		while(i < result.length){
			var bzsFile = new SCFile('device');
			var brc = bzsFile.doSelect('logical.name="'+result[i]+'"');
			vars['$bzs'] = _ins(vars['$bzs'],0,1,bzsFile['ci.name']);
			vars['$bzsID'] = _ins(vars['$bzsID'],0,1,result[i]);
			var acsFile = new SCFile('device');
			var arc = acsFile.doSelect('logical.name="'+result[i+1]+'"');
			vars['$accs'] = _ins(vars['$accs'],0,1,acsFile['ci.name']);
			vars['$accsID'] = _ins(vars['$accsID'],0,1,result[i+1]);
			var rigFile = new SCFile('device');
			var rrc = rigFile.doSelect('logical.name="'+result[i+2]+'"')
			for(var j = 0; j < _lng(vars['$recIDs']); j++){
				var s = new SCFile('Subscription');
				var rc = s.doSelect('subscriber="'+vars['$recIDs'][j]+'" and right.id="'+result[i+2]+'" and serviceName="'+result[i]+'" and acss.id="'+result[i+1]+'" and active=true');
				if(rc == RC_SUCCESS){
					subscribers.push(s['subscriber']);
					subscriptionIDs.push(s['subscriptionID']);
				}
			}
			vars['$right'] = _ins(vars['$right'],0,1,rigFile['ci.name']);
			vars['$rightID'] = _ins(vars['$rightID'],0,1,result[i+2]);
			i+=3;
		}
		result=[];
	// добавить в рад
		vars['$lo.subscriber'] = subscribers;
		vars['$lo.subscriberID'] = subscriptionIDs;
}

function buildRemoveTable__roles(recipients){
	var roles = [];
	var roleIDs = [];
	var subIDs = [];
	var recIDs = [];
	var subscribers = [];
	var subscriptionIDs = [];
	var conts = new SCFile('contacts');
	var file = new SCFile('Subscription');
	for(var i  = 0; i < _lng(vars['$recIDs']); i++){
		var rc = file.doSelect('subscriber="'+vars['$recIDs'][i]+'" and type="Ролевой доступ" and active=true'); //Дописать активность записи
		if(rc == RC_SUCCESS){
			do{
				roles.push(file['role.name']);
				roleIDs.push(file['role.id']);
			}while(file.getNext() == RC_SUCCESS)
		}
	}
	if(_lng(vars['$recIDs']) >1){
		for(var i = 0; i< roleIDs.length; i++){
			for(j = i+1; j<roleIDs.length; j++){
				if(roleIDs[i] == roleIDs[j]){
					vars['$role'] = roles;
					vars['$roleID'] = roleIDs;
				}
				else{
					vars['$role'] = [];
					vars['$roleID'] = [];
				}
			}
		}
	}
	else{
		vars['$role'] = roles;
		vars['$roleID'] = roleIDs;
	}
	var temp = vars['$roleID'].toArray();
	for(var i = 0; i < temp.length; i++){
		for(var j = 0; j < _lng(vars['$recIDs']); j++){
			var s = new SCFile('Subscription');
			var rc = s.doSelect('subscriber="'+vars['$recIDs'][j]+'" and role.id="'+temp[i]+'" and active=true');
			if(rc == RC_SUCCESS){
				subscriptionIDs.push(s['subscriptionID']);
				subscribers.push(s['subscriber']);
			}
		}
	}
	vars['$lo.roleSubscriber']=subscribers
	vars['$lo.roleSubscriberID']=subscriptionIDs
}

function refreshRemoveTables(recipients){
	vars['$subId']=null
	vars['$bzs']=null
	vars['$accs']=null
	vars['$right']=null
	vars['$bzsID']=null
	vars['$accsID']=null
	vars['$rightID']=null
	vars['$action']=null
	system.functions.denull(vars['$subId'])
	system.functions.denull(vars['$bzs'])
	system.functions.denull(vars['$accs'])
	system.functions.denull(vars['$right'])
	system.functions.denull(vars['$bzsID'])
	system.functions.denull(vars['$accsID'])
	system.functions.denull(vars['$rightID'])
	system.functions.denull(vars['$action'])
	vars['$role']=null
	vars['$roleID']=null
	vars['$roleAction']=null
	system.functions.denull(vars['$role'])
	system.functions.denull(vars['$roleID'])
	system.functions.denull(vars['$roleAction'])
	lib.ARUtils.buildRemoveTable__ext(recipients);
	lib.ARUtils.buildRemoveTable__roles(recipients);
	for(var i = 0; i < _lng(vars['$bzs']); i++){
		vars['$action']=system.functions.insert(vars['$action'],0,1,'new');
	}
	for(var i = 0; i < _lng(vars['$role']); i++){
		vars['$roleAction']=system.functions.insert(vars['$roleAction'],0,1,'new');
	}
}

function refreshModTables(recipients){
	vars['$subId']=null
	vars['$bzs']=null
	vars['$accs']=null
	vars['$right']=null
	vars['$bzsID']=null
	vars['$accsID']=null
	vars['$rightID']=null
	vars['$action']=null
	system.functions.denull(vars['$subId'])
	system.functions.denull(vars['$bzs'])
	system.functions.denull(vars['$accs'])
	system.functions.denull(vars['$right'])
	system.functions.denull(vars['$bzsID'])
	system.functions.denull(vars['$accsID'])
	system.functions.denull(vars['$rightID'])
	system.functions.denull(vars['$action'])
	vars['$role']=null
	vars['$roleID']=null
	vars['$roleAction']=null
	system.functions.denull(vars['$role'])
	system.functions.denull(vars['$roleID'])
	system.functions.denull(vars['$roleAction'])
	lib.ARUtils.extAccessTable(recipients);
	lib.ARUtils.roleAccessTable(recipients);
	for(var i = 0; i < _lng(vars['$bzs']); i++){
		vars['$action']=system.functions.insert(vars['$action'],0,1,'new');
	}
	for(var i = 0; i < _lng(vars['$role']); i++){
		vars['$roleAction']=system.functions.insert(vars['$roleAction'],0,1,'new');
	}
}


function createARRMExt(bzs,bzsID,accs,accsID,right,rightID,recipient,desc,subId){
	var file = new SCFile('accessRequest');
	if(rightID!=null){
		print('subId '+subId);
		for(var attribCount = 0; attribCount <= _lng(vars['$action'])-1; attribCount++){
			for(var i = 0; i < recipient.length(); i++){
			file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
				file['initiator'] = _op();
				file['date.open'] = _tod();
				file['oper.open'] = _op();
				file['recipient'] = recipient[i];
				file['category'] = 'Отзыв';	//предоставление изменние отзыв
				file['type'] = 'Расширеный';		//базовый расширеный ролевой
				file['description'] = desc;
				file['cis.bzs.id'][0] = bzsID[attribCount];
				file['cis.bzs.name'][0] = bzs[attribCount];
				file['cis.acss.id'][0] = accsID[attribCount];
				file['cis.acss.name'][0] = accs[attribCount];
				file['cis.right.id'][0] = rightID[attribCount];
				file['cis.right.name'][0] = right[attribCount];
				file['company'] = vars['$lo.operator']['company'];
				print('subId[attribCount] = +'+subId[attribCount]);
				file['subscription.id'] = subId[attribCount];
				file['status'] = 'Открыт';
				var rc = file.doInsert();
				print(RCtoString(rc));
				print('ext '+attribCount);
			}
		}
	}
}

function createARRMRole(role,roleID,recipient,desc,subRole){
	var file = new SCFile('accessRequest');
	if(roleID!=null){
		for(var attribCount = 0; attribCount <= _lng(vars['$roleAction'])-1; attribCount++){
			for(var i =0; i < recipient.length(); i++){
			file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
				file['initiator'] = _op();
				file['date.open'] = _tod();
				file['oper.open'] = _op();
				file['recipient'] = recipient[i];
				file['category'] = 'Отзыв';	//предоставление изменние отзыв
				file['type'] = 'Ролевой';		//базовый расширеный ролевой
				file['description'] = desc;
				file['role.logical.name'] = roleID[attribCount];
				file['role.ci.name'] = role[attribCount];
				file['company'] = vars['$lo.operator']['company'];
				print('subRole[attribCount]= '+subRole[attribCount]);
				file['subscription.id'] = subRole[attribCount];
				var rc = file.doInsert();
				print(RCtoString(rc));
				print('role '+attribCount);
			}
		}
	}
}


function prepareModVars(){
	var newSub = [];
	var newID =[];
	var newRoleSub = [];
	var newRoleID = []
		for(var i = 0; i < system.functions.lng(vars['$roleAction']); i++){
			if(vars['$roleAction'][i] == 'remove'){
				for(var j = 0; j < _lng(vars['$recIDs']); j++){
					var f = new SCFile('Subscription');
					var rc = f.doSelect('active=true and subscriber="'+vars['$recIDs'][j]+'" and role.id="'+vars['$roleID'][i]+'" and type="Ролевой доступ"')
					if(rc == RC_SUCCESS){
						//print('add role '+f['subscriptionID']);
						 newRoleSub.push(f['subscriber'])
						 newRoleID.push(f['subscriptionID'])
					}
				}
			}
		}
	vars['$lo.roleSubscriber'] = newRoleSub;
	vars['$lo.roleSubscriberID'] = newRoleID;

	for(var i = 0; i < system.functions.lng(vars['$action']); i++){
		if(vars['$action'][i] == 'remove'){
			for(var j = 0; j < _lng(vars['$recIDs']); j++){
				var f = new SCFile('Subscription');
				var rc = f.doSelect('active=true and subscriber="'+vars['$recIDs'][j]+'" and serviceName="'+vars['$bzsID'][i]+'" and acss.id="'+vars['$accsID'][i]+'" and right.id="'+vars['$rightID'][i]+'" and type="Расширенный доступ"')
				if(rc == RC_SUCCESS){
					//print('add '+f['subscriber']);
					 newSub.push(f['subscriber'])
					 newID.push(f['subscriptionID'])
					//print(newSub,newID);
				}
			}
		}
	}
	vars['$lo.subscriber'] = newSub;
	vars['$lo.subscriberID'] = newID;
}

function fillModForm(){
	//print('actions = '+vars['$action']);
	var tempAction = 0;
	for(var i = 0 ; i < _lng(vars['$action']); i++){
		if(vars['$action'][i] == 'remove'){
			tempAction++
		}
	}
	//print('tempaction = '+tempAction);
	var test1 = _lng(vars['$lo.subscriber']);
	var test2 = _lng(vars['$lo.subscriberID']);
	var test3 = _lng(vars['$lo.roleSubscriber']);
		for(var i = 0; i <_lng(vars['$lo.subscriber']); i++){
			//print('i '+i);
			var f = new SCFile('Subscription');
			var rc = f.doSelect('subscriptionID="'+vars['$lo.subscriberID'][i]+'"')
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['displayName']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['right.name']);
			vars['oldDate'] = _ins(vars['oldDate'],0,1,f['plan.close.date']);
			vars['$recipient'] = _ins(vars['$recipient'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'));
			if((test1 == test2) && (test3 == 0) && (tempAction == 1)){
				vars['$rightReadOnly'] = false;
				var rel = new SCFile('cirelationship');
				var rcc = rel.doSelect('logical.name="'+f['acss.id']+'"');
				if(rcc == RC_SUCCESS){
					do{
						var d = new SCFile('device');
						var rrc = d.doSelect('logical.name="'+rel['related.cis'][0]+'" and company="'+vars['$lo.company']+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.") and type="right"');
						if(rrc == RC_SUCCESS){
							vars['$rightNames'] = _ins(vars['$rightNames'],0,1,d['ci.name']);
							vars['$rightIDs'] = _ins(vars['$rightIDs'],0,1,d['logical.name']);
						}
					}while(rel.getNext() == RC_SUCCESS)
				}
			}
		}
		vars['$rightNames'] = uniqueArray(vars['$rightNames'].toArray());
		vars['$rightIDs'] = uniqueArray(vars['$rightIDs'].toArray());
		for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
			var f = new SCFile('Subscription');
			var rc = f.doSelect('subscriptionID="'+vars['$lo.roleSubscriberID'][i]+'"')
			vars['$role'] = _ins(vars['$role'],0,1,f['role.name']);
			vars['$roleDT'] = _ins(vars['$roleDT'],0,1,_val(f['plan.close.date'],2));
			vars['$recipient'] = _ins(vars['$recipient'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'));
		}
		vars['$recipient'] = uniqueArray(vars['$recipient'].toArray());
}


//	изменение доступа
function createARMod(){
	var incidentID;
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	//inc['category'] =
	//inc['subcategory'] =
	inc['callback.contact'] = _op();
	inc['title'] = 'Изменение доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'request for change'
	inc['subcategory'] = 'access request'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');
	//inc.doAction('add');




	var successCount = 0;
	var rejectedAR = [];
	var rejectedARRole = [];
	var approvedAR = [];
	var approvedARRole = [];
	var file = new SCFile('accessRequest');
		for (var i = 0; i < _lng(vars['$lo.subscriber']); i++){
			if(vars['$newRight']!=null){
				var f = new SCFile('accessRequest');
				var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Изменение" and cis.right.id="'+vars['$rightID'][_index(vars['$newRight'],vars['$rightNames'])-1]+'"  and status="Открыт"')
				if(rcc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['cis.bzs.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','serviceName');
					file['cis.acss.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_id');
					file['cis.right.id'][0] = vars['$rightID'][_index(vars['$newRight'],vars['$rightNames'])-1];
					file['cis.bzs.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','displayName');
					file['cis.acss.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_name');
					file['cis.right.name'][0] = vars['$newRight'];
					file['recipient'] = vars['$lo.subscriber'][i]
					file['category'] = 'Изменение';	//предоставление изменние отзыв
					file['type'] = 'Расширеный';		//базовый расширеный ролевой
					file['company'] = vars['$lo.company'];
					file['date.open'] = system.functions.tod();
					file['oper.open'] = system.functions.operator();
					if(vars['$newDate']!=null){
						file['end.date'] = system.functions.val(vars['$newDate'],3);
					}
					file['subscription.id'] = vars['$lo.subscriberID'][i]
					file['initiator'] = system.functions.operator();
					file['description'] = vars['$reason'];
					file['sd.id'] = inc['incident.id'];
					print('content = '+_conts(file));
					var rc = file.doInsert();
					if(rc == RC_SUCCESS){
						approvedAR.push(file['subscription.id'])
						successCount++
					}
				}
				else{
					print(' - '+_conts(f));
					rejectedAR.push(f['id']);
				}
			}
			else{
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Изменение"  and status="Открыт"')
				if(rcc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['cis.bzs.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','serviceName');
					file['cis.acss.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_id');
					file['cis.right.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_id');
					file['cis.bzs.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','displayName');
					file['cis.acss.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_name');
					file['cis.right.name'][0] =  _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_name');
					file['recipient'] = vars['$lo.subscriber'][i]
					file['category'] = 'Изменение';	//предоставление изменние отзыв
					file['type'] = 'Расширеный';		//базовый расширеный ролевой
					file['company'] = vars['$lo.company'];
					file['date.open'] = system.functions.tod();
					file['oper.open'] = system.functions.operator();
					if(vars['$newDate']!=null){
						file['end.date'] = system.functions.val(vars['$newDate'],3);
					}
					file['subscription.id'] = vars['$lo.subscriberID'][i]
					file['initiator'] = system.functions.operator();
					file['description'] = vars['$reason'];
					file['sd.id'] = inc['incident.id'];
					var rc = file.doInsert();
					if(rc == RC_SUCCESS){
						approvedAR.push(file['subscription.id'])
						successCount++
					}
				}
				else{
					print(' - '+_conts(f));
					rejectedAR.push(f['id']);
				}
			}
	}

	for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
		var f = new SCFile('accessRequest');
		var rcc = f.doSelect('subscription.id="'+vars['$lo.roleSubscriberID'][i]+'" and category="Изменение"  and status="Открыт"')
		if(rcc != RC_SUCCESS){
			file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
			file['recipient'] = vars['$lo.roleSubscriber'][i];
			file['category'] = 'Изменение';	//предоставление изменние отзыв
			file['type'] = 'Ролевой';		//базовый расширеный ролевой
			file['company'] = vars['$lo.company'];
			file['date.open'] = system.functions.tod();
			file['oper.open'] = system.functions.operator();
			file['end.date'] = system.functions.val(vars['$newDate'],3);
			file['subscription.id'] =  vars['$lo.roleSubscriberID'][i]
			file['initiator'] = system.functions.operator();
			file['description'] = vars['$reason'];
			file['role.ci.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_name');
			file['role.logical.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_id');
			var rc = file.doInsert();
			if(rc == RC_SUCCESS){
				approvedARRole.push(file['subscription.id']);
				successCount++
			}
		}
		else{
			rejectedARRole.push(f['id'])
		}
	}

	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['cis.bzs.name']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['cis.acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['cis.right.name'])
			vars['$extDate'] = _ins(vars['$extDate'],0,1,f['date.open']);
			vars['$extRecipient'] = _ins(vars['$extRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}

	for(var i = 0; i < rejectedARRole.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$role'] = _ins(vars['$role'],0,1,f['role.ci.name'])
			vars['$roleDate'] = _ins(vars['$roleDate'],0,1,f['date.open'])
			vars['$roleRecipient'] = _ins(vars['$roleRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}

	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		vars['$G.bg'] = true;
		incidentID = docnew_run('incidents',inc);
		vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
	var f = new SCFile('Subscription');
	var rc = f.doSelect('subscriptionID="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['displayName']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['open.date']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+f['subscriptionID']+'" and category="Изменение"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}
	for(var i = 0; i < approvedARRole.length; i++){
		var f = new SCFile('Subscription');
		var rc = f.doSelect('subscriptionID="'+approvedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.name'])
			vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['open.date'])
			vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+f['subscriptionID']+'" and category="Изменение"');
			ar['sd.id'] = incidentID;
			var upd  = ar.doUpdate();
		}
	}
}


//	отзыв доступа
function createARRM(){
	//print('not sd');
	var incidentID;
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}

	inc['callback.contact'] = _op();
	inc['title'] = 'Отзыв доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'request for change'
	inc['subcategory'] = 'access request'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');


	var successCount = 0;
	var rejectedAR = [];
	var rejectedARRole = [];
	var approvedAR = [];
	var approvedARRole = [];
	//print(vars['$lo.subscriber'],_lng(vars['$lo.subscriber']));
	var file = new SCFile('accessRequest');
		for (var i = 0; i < _lng(vars['$lo.subscriber']); i++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Отзыв"  and status="Открыт"')
			if(rcc != RC_SUCCESS){
				file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
				file['cis.bzs.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','serviceName');
				file['cis.acss.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_id');
				file['cis.right.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_id');
				file['cis.bzs.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','displayName');
				file['cis.acss.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_name');
				file['cis.right.name'][0] =  _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_name');
				file['recipient'] = vars['$lo.subscriber'][i]
				file['category'] = 'Отзыв';	//предоставление изменние отзыв
				file['type'] = 'Расширеный';		//базовый расширеный ролевой
				file['company'] = vars['$lo.company'];
				file['date.open'] = system.functions.tod();
				file['oper.open'] = system.functions.operator();
				file['subscription.id'] = vars['$lo.subscriberID'][i]
				file['initiator'] = system.functions.operator();
				file['description'] = vars['$reason'];
				file['sd.id'] = inc['incident.id'];
				file['status'] = 'Открыт';
				var rc = file.doInsert();
				approvedAR.push(vars['$lo.subscriberID'][i])
				if(rc == RC_SUCCESS){
					successCount++
				}
			}
			else{
				//print(' - '+_conts(f));
				rejectedAR.push(f['id']);
			}
		}

	for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
		var f = new SCFile('accessRequest');
		var rcc = f.doSelect('subscription.id="'+vars['$lo.roleSubscriberID'][i]+'" and category="Отзыв"  and status="Открыт"')
		if(rcc != RC_SUCCESS){
			file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
			file['recipient'] = vars['$lo.roleSubscriber'][i];
			file['category'] = 'Отзыв';	//предоставление изменние отзыв
			file['type'] = 'Ролевой';		//базовый расширеный ролевой
			file['company'] = vars['$lo.company'];
			file['date.open'] = system.functions.tod();
			file['oper.open'] = system.functions.operator();
			file['subscription.id'] =  vars['$lo.roleSubscriberID'][i]
			file['initiator'] = system.functions.operator();
			file['description'] = vars['$reason'];
			file['role.ci.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_name');
			file['role.logical.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_id');
			file['sd.id'] = inc['incident.id'];
			file['status'] = 'Открыт';
			var rc = file.doInsert();
			approvedARRole.push(vars['$lo.roleSubscriberID'][i])
			if(rc == RC_SUCCESS){
				successCount++
			}
		}
		else{
			rejectedARRole.push(f['id'])
		}
	}

	//print('rejected = '+rejectedAR);
	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['cis.bzs.name']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['cis.acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['cis.right.name'])
			vars['$extDate'] = _ins(vars['$extDate'],0,1,f['date.open']);
			vars['$extRecipient'] = _ins(vars['$extRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	for(var i = 0; i < rejectedARRole.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$role'] = _ins(vars['$role'],0,1,f['role.ci.name'])
			vars['$roleDate'] = _ins(vars['$roleDate'],0,1,f['date.open'])
			vars['$roleRecipient'] = _ins(vars['$roleRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}

	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		vars['$G.bg'] = true;
		incidentID = docnew_run('incidents',inc);
		vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
	var f = new SCFile('Subscription');
	var rc = f.doSelect('subscriptionID="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['displayName']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['open.date']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+f['subscriptionID']+'" and category="Отзыв"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
			//print('rcs = '+RCtoString(upd))
		}
	}
	for(var i = 0; i < approvedARRole.length; i++){
		var f = new SCFile('Subscription');
		var rc = f.doSelect('subscriptionID="'+approvedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.name'])
			vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['open.date'])
			vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+f['subscriptionID']+'" and category="Отзыв"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}

}

function ARMod__areSameRights(right){
	return vars['$right'][0] == right
}


function checkSubscription(){
	var bad = []
	var file = new SCFile('Subscription');
	for(var i = 0; i < _lng(vars['$lo.subscriber']); i++){
		for(var j = 0; j < _lng(vars['bzsID']); j++){
			var rc = file.doSelect('subscriber="'+vars['$lo.subscriber'][i]+'" and serviceName="'+vars['$bzsID'][j]+'" and acss.id="'+vars['$accsID'][j]+'" and right.id="'+vars['$rightID'][j]+'"');
			if(rc == RC_SUCCESS){
				bad.push(file['subscriptionID']);
			}
		}
	}
	return bad
}

function checkSubscriptionRole(){
	var bad = []
	var file = new SCFile('Subscription');
	for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
		for(var j = 0; j < _lng(vars['$roleID']); j++){
			var rc = file.doSelect('subscriber="'+vars['$lo.subscriber'][i]+'" and role.id="'+vars['$roleID'][j]+'"');
			if(rc == RC_SUCCESS){
				bad.push(file['subscriptionID']);
			}
		}
	}
	return bad
}

function checkAccessRequest(){
	var bad = []
	var file = new SCFile('accessRequest');
	for(var i = 0; i < _lng(vars['$lo.subscriber']); i++){
		for(var j = 0; j < _lng(vars['bzsID']); j++){
			var rc = file.doSelect('recipient="'+vars['$lo.subscriber'][i]+'" and 1 in cis.bzs.id="'+vars['$bzsID'][j]+'" and 1 in cis.acss.id="'+vars['$accsID'][j]+'" and 1 in cis.right.id="'+vars['$rightID'][j]+'"');
			if(rc == RC_SUCCESS){
				bad.push(file['id']);
			}
		}
	}
	return bad
}

function checkCM3T(){
	//тут будет лес
}


function getCompanyInInitpoints(){
	var cis ;
	var f = $('device', SCFILE_READONLY).setFields(['logical.name', 'type', 'istatus', 'ddc.scope', 'company', 'ci.name'])
	.select('type="bizservice" and ( istatus="Эксплуатация" or istatus="Опытная экспл.") and ci.name="Рабочее место пользователя"').iterate(function(item){
		if (vars['$lo.my.initpoints'].join().search(item['company'])!=-1) {
			cis = (item['logical.name']);
		}
	});
	return cis
}

function updateCID(sdId,cId){
	var file = new SCFile('accessRequest');
	var rc = file.doSelect('sd.id="'+sdId+'"');
	if(rc == RC_SUCCESS){
		do{
			file['c.id'] = cId;
			file.doUpdate();
		}while(file.getNext() == RC_SUCCESS)
	}
}


function createCM3T(CHANGE) {
	var ar = new SCFile('accessRequest');
	var rc = ar.doSelect('c.id="'+CHANGE['number']+'"');
	var createdTasks = []
	if(rc == RC_SUCCESS){
		//print('ar ok');
		do{
			//print(ar['type']);
			if(ar['type'] =='Ролевой'){
				//print('role');
				var d = new SCFile('device')
				var rrc = d.doSelect('logical.name="'+ar['role.logical.name']+'"')
				if(rrc == RC_SUCCESS){
					for(var i = 0; i < _lng(d['bzs.id']); i++){
						var file = new SCFile('cm3t')
						var number
						//print(d['bzs.id'][i]);
						file['parent.change'] = CHANGE['number'];
						file['category'] = 'Ролевой доступ';
						file['affected.item'] = CHANGE['affected.item'];
						file['initial.impact'] = '4'
						file['severity'] = '3'
						file['priority.code'] = '3'
						file['risk.assessment'] = '1'
						file['brief.desc'] = ar['category']
						file['title'] = ar['category'];
						file['description'] = ['Требуется '+ar['category']+' в связи с '+ar['description']];
						file['planned.start'] = ar['start.date']
						file['planned.end'] =  ar['end.date']
						file['need.accept'] = true
						file['bzs.id'] = d['bzs.id'][i];
						file['accs.id'] = d['accs.id'][i];
						file['right.id'] = d['right.id'][i];
						number = task_new(file,CHANGE);
						var f = new SCFile('cm3t')
						if(number != null){
							var rc = f.doSelect('number="'+number+'"');
							f['brief.desc'] = 'test desc';
							f['title'] = 'test title';
							f['description'] = ['Требуется '+ar['category']+' в связи с '+ar['description']];
							f.doUpdate();
							createdTasks.push(f['number']);
						}
						ar['ct.id'] = number;
						ar.doUpdate();
					}
				}
			}
			else{
				//print('ext');
				var file = new SCFile('cm3t')
				var number
				file['category'] = 'Расширеный доступ';
				file['affected.item'] = CHANGE['affected.item'];
				file['initial.impact'] = '4'
				file['severity'] = '3'
				file['priority.code'] = '3'
				file['risk.assessment'] = '1'
				file['planned.start'] = ar['start.date']
				file['planned.end'] = ar['end.date']
				file['need.accept'] = true
				file['brief.desc'] = ar['category']
				file['description']=['Требуется '+ar['category'] +'в связи с '+ar['description']];
				file['bzs.id'] = ar['cis.bzs.id'][i];
				file['accs.id'] = ar['cis.acss.id'][i];
				file['right.id'] = ar['cis.right.id'][i];
				//print('create task');
				number = task_new(file,CHANGE)
				//print('number = '+number);
				var f = new SCFile('cm3t')
				if(number != null){
					var rc = f.doSelect('number="'+number+'"');
					f['brief.desc'] = ar['category'];
					f['title'] = ar['category'];
					f['description'] = ['Требуется '+ar['category']+' в связи с '+ar['description']];
					f.doUpdate();
					createdTasks.push(f['number']);
				}
				ar['ct.id'] = number;
				ar.doUpdate();
			}
			// ?????? file['assign.dept']
		}while(ar.getNext() == RC_SUCCESS)
	}
	//print('to ret = '+createdTasks);
	return createdTasks
}

function createSubscription(change){
	//print('start create sub');
	//print('change = '+change);
	var file = new SCFile('Subscription');
	var ar = new SCFile('accessRequest');
	var rc = ar.doSelect('c.id="'+change['number']+'" and status="Закрыт"')
	//print('ar = '+ar);
	if(rc == RC_SUCCESS){
		do{
			if(ar['subscription.id']==null){								//	не существует записи subscription
				//print('new sub');
				//print('ar type = '+ar['type']);
				if(ar['type'] == 'Ролевой'){
					//print('role');
					file['svcCatItem']  = 'Изменение'
					file['role.id'] = ar['role.logical.name'];
					file['role.name'] = ar['role.ci.name'];
					if(ar['category'] == 'Отзыв'){
						//print('отзыв');
						file['active'] = false
					}
					else{
						//print('не отзыв');
						file['active'] = true
					}
					file['subscriber'] = ar['recipient'];
					file['subscriberType'] = _getval(ar['recipient'],'contacts','contact.name','type');
					file['open.id'] = change['number']
					file['close.id'] = change['number']
					file['open.date'] = change['inf.close.time'];
					file['close.date'] = change['inf.close.time'];
					file['plan.close.date'] = ar['end.date'];
					file['type'] = 'Ролевой доступ'
					file.doInsert()
				}
				else{
					//print('раcширеныйж')
					file['svcCatItem']  = 'Задача на изменение'
					file['serviceName'] = ar['cis.bzs.id'];
					file['displayName'] = ar['cis.bzs.name'];
					file['acss.id'] = ar['cis.acss.id']
					file['acss.name'] = ar['cis.acss.name']
					file['right.id'] = ar['cis.right.id']
					file['right.name'] = ar['cis.right.name']
					if(ar['category'] == 'Отзыв'){
						//print('отзыв');
						file['active'] = false
					}
					else{
						//print('не отзыв');
						file['active'] = true
					}
					file['subscriber'] = ar['recipient'];
					file['subscriberType'] = _getval(ar['recipient'],'contacts','contact.name','type');
					file['open.id'] = change['number']
					file['close.id'] = change['number']
					file['open.date'] = change['inf.close.time'];
					file['close.date'] = change['inf.close.time'];
					file['plan.close.date'] = ar['end.date'];
					file['type'] = 'Расширенный доступ'
					file.doInsert()
				}
			}
			else{																					// существует subscription
				//print('update sub');
				var rc = file.doSelect('subscriptionID="'+ar['subscription.id']+'"')				// вместо создания обновить эту запись
				if(rc == RC_SUCCESS){
					if(ar['type'] == 'Ролевой'){
						//print('ролевой');
						file['svcCatItem']  = 'Изменение'
						file['role.id'] = ar['role.logical.name'];
						file['role.name'] = ar['role.ci.name'];
						if(ar['category'] == 'Отзыв'){
							//print('отзыв');
							file['active'] = false
						}
						else{
							//print('не отзыв');
							file['active'] = true
						}
						file['subscriber'] = ar['recipient'];
						file['subscriberType'] = _getval(ar['recipient'],'contacts','contact.name','type');
						file['open.id'] = change['number']
						file['close.id'] = change['number']
						file['open.date'] = change['inf.close.time'];
						file['close.date'] = change['inf.close.time'];
						file['plan.close.date'] = ar['end.date'];
						file.doUpdate()
					}
					else{
					//print('расширеный');
						file['svcCatItem']  = 'Задача на изменение'
						file['serviceName'] = ar['cis.bzs.id'];
						file['displayName'] = ar['cis.bzs.name'];
						file['acss.id'] = ar['cis.acss.id']
						file['acss.name'] = ar['cis.acss.name']
						file['right.id'] = ar['cis.right.id']
						file['right.name'] = ar['cis.right.name']
						if(ar['category'] == 'Отзыв'){
							//print('отзыв');
							file['active'] = false
						}
						else{
							//print('не отзыв');
							file['active'] = true
						}
						file['subscriber'] = ar['recipient'];
						file['subscriberType'] = _getval(ar['recipient'],'contacts','contact.name','type');
						file['open.id'] = change['number']
						file['close.id'] = change['number']
						file['open.date'] = change['inf.close.time'];
						file['close.date'] = change['inf.close.time'];
						file['plan.close.date'] = ar['end.date'];
						file.doUpdate()
					}
				}
			}
		}while(ar.getNext() == RC_SUCCESS)
	}
}


//	запрос ролевого доступа из sd
function createARGetRoles__SD(recipents,roles,roleNames,desc,start,end){
	var incidentID = vars['$lo.sdID'];
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	//inc['category'] =
	//inc['subcategory'] =
	inc['callback.contact'] = _op();
	inc['title'] = 'Запрос доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'Change'
	inc['subcategory'] = 'Access'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');
	//inc.doAction('add');



	var rejectedAR = [];
	var rejectedARSUB = [];
	var approvedAR = [];
	var successCount = 0;
	var file = new SCFile('accessRequest');
	var rolesArray = new Array;
	if(typeof roles == 'string'){
		rolesArray.push(roles);
	}
	for(var recipientCount = 0; recipientCount < recipents.length(); recipientCount++){
		for(var attribCount = 0; attribCount < rolesArray.length; attribCount++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('recipient="'+recipents[recipientCount]+'" and role.logical.name="'+rolesArray[attribCount]+'" and category="Предоставление" and status="Открыт"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+recipents[recipientCount]+'" and role.id="'+rolesArray[attribCount]+'" and active=true')
				if(rrc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['initiator'] = _op();
					file['date.open'] = _tod();
					file['oper.open'] = _op();
					file['recipient'] = recipents[recipientCount];
					file['category'] = 'Предоставление';	//предоставление изменние отзыв
					file['type'] = 'Ролевой';		//базовый расширеный ролевойf
					file['description'] = desc;
					file['role.logical.name'] = rolesArray[attribCount];
					file['role.ci.name'] = roleNames[attribCount];
					file['company'] = vars['$lo.operator']['company'];
					file['start.date'] = _val(start,3);
					file['end.date'] = _val(end,3);
					file['sd.id'] = inc['incident.id'];
					file['status'] = 'Открыт';
					var rc = file.doInsert();
					approvedAR.push(file['id'])
					if(rc == RC_SUCCESS){
						successCount++;
					}
				}
				else{
					rejectedARSUB.push(s['subscriptionID']);
				}
			}
			else{
				rejectedAR.push(f['id']);
			}
		}
	}
	print(rejectedAR,rejectedARSUB);
	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$role'] = _ins(vars['$role'],0,1,f['role.ci.name'])
			vars['$roleDate'] = _ins(vars['$roleDate'],0,1,f['date.open'])
			vars['$roleRecipient'] = _ins(vars['$roleRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	for(var i = 0; i < rejectedARSUB.length; i++){
		var f = new SCFile('Subscription');
		var rc = f.doSelect('subscriptionID="'+rejectedARSUB[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleSUB'] = _ins(vars['$roleSUB'],0,1,f['role.name'])
			vars['$roleDateSUB'] = _ins(vars['$roleDateSUB'],0,1,f['open.date'])
			vars['$roleRecipientSUB'] = _ins(vars['$roleRecipientSUB'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
		}
	}
	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		// vars['$G.bg'] = true;
		// incidentID = docnew_run('incidents',inc);
		// vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.ci.name'])
			vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['date.open'])
			vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('id="'+approvedAR[i]+'" and category="Изменение"');
			f['sd.id'] = incidentID;
			f.doUpdate();
		}
	}

}

// запрос расширенного доступа из sd
function createARGetExt__SD(serviceIds,serviceNames,accsIds,acssNames,rightIds,rightNames,desc,start,end){
	var incidentID = vars['$lo.SDid'];
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	//inc['category'] =
	//inc['subcategory'] =
	inc['callback.contact'] = _op();
	inc['title'] = 'Запрос доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'Change'
	inc['subcategory'] = 'Access'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');



	var rejectedAR = [];
	var rejectedARSUB = [];
	var approvedAR = [];
	var successCount = 0;
	var file = new SCFile('accessRequest');
	//print(serviceIds.length());
	for(var recipientCount = 0; recipientCount < _lng(vars['$recIDs']); recipientCount++){
		for(var attribCount = 0; attribCount < serviceIds.length(); attribCount++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('recipient="'+vars['$recIDs'][recipientCount]+'" and cis.bzs.id="'+serviceIds[attribCount]+'" and cis.acss.id="'+accsIds[attribCount]+'" and cis.right.id="'+rightIds[attribCount]+'" and category="Предоставление"  and status="Открыт"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+vars['$recIDs'][recipientCount]+'" and serviceName="'+serviceIds[attribCount]+'" and acss.id="'+accsIds[attribCount]+'" and right.id="'+rightIds[attribCount]+'" and type="Расширенный доступ" and active=true')
				if(rrc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['initiator'] = _op();
					file['date.open'] = _tod();
					file['oper.open'] = _op();
					file['recipient'] = vars['$recIDs'][recipientCount];
					file['category'] = 'Предоставление';	//предоставление изменние отзыв
					file['type'] = 'Расширеный';		//базовый расширеный ролевой
					file['description'] = desc;
					file['cis.bzs.id'][0] = serviceIds[attribCount];
					file['cis.bzs.name'][0] = serviceNames[attribCount];
					file['cis.acss.id'][0] = accsIds[attribCount];
					file['cis.acss.name'][0] = acssNames[attribCount];
					file['cis.right.id'][0] = rightIds[attribCount];
					file['cis.right.name'][0] = rightNames[attribCount];
					file['company'] = vars['$lo.operator']['company'];
					file['start.date'] = _val(start,3);
					file['end.date'] = _val(end,3);
					file['sd.id'] = inc['incident.id'];
					file['status'] = 'Открыт';
					var rc = file.doInsert();
					approvedAR.push(file['id']);
					if(rc == RC_SUCCESS){
						successCount++;
					}
				}
				else{
					rejectedARSUB.push(s['subscriptionID']);
				}
			}
			else{
				rejectedAR.push(f['id']);
			}
		}
	}
	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['cis.bzs.name']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['cis.acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['cis.right.name'])
			vars['$extDate'] = _ins(vars['$extDate'],0,1,f['date.open']);
			vars['$extRecipient'] = _ins(vars['$extRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	for(var i = 0; i < rejectedARSUB.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedARSUB[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsSUB'] = _ins(vars['$bzsSUB'],0,1,f['displayName']);
			vars['$accsSUB'] = _ins(vars['$accsSUB'],0,1,f['acss.name']);
			vars['$rightSUB'] = _ins(vars['$rightSUB'],0,1,f['right.name'])
			vars['$extDateSUB'] = _ins(vars['$extDateSUB'],0,1,f['open.date']);
			vars['$extRecipientSUB'] = _ins(vars['$extRecipientSUB'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
		}
	}
	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		// vars['$G.bg'] = true;
		// incidentID = docnew_run('incidents',inc);
		// vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['cis.bzs.name']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['cis.acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['cis.right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['date.open']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('id="'+approvedAR[i]+'" and category="Запрос"');
			f['sd.id'] = incidentID;
			f.doUpdate();
		}
	}

}

//	изменение доступа из SD
function createARMod_SD(){
	var incidentID = vars['$lo.SDid'];
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	//inc['category'] =
	//inc['subcategory'] =
	inc['callback.contact'] = _op();
	inc['title'] = 'Изменение доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'Change'
	inc['subcategory'] = 'Access'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');
	//inc.doAction('add');




	var successCount = 0;
	var rejectedAR = [];
	var rejectedARRole = [];
	var approvedAR = [];
	var approvedARRole = [];
	var file = new SCFile('accessRequest');
		for (var i = 0; i < _lng(vars['$lo.subscriber']); i++){
			if(vars['$newRight']!=null){
				var f = new SCFile('accessRequest');
				var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Изменение" and cis.right.id="'+vars['$rightID'][_index(vars['$newRight'],vars['$rightNames'])-1]+'" and status="Открыт"')
				if(rcc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['cis.bzs.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','serviceName');
					file['cis.acss.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_id');
					file['cis.right.id'][0] = vars['$rightID'][_index(vars['$newRight'],vars['$rightNames'])-1];
					file['cis.bzs.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','displayName');
					file['cis.acss.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_name');
					file['cis.right.name'][0] = vars['$newRight'];
					file['recipient'] = vars['$lo.subscriber'][i]
					file['category'] = 'Изменение';	//предоставление изменние отзыв
					file['type'] = 'Расширеный';		//базовый расширеный ролевой
					file['company'] = vars['$lo.company'];
					file['date.open'] = system.functions.tod();
					file['oper.open'] = system.functions.operator();
					if(vars['$newDate']!=null){
						file['end.date'] = system.functions.val(vars['$newDate'],3);
					}
					file['subscription.id'] = vars['$lo.subscriberID'][i]
					file['initiator'] = system.functions.operator();
					file['description'] = vars['$reason'];
					file['sd.id'] = inc['incident.id'];
					print('content = '+_conts(file));
					var rc = file.doInsert();
					if(rc == RC_SUCCESS){
						approvedAR.push(file['subscription.id'])
						successCount++
					}
				}
				else{
					//print(' - '+_conts(f));
					rejectedAR.push(f['id']);
				}
			}
			else{
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Изменение" and status="Открыт"')
				if(rcc != RC_SUCCESS){
					file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['cis.bzs.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','serviceName');
					file['cis.acss.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_id');
					file['cis.right.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_id');
					file['cis.bzs.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','displayName');
					file['cis.acss.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_name');
					file['cis.right.name'][0] =  _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_name');
					file['recipient'] = vars['$lo.subscriber'][i]
					file['category'] = 'Изменение';	//предоставление изменние отзыв
					file['type'] = 'Расширеный';		//базовый расширеный ролевой
					file['company'] = vars['$lo.company'];
					file['date.open'] = system.functions.tod();
					file['oper.open'] = system.functions.operator();
					if(vars['$newDate']!=null){
						file['end.date'] = system.functions.val(vars['$newDate'],3);
					}
					file['subscription.id'] = vars['$lo.subscriberID'][i]
					file['initiator'] = system.functions.operator();
					file['description'] = vars['$reason'];
					file['sd.id'] = inc['incident.id'];
					var rc = file.doInsert();
					if(rc == RC_SUCCESS){
						approvedAR.push(file['subscription.id'])
						successCount++
					}
				}
				else{
					//print(' - '+_conts(f));
					rejectedAR.push(f['id']);
				}
			}
	}

	for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
		var f = new SCFile('accessRequest');
		var rcc = f.doSelect('subscription.id="'+vars['$lo.roleSubscriberID'][i]+'" and category="Изменение"')
		if(rcc != RC_SUCCESS){
			file['recipient'] = vars['$lo.roleSubscriber'][i];
			file['category'] = 'Изменение';	//предоставление изменние отзыв
			file['type'] = 'Ролевой';		//базовый расширеный ролевой
			file['company'] = vars['$lo.company'];
			file['date.open'] = system.functions.tod();
			file['oper.open'] = system.functions.operator();
			file['end.date'] = system.functions.val(vars['$newDate'],3);
			file['subscription.id'] =  vars['$lo.roleSubscriberID'][i]
			file['initiator'] = system.functions.operator();
			file['description'] = vars['$reason'];
			file['role.ci.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_name');
			file['role.logical.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_id');
			var rc = file.doInsert();
			if(rc == RC_SUCCESS){
				successCount++
			}
		}
		else{
			rejectedARRole.push(f['id'])
		}
	}

	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['cis.bzs.name']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['cis.acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['cis.right.name'])
			vars['$extDate'] = _ins(vars['$extDate'],0,1,f['date.open']);
			vars['$extRecipient'] = _ins(vars['$extRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}

	for(var i = 0; i < rejectedARRole.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$role'] = _ins(vars['$role'],0,1,f['role.ci.name'])
			vars['$roleDate'] = _ins(vars['$roleDate'],0,1,f['date.open'])
			vars['$roleRecipient'] = _ins(vars['$roleRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}

	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		// vars['$G.bg'] = true;
		// incidentID = docnew_run('incidents',inc);
		// vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
	var f = new SCFile('Subscription');
	var rc = f.doSelect('subscriptionID="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['displayName']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['open.date']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+approvedAR[i]+'" and category="Изменение"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}
	for(var i = 0; i < approvedARRole.length; i++){
		var f = new SCFile('Subscription');
		var rc = f.doSelect('subscriptionID="'+approvedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.name'])
			vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['open.date'])
			vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+approvedAR[i]+'" and category="Изменение"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}
}

//	отзыв доступа из sd
function createARRM__SD(){
	var incidentID = vars['$lo.SDid'];
	var inc = new SCFile('incidents');
	var affItem = getCompanyInInitpoints();
	var compound = new SCFile('cirelationship');
	var rc = compound.doSelect('logical.name="'+affItem+'"')
	if(rc == RC_SUCCESS){
		do{
			if(compound['related.cis'][0].search('oprtn')!=-1){
				var temp = _getval(compound['rela'],'device','logical.name','ci_name')
				if(temp == 'Управление доступом'){
					inc['inf.item.compound'] = compound['related.cis'][0]
				}
			}
		}while(compound.getNext() == RC_SUCCESS)
	}
	//inc['category'] =
	//inc['subcategory'] =
	inc['callback.contact'] = _op();
	inc['title'] = 'Отзыв доступа';
	inc['description'][0] = vars['$reason'];
	inc['contact.name'] = _op()
	inc['affected.item'] = affItem
	inc['category'] = 'Change'
	inc['subcategory'] = 'Access'
	inc['severity'] = 'Средняя'
	inc['ci.name'] = _getval(affItem,'device','logical.name','ci_name');
	//inc.doAction('add');


	var successCount = 0;
	var rejectedAR = [];
	var rejectedARRole = [];
	var approvedAR = [];
	var approvedARRole = [];
	//print(vars['$lo.subscriber'],_lng(vars['$lo.subscriber']));
	var file = new SCFile('accessRequest');
		for (var i = 0; i < _lng(vars['$lo.subscriber']); i++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Отзыв"  and status="Открыт"')
			if(rcc != RC_SUCCESS){
				file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
				file['cis.bzs.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','serviceName');
				file['cis.acss.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_id');
				file['cis.right.id'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_id');
				file['cis.bzs.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','displayName');
				file['cis.acss.name'][0] = _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','acss_name');
				file['cis.right.name'][0] =  _getval(vars['$lo.subscriberID'][i],'Subscription','subscriptionID','right_name');
				file['recipient'] = vars['$lo.subscriber'][i]
				file['category'] = 'Отзыв';	//предоставление изменние отзыв
				file['type'] = 'Расширеный';		//базовый расширеный ролевой
				file['company'] = vars['$lo.company'];
				file['date.open'] = system.functions.tod();
				file['oper.open'] = system.functions.operator();
				file['subscription.id'] = vars['$lo.subscriberID'][i]
				file['initiator'] = system.functions.operator();
				file['description'] = vars['$reason'];
				file['sd.id'] = inc['incident.id'];
				file['status'] = 'Открыт';
				var rc = file.doInsert();
				approvedAR.push(vars['$lo.subscriberID'][i])
				if(rc == RC_SUCCESS){
					successCount++
				}
			}
			else{
				//print(' - '+_conts(f));
				rejectedAR.push(f['id']);
			}
		}

	for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
		var f = new SCFile('accessRequest');
		var rcc = f.doSelect('subscription.id="'+vars['$lo.roleSubscriberID'][i]+'" and category="Отзыв"  and status="Открыт"')
		if(rcc != RC_SUCCESS){
			file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
			file['recipient'] = vars['$lo.roleSubscriber'][i];
			file['category'] = 'Отзыв';	//предоставление изменние отзыв
			file['type'] = 'Ролевой';		//базовый расширеный ролевой
			file['company'] = vars['$lo.company'];
			file['date.open'] = system.functions.tod();
			file['oper.open'] = system.functions.operator();
			file['subscription.id'] =  vars['$lo.roleSubscriberID'][i]
			file['initiator'] = system.functions.operator();
			file['description'] = vars['$reason'];
			file['role.ci.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_name');
			file['role.logical.name'] = _getval(vars['$lo.roleSubscriberID'][i],'Subscription','subscriptionID','role_id');
			file['sd.id'] = inc['incident.id'];
			file['status'] = 'Открыт';
			var rc = file.doInsert();
			approvedARRole.push(vars['$lo.roleSubscriberID'][i])
			if(rc == RC_SUCCESS){
				successCount++
			}
		}
		else{
			rejectedARRole.push(f['id'])
		}
	}

	//print('rejected = '+rejectedAR);
	for(var i = 0; i < rejectedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['cis.bzs.name']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['cis.acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['cis.right.name'])
			vars['$extDate'] = _ins(vars['$extDate'],0,1,f['date.open']);
			vars['$extRecipient'] = _ins(vars['$extRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	for(var i = 0; i < rejectedARRole.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+rejectedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$role'] = _ins(vars['$role'],0,1,f['role.ci.name'])
			vars['$roleDate'] = _ins(vars['$roleDate'],0,1,f['date.open'])
			vars['$roleRecipient'] = _ins(vars['$roleRecipient'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}

	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
		// vars['$G.bg'] = true;
		// incidentID = docnew_run('incidents',inc);
		// vars['$G.bg'] = false;
	}
	for(var i = 0; i < approvedAR.length; i++){
	var f = new SCFile('Subscription');
	var rc = f.doSelect('subscriptionID="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['displayName']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['open.date']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+approvedAR[i]+'" and category="Отзыв"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
			//print('rcs = '+RCtoString(upd))
		}
	}
	for(var i = 0; i < approvedARRole.length; i++){
		var f = new SCFile('Subscription');
		var rc = f.doSelect('subscriptionID="'+approvedARRole[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$roleApr'] = _ins(vars['$roleApr'],0,1,f['role.name'])
			vars['$roleDateApr'] = _ins(vars['$roleDateApr'],0,1,f['open.date'])
			vars['$roleRecipientApr'] = _ins(vars['$roleRecipientApr'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'))
			var ar = new SCFile('accessRequest');
			var upd = ar.doSelect('subscription.id="'+approvedAR[i]+'" and category="Отзыв"');
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}

}

function ARExists(id){
	var file = new SCFile('accessRequest')
	var rc = file.doSelect('sd.id="'+id+'"')
	if(rc == RC_SUCCESS){
		return false
	}
	else{
		return true;
	}
}


function closeAR(ctID){
	var file = new SCFile('accessRequest')
	var rc = file.doSelect('ct.id="'+ctID+'"')
	if(rc == RC_SUCCESS){
		file['status'] = 'Закрыт'
		file['closure.code']='1'
		file['date.close'] = _tod();
		file['oper.close'] = _op();
		file.doUpdate();
	}
}
