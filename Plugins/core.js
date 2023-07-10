const fs = require("fs");
const axios = require("axios");
const path = require("path");
let mergedCommands = [
  "help",
  "h",
  "menu",
  "support",
  "supportgc",
	"report",
];

module.exports = {
  name: "others",
  alias: [...mergedCommands],
  uniquecommands: ["help", "support", "report"],
  description: "All miscleaneous commands",
  start: async (Atlas, m, { pushName, prefix, inputCMD, doReact }) => {
    let pic = fs.readFileSync("./Assets/Atlas.jpg");
    switch (inputCMD) {
            case "support":
      case "supportgc":
        await doReact("🎀");
        let txt2 = `              🧣 *Support Group* 🧣\n\n*${botName}* is a Public Bot, and we are always happy to help you.\n\n*Link:* ${suppL}\n\n*Note:* Please don't spam in the group, and don't message *Admins directly* without permission. Ask for help inside *Group*.\n\n*Thanks for using Elaina✨.*`;
        Atlas.sendMessage(m.from, { image: pic, caption: txt2 }, { quoted: m });
        break;
		   
      case "help":
      case "h":
      case "menu":
        await doReact("🎐");
        await Atlas.sendPresenceUpdate("composing", m.from);
        function readUniqueCommands(dirPath) {
          const allCommands = [];

          const files = fs.readdirSync(dirPath);

          for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
              const subCommands = readUniqueCommands(filePath);
              allCommands.push(...subCommands);
            } else if (stat.isFile() && file.endsWith(".js")) {
              const command = require(filePath);

              if (Array.isArray(command.uniquecommands)) {
                const subArray = [file, ...command.uniquecommands];
                allCommands.push(subArray);
              }
            }
          }

          return allCommands;
        }

        function formatCommands(allCommands) {
          let formatted = "";

          for (const [file, ...commands] of allCommands) {
            const capitalizedFile =
              file.replace(".js", "").charAt(0).toUpperCase() +
              file.replace(".js", "").slice(1);

            formatted += `🔖 *${capitalizedFile}:*\n`;
            //formatted += `\`\`\`${commands.join("\n")}\`\`\`\n\n\n`;
            // Adding a - before each command
            formatted += `\`\`\`${commands
              .map((cmd) => `${cmd}`)
              .join(",")}\`\`\`\n\n`;
          }

          return formatted.trim();
        }

        const pluginsDir = path.join(process.cwd(), "Plugins");

        const allCommands = readUniqueCommands(pluginsDir);
        const formattedCommands = formatCommands(allCommands);
        var helpText = `\n「(💙^💙」
│⋊ 𝕌𝕤𝕖𝕣: *${pushName}*
│⋊ ℕ𝕒𝕞𝕖: *${botName}*
│⋊ ℙ𝕣𝕖𝕗𝕚𝕩: *${prefix}*
│⋊ 𝕆𝕨𝕟𝕖𝕣: *Ronen🎐*
│⋊ 𝕆𝕗𝕗𝕚𝕔𝕚𝕒𝕝 𝔾𝕣𝕠𝕦𝕡: http://surl.li/eumln
╰────────────┈エリーナ  

*Here's the list of my Commands.*\n\n${formattedCommands}\n\n\n〽️Use *${prefix}report* to report the developer if you face any issue regarding the bot.\n\n*💗Have a nice day*\n\n*🔱 Ronen-Bots- 2023*`;
        await Atlas.sendMessage(
          m.from,
          { video: { url: botVideo }, gifPlayback: true, caption: helpText },
          { quoted: m }
        );

        break;
      default:
        break;
    }
  },
};
