const { Module } = require("../base");
const messages = require("../../messages.json");
const misc = require("../../utils/misc.js");
module.exports =
    class extends Module {
        constructor(client, { name, once = false }) {
            super(name, client);
            this.once = once;
        }
 /** THIS IS BROKEN, PLEASE PR IF YOU HAVE A FIX!
        updatePresence() {
            function activityChanger(){
                this.client.user.setPresence({
                    activity: {
                        name: `${misc.random(messages)} | ${this.client.config.prefix}help`,
                        type: "WATCHING"
                    },
                });
                setTimeout(this.activityChanger, 20000);
            }
        } **/
        updatePresence() {
            this.client.user.setPresence({
                activity: {
                    name: `${this.client.guilds.cache.size} guilds | ${this.client.config.prefix}help`,
                    type: "WATCHING",
                },
            });
        }
    };
