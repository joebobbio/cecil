const { Command, Embed } = require("../../../lib");

module.exports =
    class extends Command {
        constructor(...args) {
            super(...args, {
                name: "invite",
                type: "utility",
                description: "Invite link for Cecil.",
                usage: "No arguments required",
                saying: "I just gave it to you!",
                cooldown: 2
            });
        }

        main(msg) {
            const invite = new Embed()
                .setTitle("Invites")
                .addFields(
                    {
                        name: "Bot", value: `
                        [Add it to your server!](${this.client.invite})`,
                        inline: true
                    },
                    {
                        name: "Server", value: `
                        Cecil Community`,
                        inline: true
                    }
                );
            msg.send(invite);
        }
    };
