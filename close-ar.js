function closeAR(ctID){
	var file = new SCFile('accessRequest')
	var rc = file.doSelect('ct.id="'+ctID+'"')
	if(rc == RC_SUCCESS){
		file['status'] = 'Закрыт'
		file.doUpdate();
	}
}
