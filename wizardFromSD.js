function ARExists(id){
	var file = new SCFile('accessRequest')
	var rc = file.doSelect('sd.id="'+id+'"')
	if(rc == RC_SUCCESS){
		return false
	}
	else{
		return true;
	}
}
