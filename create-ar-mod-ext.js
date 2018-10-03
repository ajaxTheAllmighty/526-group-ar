function getCompanyInInitpoints(){
	var cis ;
	var f = $('device', SCFILE_READONLY).setFields(['logical.name', 'type', 'istatus', 'ddc.scope', 'company', 'ci.name'])
	.select('type="bizservice" and ( istatus="Эксплуатация" or istatus="Опытная экспл.")').iterate(function(item){
		if (vars['$lo.my.initpoints'].join().search(item['company'])!=-1) {
			cis = (item['logical.name']);
		}
	});
	return cis
}






var inc = new SCFile('incidents');
var affItem = getCompanyInInitpoints();
var compound = new SCFile('cirelationship');
var rc = compound.doSelect('logical.name="'+affItem+'"')
if(rc == RC_SUCCESS){
	do{
		if(compound['related.cis'][0].search('oprtn')!=-1){
			var temp = _getval(compound['rela'],'device','logical.name','ci_name')
			if(temp == 'Управление доступом'){
				inc['inf.item.compound'] = compound['related.cis'][0]
			}
		}
	}while(compound.getNext() == RC_SUCCESS)
}
