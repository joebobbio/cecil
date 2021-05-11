const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "unload",
                type: "dev",
                description: "Unload commands.",
                usage: "<command to reload>",
                aliases: ["unl"],
                saying: "N/A.",
                cooldown: 0
            });
        }
		
        main(msg) {
            let fuckoffEmbed = new Embed()
        .setTitle("Error")
        .setDescription(`<@!${msg.author.id}>, you don't have permission to use this command!`)
        .setColor("RED")

        if(!this.client.config.owners.has(msg.author.id)) return msg.send(fuckoffEmbed);
            if (msg.params[0].toLowerCase() === 'reload') return msg.send("Invalid command!");
            const command = this.client.commands.delete(msg.params[0].toLowerCase());
            if (!command) return msg.send("Invalid command!");
            return msg.send("Command unloaded!");
        }
    };
