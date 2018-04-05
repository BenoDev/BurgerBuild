export const updateObject = (oldObject,updateProprieties) =>{
	return {
		...oldObject,
		...updateProprieties
	}
}