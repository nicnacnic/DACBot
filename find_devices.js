const portAudio = require('naudiodon');

let array = portAudio.getDevices();
console.log('\n ID   Name')
array.forEach(element => {
	if (element.id < 10)
		console.log(`  ${element.id}   ${element.name}`)
	else if (element.id < 100)
		console.log(` ${element.id}   ${element.name}`)
	else
		console.log(`  ${element.id}   ${element.name}`)
})