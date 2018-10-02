function fillModForm(){
	print('---------------test--------------');
	print('sub '+vars['$lo.subscriber']);
	print('sub id '+vars['$lo.subscriberID']);
	print('sub role '+vars['$lo.roleSubscriber']);
	print('role id '+vars['$lo.roleSubscriberID']);
	print('----------end test----------');
		for(var i = 0; i <_lng(vars['$lo.subscriber']); i++){
			var f = new SCFile('Subscription');
			var rc = f.doSelect('subscriptionID="'+vars['$lo.subscriberID'][i]+'"')
			vars['$bzs'] = _ins(vars['$bzs'],0,1,f['displayName']);
			vars['$accs'] = _ins(vars['$accs'],0,1,f['acss.name']);
			vars['$right'] = _ins(vars['$right'],0,1,f['right.name']);
			vars['oldDate'] = _ins(vars['oldDate'],0,1,f['plan.close.date']);
			vars['$recipient'] = _ins(vars['$recipient'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'));
			if(_lng(vars['$lo.subscriber']) == 1 && _lng(vars['$lo.roleSubscriber']) == 0){
				vars['$rightReadOnly'] = false;
				var rel = new SCFile('cirelationship');
				var rcc = rel.doSelect('logical.name="'+f['accs.id']+'"');
				if(rcc == RC_SUCCESS){
					do{
						var d = new SCFile('device');
						var rrc = d.doSelect('logical.name="'+rel['related.cis'][0]+'" and company="'+vars['$lo.operator']['company']+'" and (istatus="Эксплуатация" or istatus="Опытная экспл.")');
						if(rrc = RC_SUCCESS){
							vars['$rightNames'] = _ins(vars['$rightNames'],0,1,d['ci.name']);
							vars['$rightIDs'] = _ins(vars['$rightIDs'],0,1,d['logical.name']);
						}
					}while(rel.getNext() == RC_SUCCESS)
				}
			}
		}
		// COMBAK: доюавить наполнение ролей
		for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
			var f = new SCFile('Subscription');
			var rc = f.doSelect('subscriptionID="'+vars['$lo.roleSubscriberID'][i]+'"')
			vars['$role'] = _ins(vars['$role'],0,1,f['role.name']);
			vars['$roleDT'] = _ins(vars['$roleDT'],0,1,f['plan.close.date']);
			vars['$recipient'] = _ins(vars['$recipient'],0,1,_getval(f['subscriber'],'contacts','contact.name','full_name'));
		}
}
