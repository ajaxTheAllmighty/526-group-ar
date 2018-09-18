function createARRM(){
	var file = new SCFile('accessRequest');
	for(var attribCount = 0; i < _lng(vars['$action']), attribCount++){
		if(vars['$bzs']!=null && vars['$bzsID']!=null && vars['$accs']!=null && vars['$accsID']!=null && vars['$right']!=null && vars['$rightID']!=null){
			file['initiator'] = _op();
			file['date.open'] = _tod();
			file['oper.open'] = _op();
			file['recipient'] = recipents[recipientCount];
			file['category'] = 'Отзыв';	//предоставление изменние отзыв
			file['type'] = 'Расширеный';		//базовый расширеный ролевой
			file['description'] = desc;
			file['cis.bzs.id'][0] = vars['bzsID'][attribCount];
			file['cis.bzs.name'][0] = vars['bzs'][attribCount];
			file['cis.acss.id'][0] = vars['$accsID'][attribCount];
			file['cis.acss.name'][0] = vars['$accs'][attribCount];
			file['cis.right.id'][0] = vars['$rightID'][attribCount];
			file['cis.right.name'][0] = vars['$right'][attribCount];
			file['company'] = vars['$lo.operator']['company'];
			var rc = file.doInsert();
			print(RCtoString(rc));
		}
	}
	for(var attribCount = 0; i < _lng(vars['$roleAction']), attribCount++){
		if(vars['$role']!=null && vars['$roleID']!=null){
			file['initiator'] = _op();
			file['date.open'] = _tod();
			file['oper.open'] = _op();
			file['recipient'] = recipents[recipientCount];
			file['category'] = 'Отзыв';	//предоставление изменние отзыв
			file['type'] = 'Ролевой';		//базовый расширеный ролевой
			file['description'] = desc;
			file['role.logical.name'] = vars['$roleID'][attribCount];
			file['role.ci.name'] = vars['$role'][attribCount];
			file['company'] = vars['$lo.operator']['company'];
			var rc = file.doInsert();
			print(RCtoString(rc));
		}

	}
}
