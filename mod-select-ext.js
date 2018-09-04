function selectExt(id){
	var file = new SCFile('Subscription');
	var rc = file.doSelect('subscriptionID="'+id+'"');
	if(rc==RC_SUCCESS && file['type']='Расширенный доступ'){
		vars['$subscrFile'] = file;
		vars['$wizardName'] = 'INF.accessRequest-mod-ext';
	}
}
