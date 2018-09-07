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

function getExtAccess_buldLinkQuery__right(id){
	var arr = new Array;
	var rel = new SCFile('cirelationship');
	var device = new SCFile('device');
	var rc = rel.doSelect('logical.name="'+id+'"')
	if(rc == RC_SUCCESS){
		do{
			var rcc = device.doSelect('type="right" and logical.name="'+rel['related.cis'][0]+'"  and (istatus="Эксплуатация" or istatus="Опытная экспл.") and company ="'+vars['$lo.operator']['company']+'"');
			if(rcc == RC_SUCCESS){
				do{
					arr.push(device['ci.name']);
				}while(device.getNext() == RC_SUCCESS)
			}
		}while(rel.getNext()==RC_SUCCESS)
	}
	print(arr.join(','));
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
	vars['$serviceIDs'] = _ins(vars['$serviceIDs'],0,1,sID);
	vars['$serviceNames'] = _ins(vars['$serviceNames'],0,1,sName);
	vars['$acssIDs'] = _ins(vars['$acssIDs'],0,1,aID);
	vars['$acssNames'] = _ins(vars['$acssNames'],0,1,aName);
	vars['$rightIDs'] = _ins(vars['$rightIDs'],0,1,rID);
	vars['$rightNames'] = _ins(vars['$rightNames'],0,1,rName);
}
