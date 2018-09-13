function selectRm(id){
	var file = new SCFile('Subscription');
	var rc = file.doSelect('subscriptionID="'+id+'"');
	var ar = new SCFile('accessRequest');
	if(rc==RC_SUCCESS){
		if(file['type']=='Расширенный доступ'){
			ar['initiator'] = _op();
			ar['recipient'] = user;
			ar['date.open'] = _tod();
			ar['oper.open'] = _op();
			ar['category'] = 'Отзыв';	//предоставление изменние отзыв
			ar['type'] = 'Расширеный';		//базовый расширеный ролевой
			ar['cis.right.id'][0] = file['right.id'];
			ar['cis.right.name'][0] = file['right.name'];
			ar['cis.acss.id'][0] = file['acss.id'];
			ar['cis.acss.name'][0] = file['acss.name'];
			ar['cis.bzs.id'][0] = file['serviceName'];
			ar['cis.bzs.name'][0] = file['displayName'];
			ar['company'] = vars['$lo.operator']['company'];
				var rcc = ar.doInsert();
				print(RCtoString(rcc));
		}
		else if(file['type']=='Ролевой доступ'){
			ar['initiator'] = _op();
			ar['recipient'] = user;
			ar['date.open'] = _tod();
			ar['oper.open'] = _op();
			ar['category'] = 'Отзыв';	//предоставление изменние отзыв
			ar['type'] = 'Ролевой';		//базовый расширеный ролевой
			ar['role.logical.name'] = file['role.id'];
			ar['role.ci.name'] = file['role.name'];
			ar['company'] = vars['$lo.operator']['company'];
			var rcc = ar.doInsert();
			print(RCtoString(rcc));
		}
	}
}
