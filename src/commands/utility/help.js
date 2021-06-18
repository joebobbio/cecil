const { Command, Embed } = require("../../../lib");
const checkmark = "✅";
const badparam = "❌";

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "help",
                type: "utility",
                description: "Get help on commands.",
                usage: "If you're reading this, you've figured it out already.",
                aliases: ["h"],
                saying: "Don't spam help command.",
                cooldown: 2
            });
        }

        toProper(string) {
            return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
        }

        async main(msg) {

            const aliases = {
                "mod": "moderation",
                "mus": "music",
                "utils": "utility",
                "util": "utility",
            };
            const helpArg = msg.params[0]?.toLowerCase();
            const categories = ["fun", "moderation", "music", "utility"];

            if (!helpArg) {
		msg.react(checkmark);
                const helpEmbed = new Embed()
                    .setTitle("Help")
                    .addFields(
                        { name: "Categories", value: categories.map(e => this.toProper(e)).join("\n") },
                        { name: "Additional Info", value: "For help on a command or category, use `c!help [command|category].`" }
                    );
                return msg.send(helpEmbed);
            }
            else if (Object.keys(aliases).includes(helpArg) || categories.includes(helpArg)) {
                const category = aliases[helpArg] || helpArg;

                const commands = [...this.client.commands.values()]
                    .filter(c => c.type === category)
                    .map(c => `\`${c.name}\``).join(", ");
		msg.react(checkmark);
                const helpEmbed = new Embed()
                    .setTitle("Help")
                    .addField(`Commands in the ${this.toProper(category)} Category`, `> ${commands}`);
                return msg.send(helpEmbed);
            }
            else if (this.client.commands.has(helpArg)) {
                const command = this.client.commands.get(helpArg);
		msg.react(checkmark);
                const commandEmbed = new Embed()
                    .setTitle(this.toProper(command.name))
                    .setDescription(command.description)
                    .addFields(
                        { name: "Type", value: this.toProper(command.type) },
                        { name: "Usage", value: command.usage },
                        { name: "Aliases", value: command.aliases.join(", ") }
                    );
                return msg.send(commandEmbed);
            }
            else {
	msg.react(badparam);
	 msg.send("That's not a valid command or category!");
	}
        }
    };
