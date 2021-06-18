const { ModerationCommand } = require("../../../lib");

module.exports =
    class extends ModerationCommand {
        constructor(...args) {
            super(...args, {
                name: "ban",
                type: "moderation",
                aliases: ["hammer"],
                description: "Ban people.",
                usage: "<mention|user ID> [reason]",
                cooldown: 2,
                saying: "Hammer discipline!",
                requiredPermissions: ["BAN_MEMBERS"]
            });
        }

        async main(msg) {
            if (!msg.params[0]) return msg.send("I can't ban anyone if you don't tell me who to ban.");

            const target = msg.mentions.members.first() ||
                await msg.guild.members.fetch(msg.params[0]).catch(() => { null; });

            if (!target) return msg.send("Give me a valid user that I can ban!");
            else if (target.id === msg.author.id) return msg.send("You can't call that on yourself.");
            else if (target.id === this.client.user.id) return msg.send("Why me?");
            else if (!target.bannable) return msg.send("That isn't a bannable user!");

            const reason = msg.params.slice(1).join(" ") || "No reason given";

            target.ban({ reason: reason });

            msg.send(`${msg.emojis.done} ${target.user.username} has been banned from **${msg.guild.name}**.`);

            target.send(``).catch(() => null);
        }
    };
