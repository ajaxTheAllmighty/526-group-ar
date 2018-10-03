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
}
