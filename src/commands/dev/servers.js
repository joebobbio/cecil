const { Command, Embed } = require("../../../lib");

module.exports = 
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "servers",
                type: "dev",
                aliases: ["serverlist"],
                usage: "No arguments.",
                description: "Lists all of the servers I am in.",
                cooldown: 2,
                saying: "I'm not that popular."
            });
        }

        async main(msg) {
         msg.channel.send(this.client.guilds.cache.reduce((acc, srv) => acc + srv.name + '\n', "").trim());
        }
    }
