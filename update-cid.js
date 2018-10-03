function updateCID(sdId,cId){
	var file = new SCFile('accessRequest');
	var rc = file.doSelect('sd.id="'+sdId+'"');
	if(rc == RC_SUCCESS){
		do{
			file['c.id'] = cId;
			file.doUpdate();
		}while(file.getNext() == RC_SUCCESS)
	}
}
