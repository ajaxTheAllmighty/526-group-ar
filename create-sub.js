function createSubscription(change){
	var file = new SCFile('Subscription');
	var ar = new SCFile('accessRequest');
	var rc = ar.doSelect('c.id="'+change+'"')
	if(rc == RC_SUCCESS){
		do{
			if(ar['type == Ролевой']){
				file['svcCatItem']  = 'Изменение'
				file['role.id'] = ar['role.logical.name'];
				file['role.name'] = ar['role.ci.name'];
				if(ar['category'] == 'Отзыв'){
					file['active'] = false
				}
				else{
					file['active'] = true
				}
				file['subscriber'] = ar['recipient'];
				file['subscriberType'] = _getval(ar['recipient'],'contacts','contact.name','type');
				file['open.id'] = change
				file['close.id'] = change
				file['open.date'] = change['inf.close.time'];
				file['close.date'] = change['inf.close.time'];
				file['plan.close.date'] = ar['end.date'];
				file.doInsert()
			}
			else{
				file['svcCatItem']  = 'Задача на изменение'
				file['serviceName'] = ar['cis.bzs.id'];
				file['displayName'] = ar['cis.bzs.name'];
				file['acss.id'] = ar['cis.acss.id']
				file['acss.name'] = ar['cis.acss.name']
				file['right.id'] = ar['cis.right.id']
				file['right.name'] = ar['cis.right.name']
				if(ar['category'] == 'Отзыв'){
					file['active'] = false
				}
				else{
					file['active'] = true
				}
				file['subscriber'] = ar['recipient'];
				file['subscriberType'] = _getval(ar['recipient'],'contacts','contact.name','type');
				file['open.id'] = change
				file['close.id'] = change
				file['open.date'] = change['inf.close.time'];
				file['close.date'] = change['inf.close.time'];
				file['plan.close.date'] = ar['end.date'];
				file.doInsert()
			}
		}while(ar.getNext() == RC_SUCCESS)
	}
}
