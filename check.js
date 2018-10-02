function createARGetExt(recipents,serviceIds,serviceNames,accsIds,acssNames,rightIds,rightNames,desc,start,end){
	var rejectedAR = [];
	var rejectedARSUB = [];
	var approvedAR = [];
	var successCount = 0;
	var file = new SCFile('accessRequest');
	//print(serviceIds.length());
	for(var recipientCount = 0; recipientCount < recipents.length(); recipientCount++){
		for(var attribCount = 0; attribCount < serviceIds.length(); attribCount++){
			var f = new SCFile('accessRequest');
			var rcc = f.doSelect('recipent="'+recipents[i]+'" and cis.bzs.id="'+serviceIds[attribCount]+'" and cis.acss.id="'+accsIds[attribCount]+'" and cis.right.id="'+rightIds[attribCount]+'" and category="Предоставление"')
			if(rcc != RC_SUCCESS){
				var s = new SCFile('Subscription');
				var rrc = s.doSelect('subscriber="'+recipents[i]+'" and serviceName="'+serviceIds[attribCount]+'" and acss.id="'+accsIds[attribCount]+'" and right.id="'+rightIds[attribCount]+'"')
				if(rrc != RC_SUCCESS){
				file['id'] = lib.ARUtils.GetNextNumber('accessRequest');
					file['initiator'] = _op();
					file['date.open'] = _tod();
					file['oper.open'] = _op();
					file['recipient'] = recipents[recipientCount];
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
	for(var i = 0; i < approvedAR.length; i++){
		var f = new SCFile('accessRequest');
		var rc = f.doSelect('id="'+approvedAR[i]+'"')
		if(rc == RC_SUCCESS){
			vars['$bzsApr'] = _ins(vars['$bzsApr'],0,1,f['cis.bzs.name']);
			vars['$accsApr'] = _ins(vars['$accsApr'],0,1,f['cis.acss.name']);
			vars['$rightApr'] = _ins(vars['$rightApr'],0,1,f['cis.right.name'])
			vars['$extDateApr'] = _ins(vars['$extDateApr'],0,1,f['date.open']);
			vars['$extRecipientApr'] = _ins(vars['$extRecipientApr'],0,1,_getval(f['recipient'],'contacts','contact.name','full_name'))
		}
	}
	if(successCount>0){
		print('Успешно создано '+successCount+' запросов');
	}
}
