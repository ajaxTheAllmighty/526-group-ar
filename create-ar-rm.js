//roleAccessTable


function buildRemoveTable__roles(recipients){
	var roles = [];
	var roleIDs = [];
	var subIDs = [];
	var recIDs = [];
	var subscribers = [];
	var subscriptionIDs = [];
	var goodRoles = []
	var goodIds = []
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
		else{
			roles.push(null)
			roleIDs.push(null)
		}
	}
	if(_lng(vars['$recIDs']) >1){
		for(var i = 0; i < roleIDs.length; i++){
			if(countDuplicates(roleIDs,roleIDs[i]) == _lng(vars['$recIDs'])){
				goodIds.push(roleIDs[i]);
				goodRoles.push(_getval(roleIDs[i],'device','logical.name','ci_name'))
			}
		}
		goodRoles = uniqueArray(goodRoles);
		goodIds = uniqueArray(goodIds);
		vars['$role'] = goodRoles;
		vars['$roleID'] = goodIds;
	}
		vars['$role'] = roles;
		vars['$roleID'] = roleIDs;

	for(var i = 0; i < _lng(vars['$roleID']); i++){
		for(var j = 0; j < _lng(vars['$recIDs']); j++){
			var s = new SCFile('Subscription');
			var rc = s.doSelect('subscriber="'+vars['$recIDs'][j]+'" and role.id="'+vars['$roleID'][i]+'" and active=true');
			if(rc == RC_SUCCESS){
				subscriptionIDs.push(s['subscriptionID']);
				subscribers.push(s['subscriber']);
			}
		}
	}
	vars['$lo.roleSubscriber']=subscribers
	vars['$lo.roleSubscriberID']=subscriptionIDs
}
