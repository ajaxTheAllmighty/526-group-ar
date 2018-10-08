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
	inc['title'] = 'Изменение доступа';
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
			var rcc = f.doSelect('recipient="'+recipents[i]+'" and role.logical.name="'+rolesArray[attribCount]+'" and category="Предоставление"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+recipents[i]+'" and role.id="'+rolesArray[attribCount]+'"')
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
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}

}

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
	inc['title'] = 'Изменение доступа';
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
			var rcc = f.doSelect('recipient="'+vars['$recIDs'][i]+'" and cis.bzs.id="'+serviceIds[attribCount]+'" and cis.acss.id="'+accsIds[attribCount]+'" and cis.right.id="'+rightIds[attribCount]+'" and category="Предоставление"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+vars['$recIDs'][i]+'" and serviceName="'+serviceIds[attribCount]+'" and acss.id="'+accsIds[attribCount]+'" and right.id="'+rightIds[attribCount]+'" and type="Расширенный доступ" and active=true')
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
			ar['sd.id'] = incidentID;
			ar.doUpdate();
		}
	}

}

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
				var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Изменение" and cis.right.id="'+vars['$rightID'][_index(vars['$newRight'],vars['$rightNames'])-1]+'"')
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
			var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Изменение"')
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
	//print(vars['$lo.subscriber'],_lng(vars['$lo.subscriber']));
	var file = new SCFile('accessRequest');
		for (var i = 0; i < _lng(vars['$lo.subscriber']); i++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('subscription.id="'+vars['$lo.subscriberID'][i]+'" and category="Отзыв"')
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
				print(' - '+_conts(f));
				rejectedAR.push(f['id']);
			}
		}

	for(var i = 0; i < _lng(vars['$lo.roleSubscriber']); i++){
		var f = new SCFile('accessRequest');
		var rcc = f.doSelect('subscription.id="'+vars['$lo.roleSubscriberID'][i]+'" and category="Отзыв"')
		if(rcc != RC_SUCCESS){
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
