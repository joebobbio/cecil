const { Command } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "permissions",
                type: "utility",
                description: "Check user permissions",
                usage: "No arguments",
                aliases: ["perms"],
                saying: "I don't think your permissions have changed yet.",
                cooldown: 5
            });
        }
        
        toFriendly(string) {
               return string.split("_").map(s => `${s[0].toUpperCase()}${s.slice(1)}`).join(" ").trim()
        }

        main(msg) {
               const perms = msg.member.permissions.serialize();
               msg.send(`**Permissions for <@!${msg.member.id}> in ${msg.guild.name}**`)
               msg.send(Object.entries(perms).map(p => `${this.toFriendly(p[0])}: ${p[1]}\n`))
        }
    }
