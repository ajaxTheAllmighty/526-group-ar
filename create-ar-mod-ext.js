function createARModExt__time(newTime,user){
	//print('func time');
	var file = new SCFile('accessRequest');
		file['initiator'] = _op();
		file['recipient'] = user;
		//print(user);
		file['date.open'] = _tod();
		file['oper.open'] = _op();
		file['category'] = 'Изменение';	//предоставление изменние отзыв
		file['type'] = 'Расширеный';		//базовый расширеный ролевой
		file['end.date'] = newTime;
		file['company'] = vars['$lo.operator']['company'];
	var rc = file.doInsert();
	print(RCtoString(rc));
}

function createARModExt__right(newRightId,user){
	//print('func right');
	var device = new SCFile('device');
	var file = new SCFile('accessRequest');
		file['initiator'] = _op();
		file['recipient'] = user;
		//print(user);
		file['date.open'] = _tod();
		file['oper.open'] = _op();
		file['category'] = 'Изменение';	//предоставление изменние отзыв
		file['type'] = 'Расширеный';		//базовый расширеный ролевой
		file['cis.right.id'][0] = newRightId;
		var rcc = device.doSelect('logical.name="'+newRightId+'"');
		file['cis.right.name'][0] = device['ci.name'];
		file['company'] = vars['$lo.operator']['company'];
	var rc = file.doInsert();
	print(RCtoString(rc));
}
function createARModExt__rightTime(newRightId,newTime,user){
	//print('fucn both');
	var device = new SCFile('device');
	var file = new SCFile('accessRequest');
		file['initiator'] = _op();
		file['recipient'] = user;
		//print(user);
		file['date.open'] = _tod();
		file['oper.open'] = _op();
		file['category'] = 'Изменение';	//предоставление изменние отзыв
		file['type'] = 'Расширеный';		//базовый расширеный ролевой
		file['end.date'] = newTime;
		file['cis.right.id'][0] = newRightId;
		var rcc = device.doSelect('logical.name="'+newRightId+'"');
		file['cis.right.name'][0] = device['ci.name'];
		file['company'] = vars['$lo.operator']['company'];
	var rc = file.doInsert();
	print(RCtoString(rc));
}
