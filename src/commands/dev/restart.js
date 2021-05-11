const { Command, Embed } = require("../../../lib");

module.exports = 
class extends Command {
    constructor(...args) {
        super(...args, {
            name: "restart",
            type: "dev",
            description: "Restart bot",
            usage: "No arguments",
            aliases: ["reboot"],
            saying: null,
            cooldown: 0
        });
    }

    async main(msg) {
        let fuckoffEmbed = new Embed()
        .setTitle("Error")
        .setDescription(`<@!${msg.author.id}>, you don't have permission to use this command!`)
        .setColor("RED")

        if(!this.client.config.owners.has(msg.author.id)) return msg.send(fuckoffEmbed);

        await msg.send("Restarting...");
        process.exit(0);
    }
};