const fs = require("fs");
const glob = require("glob");

glob("../workspaces/**/workspace.json", async function (err, files) {
	if (err) {
		console.log(
			"cannot read the folder, something goes wrong with glob",
			err
		);
	}


	for (const file of files) {

		let filedata = fs.readFileSync(file);
		let parsed = JSON.parse(filedata);
		delete parsed.compatibility

		parsed.compatibility = []

		let details = {
			version: '1.17.x',
			image: parsed.name,
			uncompressed_size_mb: parsed.uncompressed_size_mb,
			available_tags: [
				'1.17.0',
				'1.16.0',
				'1.15.0',
				'1.14.0'
			]
		}

		parsed.compatibility.push(details)
		delete parsed.uncompressed_size_mb
		delete parsed.name

		fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
	}


});
