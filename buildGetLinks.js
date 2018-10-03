function getExtAccess_buldLinkQuery__service(){
	var arr = new Array;
	var rel = new SCFile('cirelationship');
	var rel_right = new SCFile('cirelationship');
	var service = new SCFile('device');
	var acss = new SCFile('device');
	var right = new SCFile('device');
	var rc = service.doSelect('type="bizservice" and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');	//выборка всех услуг из device
	if(rc == RC_SUCCESS){
		do{
			var rcc = rel.doSelect('logical.name="'+service['logical.name']+'"');	// найти связи для услуги
			if(rcc == RC_SUCCESS){
				do{
					if(rel['related.cis'][0].search('acss')!=-1){	// если это доступ то найти его в device по фильтрам
						 var acssQuery = acss.doSelect('logical.name="'+rel['related.cis'][0]+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
						 if(acssQuery == RC_SUCCESS){
							 do{
								 var relRightQuery = rel_right.doSelect('logical.name="'+acss['logical.name']+'"');	// найти связи для доступа
								 if(relRightQuery == RC_SUCCESS){
									 do{
										 if(rel_right['related.cis'][0].search('right')!=-1){	// если это право то найти его в device по фильрам
											 var rightQuery = right.doSelect('logical.name="'+rel_right['related.cis'][0]l+'"and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
											 if(rightQuery == RC_SUCCESS){
												 do{
													 if(_index(service['logical.name'],arr,0)==0){	// logical услуги, только уникальные
					 									arr.push(service['logical.name'])			//
					 								}
												 }while(rigt.getNext() == RC_SUCCESS)
											 }
										 }
									 }while(rel_right.getNext() == RC_SUCCESS)
								 }
							 }while(acss.getNext() == RC_SUCCESS)
						 }
					}
				}while(rel.getNext() == RC_SUCCESS)
			}
		}while(service.getNext()==RC_SUCCESS)
	}
	print(arr.join(','));
	return arr;
}


function getExtAccess_buldLinkQuery__accs(id){
	var arr = new Array;
	var rel = new SCFile('cirelationship');
	var device = new SCFile('device');
	var right_rel = new SCFile('cirelationship');
	var right = new SCFile('device');
	var rc = rel.doSelect('logical.name="'+id+'"')
	if(rc == RC_SUCCESS){
		do{
			var rcc = device.doSelect('type="acss" and logical.name="'+rel['related.cis'][0]+'"  and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
			if(rcc == RC_SUCCESS){
				do{
					var rightRelQuery = right_rel.doSelect('logical.name="'+rel['related.cis'][0]+'"');
					if(rightRelQuery == RC_SUCCESS){
						if(right_rel['related.cis'][0].search('right')!=-1){
							do{
								var rightDevice = right.doSelect('logical.name="'+right_rel['related.cis'][0]+'"and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
								if(rightQuery == RC_SUCCESS){
									do{
										arr.push(device['ci.name']);
									}while(right.getNext() == RC_SUCCESS)
								}
							}while(right_rel.getNext() == RC_SUCCESS)
						}
					}
				}while(device.getNext() == RC_SUCCESS)
			}
		}while(rel.getNext()==RC_SUCCESS)
	}
	print(arr.join(','));
	return arr;
}

function getExtAccess_buldLinkQuery__right(id,serviceId){
	var arr = new Array;
	var rel = new SCFile('cirelationship');
	var device = new SCFile('device');
	var rc = rel.doSelect('logical.name="'+id+'"')
	if(rc == RC_SUCCESS){
		do{
			var rcc = device.doSelect('type="right" and logical.name="'+rel['related.cis'][0]+'"  and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
			if(rcc == RC_SUCCESS){
				do{
					arr.push(device['logical.name']);
				}while(device.getNext() == RC_SUCCESS)
			}
		}while(rel.getNext()==RC_SUCCESS)
	}
	if(arr.length < 1){
		var serviceRel = new SCFile('cirelationship');
		var servicreQuery = serviceRel.doSelect('logical.name="'+serviceId+'"');
		if(servicreQuery == RC_SUCCESS){
			var right = new SCFile('device');
			var rightQuery = right.doSelect('type="right" and logical.name="'+serviceRel['related.cis'][0]+'"  and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"')
			if(rightQuery == RC_SUCCESS){
				do{
					arr.push(right['logical.name']);
				}while(right.getNext() == RC_SUCCESS)
			}
		}
	}
	return arr;
}


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
