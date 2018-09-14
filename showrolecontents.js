function showRoleContents(){
	vars['$roleTable']=null;
	vars['$serviceTable']=null;
	vars['$accsTable']=null;
	vars['$rightTable']=null;
	var device = new SCFile('device');
	var bzs = new SCFile('device');
	var accs = new SCFile('device');
	var right = new SCFile('device');
	var roleIds = vars['$roleIds'];
	if (typeof roleIds == 'string'){
		var roleIds = new Array();
		roleIds.push(vars['$roleIds']);
	}
	print(roleIds);
	var data = [];
	var dQuery;
	for (var i = 0; i < roleIds.length; i++){
		dQuery = device.doSelect('logical.name="'+roleIds[i]+'"');
		if(dQuery == RC_SUCCESS){
			do{
				for(var bzsCount = 0; bzsCount<device['bzs.id'].length(); bzsCount++){
					var rc = bzs.doSelect('logical.name="'+device['bzs.id'][i]+'"');
					var rcc = accs.doSelect('logical.name="'+device['accs.id'][i]+'"');
					var rrc = right.doSelect('logical.name="'+device['right.id'][i]+'"');
					if (rc == RC_SUCCESS && rrc == RC_SUCCESS && rcc == RC_SUCCESS){
						do{
							vars['$roleTable'] = _ins(vars['$roleTable'],0,1,device['ci.name']);
							vars['$serviceTable'] = _ins(vars['$serviceTable'],0,1,bzs['ci.name']);
							vars['$accsTable'] = _ins(vars['$accsTable'],0,1,accs['ci.name']);
							vars['$rightTable'] = _ins(vars['$rightTable'],0,1,right['ci.name']);
							print(device['logical.name']);
						}while(bzs.getNext() == RC_SUCCESS && accs.getNext() == RC_SUCCESS && right.getNext() == RC_SUCCESS)
					}
				}
			}while(device.getNext() == RC_SUCCESS)
		}
	}
	print(vars['$roleTable']);
	print(vars['$serviceTable']);
	print(vars['$accsTable']);
	print(vars['$rightTable']);
}
