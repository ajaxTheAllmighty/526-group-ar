function createSubscription(change){
	//print('start create sub');
	//print('change = '+change);
	var file = new SCFile('Subscription');
	var ar = new SCFile('accessRequest');
	var rc = ar.doSelect('c.id="'+change['number']+'" and status="Закрыт" and closure.code="1"')
	//print('ar = '+ar);
	if(rc == RC_SUCCESS){
		do{
			if(ar['subscription.id']==null){								//	не существует записи subscription
				if(ar['type'] == 'Ролевой'){
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
					file['subscriberType'] = _getval(ar['recipient'], 'contacts', 'contact.name', 'contact_type');
					if(ar['category'] == 'Предоставление'){
						file['open.id'] = change['number']
					}
					else if(ar['category'] == 'Отзыв'){
						file['close.id'] = change['number']
						file['close.date'] = change['inf.close.time'];
					}
					file['open.date'] = change['inf.close.time'];
					file['plan.close.date'] = ar['end.date'];
					file['type'] = 'Ролевой доступ'
					file.doInsert()
					ar['subscription.id'] = file['subscriptionID'];
					ar.doUpdate();
				}
				else{
					file['svcCatItem']  = 'Задача на изменение'
					file['serviceName'] = ar['cis.bzs.id'][0];
					file['displayName'] = ar['cis.bzs.name'][0];
					file['acss.id'] = ar['cis.acss.id'][0]
					file['acss.name'] = ar['cis.acss.name'][0]
					file['right.id'] = ar['cis.right.id'][0]
					file['right.name'] = ar['cis.right.name'][0]
					if(ar['category'] == 'Отзыв'){
						file['active'] = false
					}
					else{
						file['active'] = true
					}
					file['subscriber'] = ar['recipient'];
					file['subscriberType'] = _getval(ar['recipient'], 'contacts', 'contact.name', 'contact_type');
					if(ar['category'] == 'Предоставление'){
						file['open.id'] = change['number']
					}
					else if(ar['category'] == 'Отзыв'){
						file['close.id'] = change['number']
						file['close.date'] = change['inf.close.time'];
					}
					file['open.date'] = change['inf.close.time'];
					file['plan.close.date'] = ar['end.date'];
					file['type'] = 'Расширенный доступ'
					file.doInsert()
					ar['subscription.id'] = file['subscriptionID'];
					ar.doUpdate();
				}
			}
			else{
				var rc = file.doSelect('subscriptionID="'+ar['subscription.id']+'"')
				if(rc == RC_SUCCESS){
					if(ar['type'] == 'Ролевой'){
						if(ar['category'] == 'Изменение'){
							var newSub = new SCFile('Subscription')						// при изменении доступа отключить старый
							newSub = file;												// и создать новый с новыми атрибутами
							file['svcCatItem']  = 'Изменение'
							file['role.id'] = ar['role.logical.name'];
							file['role.name'] = ar['role.ci.name'];
								file['active'] = false		//отключить старый доступ
							file['subscriber'] = ar['recipient'];
							file['subscriberType'] = _getval(ar['recipient'], 'contacts', 'contact.name', 'contact_type');
								file['close.id'] = change['number']				// проставить id отзыва
								file['close.date'] = change['inf.close.time'];
							file['open.date'] = change['inf.close.time'];
							file['plan.close.date'] = ar['end.date'];
							file.doUpdate()
							newSub['plan.close.date'] = ar['end.date']
							newSub['open.date'] = change['inf.close.time'];
							newSub['open.id'] = change['number'];
							newSub.doInsert();
						}
						else{												//	тут отзыв
							file['svcCatItem']  = 'Изменение'
							file['role.id'] = ar['role.logical.name'];
							file['role.name'] = ar['role.ci.name'];
								file['active'] = false
								file['active'] = true
							file['subscriber'] = ar['recipient'];
							file['subscriberType'] = _getval(ar['recipient'], 'contacts', 'contact.name', 'contact_type');
							if(ar['category'] == 'Предоставление'){
								file['open.id'] = change['number']
							}
							else if(ar['category'] == 'Отзыв'){
								file['close.id'] = change['number']
								file['close.date'] = change['inf.close.time'];
							}
							file['open.date'] = change['inf.close.time'];
							file['plan.close.date'] = ar['end.date'];
							file.doUpdate()
						}
					}
					else{											// тоже самое для расширенного
						if(ar['category'] == 'Изменение'){
							var newSub = new SCFile('Subscription')						// при изменении доступа отключить старый
							newSub = file;												// и создать новый с новыми атрибутами
							file['svcCatItem']  = 'Задача на изменение'
							file['serviceName'] = ar['cis.bzs.id'][0];
							file['displayName'] = ar['cis.bzs.name'][0];
							file['acss.id'] = ar['cis.acss.id'][0]
							file['acss.name'] = ar['cis.acss.name'][0]
							file['right.id'] = ar['cis.right.id'][0]
							file['right.name'] = ar['cis.right.name'][0]
								file['active'] = false		//отключить старый доступ
							file['subscriber'] = ar['recipient'];
							file['subscriberType'] = _getval(ar['recipient'], 'contacts', 'contact.name', 'contact_type');
								file['close.id'] = change['number']				// проставить id отзыва
								file['close.date'] = change['inf.close.time'];
							file['open.date'] = change['inf.close.time'];
							file['plan.close.date'] = ar['end.date'];
							file.doUpdate()
							newSub['plan.close.date'] = ar['end.date']
							newSub['open.date'] = change['inf.close.time'];
							newSub['open.id'] = change['number'];
							newSub.doInsert();
						}
						else{
							file['svcCatItem']  = 'Задача на изменение'
							file['serviceName'] = ar['cis.bzs.id'][0];
							file['displayName'] = ar['cis.bzs.name'][0];
							file['acss.id'] = ar['cis.acss.id'][0]
							file['acss.name'] = ar['cis.acss.name'][0]
							file['right.id'] = ar['cis.right.id'][0]
							file['right.name'] = ar['cis.right.name'][0]
								file['active'] = false
							file['subscriber'] = ar['recipient'];
							file['subscriberType'] = _getval(ar['recipient'], 'contacts', 'contact.name', 'contact_type');
								file['close.id'] = change['number']
								file['close.date'] = change['inf.close.time'];
							file['open.date'] = change['inf.close.time'];
							file['plan.close.date'] = ar['end.date'];
							file.doUpdate()
						}
					}
				}
			}
		}while(ar.getNext() == RC_SUCCESS)
	}
}
