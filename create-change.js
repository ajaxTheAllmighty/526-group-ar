function createChange(sdFile){
	var file = new SCFile('cm3r');
	file['priority.code'] = 4;
	file['requested.by'] = sdFile['callback.contact'];
	file['affected.item'] = sdFile['affected.item'];
	file['brief.description'] = sdFile['title']
	file['description'] = sdFile['description']
	file['effect.not.impl'] = 'Не исполнение своих должностных обязанностей';
	file['coordinator'] =
	file['planned.start'] = sdFile['open.time']
	file['planned.end'] = sdFile['open.time'] // +16 рабочих часов
	file['reason'] = 'Innovative'
	//docnew_cm3r
}
//Улучшение (плановое)
//C14077
