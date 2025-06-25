const fs = require("fs");
const glob = require("glob");
const { hashElement } = require("folder-hash");
const nextConfig = require("../site/next.config.js")

var dir = "./public";

if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}
if (!fs.existsSync(dir + "/icons")) {
	fs.mkdirSync(dir + "/icons");
}

glob("**/workspace.json", async function (err, files) {
	if (err) {
		console.log(
			"cannot read the folder, something goes wrong with glob",
			err
		);
	}

	let workspacetotal = files.length;
	let workspaces = [];
	let promises = [];

	const options = {
		algho: "sha1",
		encoding: "hex",
	};

	let channels = new Set()
	let versions = new Set()

	for (const file of files) {
		//files.forEach(async function(file) {

		let folder = file.replace("/workspace.json", "");

		let hash = await hashElement(folder, options);
		let filedata = fs.readFileSync(file);

		let parsed = JSON.parse(filedata);
		parsed.sha = hash.hash;
		console.log(parsed.friendly_name + ' added')
		parsed.compatibility.forEach((element, index) => {
			if ('available_tags' in element) {
				element.available_tags.forEach((el) => {
					channels.add(el)
				})
			}
			if ('version' in element) {
				versions.add(element.version)
			}
		})
		workspaces.push(parsed);

		if (fs.existsSync(folder + "/" + parsed.image_src)) {
			let imagedata = fs.readFileSync(folder + "/" + parsed.image_src);
			fs.writeFileSync(dir + "/icons/" + parsed.image_src, imagedata);
		} else {
			console.error("missing file: ".folder + "/" + parsed.image_src);
		}

	}

	let json = {
		name: nextConfig.env.name || 'Unknown store',
		workspacecount: workspacetotal,
		icon: nextConfig.env.icon || null,
		description: nextConfig.env.description || null,
		list_url: nextConfig.env.listUrl || null,
		contact_url: nextConfig.env.contactUrl || null,
		modified: Date.now(),
		workspaces: workspaces,
		channels: [...channels],
		default_channel: 'develop'
	};

	if (channels.size === 0) {
		json.default_channel = null
	}

	let data = JSON.stringify(json);

	fs.writeFileSync(dir + "/list.json", data);
	fs.writeFileSync(dir + "/versions.json", JSON.stringify({
		versions: [...versions]
	}));

});
