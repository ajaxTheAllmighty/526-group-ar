var file = new SCFile('accessRequest');
for (var i = 0; i <_lng(vars['$recipient']); i++){
	if(vars['$newRight']!=null){
		for(var j = 0; j< _lng(vars['$bzs']); j++){
			file['cis.bzs.id'] = vars['$lo.bzs'][j];
			file['cis.acss.id'] = vars['$lo.accs'][j];
			file['cis.right.id'] = vars['$right'][j];
			file['cis.bzs.name'] = vars['$bzs'][j];
			file['cis.acss.name'] = vars['$accs'][j];
			file['cis.right.name'] = vars['$rightNames'][j]
			file['recipient'] = vars['$recipient'][i];
			file['category'] = 'Изменение';	//предоставление изменние отзыв
			file['type'] = 'Расширеный';		//базовый расширеный ролевой
			file['company'] = vars['$lo.company'];
			file['date.open'] = _tod();
			file['oper.open'] = _op();
			if(vars['$newDate']!=null){
				file['end.date'] = vars['$newDate'];
			}
			file['subscription.id'] = //subid;
			file['initiator'] = _op();
			file['description'] = vars['$reason'];
			var rc = file.doInsert();
		}
	}
}
for(var i = 0; i <_lng(vars['$recipient']); i++){
	if(_lng(vars['$role'])>0){
		for(var j = 0; j< _lng(vars['$bzs']); j++){
			file['recipient'] = vars['$recipient'][i];
			file['category'] = 'Изменение';	//предоставление изменние отзыв
			file['type'] = 'Ролевой';		//базовый расширеный ролевой
			file['company'] = vars['$lo.company'];
			file['date.open'] = _tod();
			file['oper.open'] = _op();
			file['end.date'] = vars['$newDate'];
			file['subscription.id'] = //subid;
			file['initiator'] = _op();
			file['description'] = vars['$reason'];
			file['role.ci.name'] = vars['$role'][j]
			file['role.logical.name'] = vars['$lo.role'][j];
			var rc = file.doInsert();
		}
	}
}
