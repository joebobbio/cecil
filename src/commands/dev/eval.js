const { DiscordAPIError } = require("discord.js");
const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "ev",
                type: "dev",
                description: "Eval js.",
                usage: "<command to reload>",
                aliases: ["eval"],
                saying: "N/A.",
                cooldown: 0
            });
        }

        async main(msg) {
            let fuckoffEmbed = new Embed() 
                .setTitle("Error")
                .setDescription(`<@!${msg.author.id}>, you don't have the permission to use this command!`)
                .setColor("RED")
 
            
            if (!this.client.config.owners.has(msg.author.id)) return msg.send(fuckoffEmbed); 
                
            let raw;

            try {
                raw = eval(msg.params.join(" ").replace(/process\.env/g, ""));
            } catch (err) {
                raw = err;
            }

            const output = require("util").inspect(raw).replace(this.client.token, "[redacted]").console.log(`${msg.author} (${msg.author.id} tried to grab the token! Consider blacklisting them.)`);
            msg.send(`PLEASE remove this from your production environment!`)
            msg.send(output, { code: "bash", split: true });
        }
    };
