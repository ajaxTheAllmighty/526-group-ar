function createARGetExt(recipents,serviceIds,serviceNames,accsIds,acssNames,rightIds,rightNames,desc){
	var file = new SCFile('accessRequest');
	print(serviceIds.length());
	for(var recipientCount = 0; recipientCount < recipents.length(); recipientCount++){
		for(var attribCount = 0; attribCount < serviceIds.length(); attribCount++){
			//print('current rec '+recipents[recipientCount]+ ' '+recipientCount+' of '+recipents.length());
			//print('current values '+serviceIds[attribCount]+' '+serviceNames[attribCount]+' '+accsIds[attribCount]+' '+acssNames[attribCount]+' '+rightIds[attribCount]+' '+rightNames[attribCount]+' '+attribCount+' of '+serviceIds.length());
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
			var rc = file.doInsert();
			print(RCtoString(rc));
		}
	}
}
