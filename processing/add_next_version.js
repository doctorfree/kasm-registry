const fs = require("fs");
const glob = require("glob");

const baseversion = '1.17'
const version = baseversion + '.x'

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

		const current = parsed.compatibility[parsed.compatibility.length - 1]

		const exists = parsed.compatibility.findIndex(el => el.version === version)

		let details = {
			version,
			image: current.image,
			uncompressed_size_mb: current.uncompressed_size_mb
		}

		if (exists === -1) {
			parsed.compatibility.push(details)
			fs.writeFileSync(file, JSON.stringify(parsed, null, 2));
		}
	}


});
