const Discord = require('discord.js');
const { Token } = require('./lib/config.js'); 
const client = new Discord.Client ();
const fs = require('fs');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

client.on("message", message => {
    if (message.author.bot) return; 
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
        message.channel.send("<@" + message.author.id + ">님이 `" + userInfo.level + "`레벨을 달성 하셨습니다. 다들 축하해주세요!")
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "level") {
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
            let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(0x4286f4)
            .addField("레벨", userInfo.level)
            .addField("경험치", userInfo.xp+"/100");
        if(!member) return message.channel.send(embed)
            try {
                let memberInfo = db[member.id]
                let embed2 = new Discord.RichEmbed()
                .setAuthor(member.displayName, message.mentions.members.first().avatarURL)
                .setColor(0x4286f4)
                .addField("레벨", memberInfo.level)
                .addField("경험치", memberInfo.xp+"/100")
                message.channel.send(embed2)
            } catch (error) {
                return;
            }
    }
    fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
    });
});

client.on('ready', () => {
	console.log(client.user.tag + "가 작동을 준비합니다.")
	console.log(client.user.id + "이 " + client.user.tag + "의 아이디입니다.")
	console.log('! 작동중 !');
	client.user.setPresence({ game: { name: '뷰메커뮤니티 관리중' }, status: 'online' })
});
	
let join_id = "677317580381356044";
let leave_id = "677318875427373059";

client.on("guildMemberAdd", member => {
	//if(member.user.bot) return;

    let guild = client.guilds.get("677317579559141395");
	const channel = client.channels.get(join_id)
	
    let wembed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setTitle(member.displayName + "님이 서버에 입장하셨습니다.")
		.setDescription("서버에 오신 것을 환영합니다. 많은홍보 부탁드립니다.")
		.setThumbnail(member.user.avatarURL)
		.setFooter(`현재 인원 : ${guild.memberCount}`)
	try {
		member.send(wembed)
		channel.send(wembed)
		const role = member.guild.roles.find(role => role.name === '줍줍이');
		member.addRole(role);
	} catch (error) {
		return;
	}
});

client.on("guildMemberRemove", member => {
    let wembed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setTitle(member.displayName + "님 안녕히가세요.")
        const channel = client.channels.get(leave_id)
    channel.send(wembed)
});

client.on('message', (message) => {

	if(message.author.bot) return;

	if (message.content.startsWith('ㅎㅇ')) {
			message.channel.send("ㅎㅇ?")
	}

	if (message.content === '넌 살아있는가?') {
			// Create the attachment using Attachment
	message.channel.send("http://pds9.egloos.com/pds/200804/24/61/d0041161_481055614e5e9.jpg")
	}

	if(message.content.startsWith('핑')) {
		message.channel.send(client.ping + ' ms' + "입니당")
	}

	if (message.content.startsWith('!say')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var id = message.author.id
		var sayMessage = message.content.substring(4)
		if (id == '677315709835018262') {
			message.delete()

			let embed = new Discord.RichEmbed()	
				.setTitle("관리자에 의해 전송됨")
				.setColor("#00FF7F")
				.setDescription(sayMessage)
			message.channel.send({embed});
		} else {
			message.channel.send(`<@${message.author.id}>:\n` + sayMessage)
			console.log(`<${message.author.id}>:\n` + "의 say 실행")
		}
	}

if (message.content.startsWith('!피드백'))
{
 let feedback = "677807659210113055"; 
 const channel = client.channels.get(feedback);
			var text = message.content.substring(4);
			let embed = new Discord.RichEmbed()
				.setTitle("피드백")
				.setColor("#00FF7F")
				.setAuthor("피드백도", 'https://media.discordapp.net/attachments/677332843806064700/677445144680726528/HxD_icon.jpg', 'https://discord.gg/rWbpaHZ')
				.setDescription(text + "By HxD")
				channel.send(embed)
}
	if (message.content.startsWith('!ann')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1;
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			if (message.author.id == '677315709835018262') {
				const channel = client.channels.get("677319082365681664")
				const text = message.content.substring(5)
				let embed = new Discord.RichEmbed()
					.setTitle("공지")
					.setColor("#00FF7F")
					.setDescription(text)
				channel.send({embed});
				console.log('!ann 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
			}
		}
	}

	if(message.content.startsWith("!dm")) {		
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if(message.author.id == '677315709835018262') {
			var text = message.content.substring(4);
			let embed = new Discord.RichEmbed()
				.setTitle("뷰메봇커뮤니티에서전송되었습니다.")
				.setColor("#00FF7F")
				.setAuthor("관리자에의해 보내짐", 'https://media.discordapp.net/attachments/677332843806064700/677445144680726528/HxD_icon.jpg', 'https://discord.gg/rWbpaHZ')
				.setDescription(text)
			message.guild.members.filter(m => !m.user.bot).forEach(member => member.send({embed}))
			message.channel.send("모든 유저에게 " + text + " 메세지를 전송했습니다.")
            console.log("모든 유저에게 `" + text + "` 메세지를 전송했습니다." + yyyy + "년 "  + mm + "월 " + dd + "일 ")
		} else {
			return;
		}
	}

	if (message.content.startsWith('!kick')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!kick [멘션]` 가 올바른 명령어입니다.")
		};
		var member = message.mentions.members.first();
		member.kick().then((member) => {
			message.channel.send(":wave: " + member.displayName + " 님이 서버에서 추방되었습니다. ");
			console.log(":wave: " + member.displayName + " 님이 서버에서 추방되었습니다. " + yyyy + "년 " + dd + "월 " + mm + "일 ");
			console.log('!kick 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		}).catch(() => {
			message.channel.send(member.displayName + " 의 권한이 봇보다 높아서 추방하는데 실패했습니다.");
		});
	}

	if (message.content.startsWith('!mute')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!mute [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === 'Muted');
			args.addRole(role);
			message.channel.send(":mute: " + args + " 님을 채팅 금지 처리했습니다.")
			console.log(":mute: " + args + " 님을 채팅 금지 처리했습니다." + yyyy + "년 "  + mm + "월 " + dd + "일 ")
			console.log('!mute 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("오류가 발생했습니다.\n혹시 대상이 이미 채팅금지 상태가 이거나 Muted 역할이 봇 권한보다 높이 있거나, `Muted` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}

	if (message.content.startsWith('!a')) {
		let guild = client.guilds.get("677317579559141395");
		message.channel.send('${guild.memberCount}' + "명입니다.");
	}

	if (message.content.startsWith('!줍줍이')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!줍줍이 [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === '줍줍이');
			args.addRole(role);
			message.channel.send("> :heart: " + args + " 님을 승급했습니다. ")
			console.log(args + " 님을 승급했습니다. " + yyyy + "년 "  + mm + "월 " + dd + "일 ")
			console.log('!줍줍이 명령어 실행!' + yyyy + "년 " + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 줍줍이거나 줍줍이 역할이 봇 권한보다 높이 있거나, `줍줍이` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}
	
	
	if (message.content === '내프로필') {
    // Send the user's avatar URL
    let guild = client.guilds.get("677317579559141395");
    message.channel.send(message.author.avatarURL)
  }
  
  if (message.content.startsWith('!프로필')) {
      var args = message.mentions.members.first();
      if (!args) {
          message.channel.send(args.author.avatarURL)
  }
}
	
  	



	if (message.content.startsWith('!리셀러')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!리셀러 [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === '리셀러');
			args.addRole(role);
			message.channel.send("> :heart: " + args + " 님을 승급했습니다. ")
			console.log(args + " 님을 승급했습니다. " + yyyy + "년 " + dd + "월 " + mm + "일 ")
			console.log('!리셀러 명령어 실행! ' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 리셀러거나 리셀러 역할이 봇 권한보다 높이 있거나, `리셀러` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}


	if (message.content.startsWith('!구매자')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!구매자 [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === '구매자');
			args.addRole(role);
			message.channel.send("> :heart: " + args + " 님을 승급했습니다. ")
			console.log(args + " 님을 승급했습니다. " + yyyy + "년 "  + mm + "월 " + dd + "일 ")
			console.log('!구매자 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 구매자거나 구매자 역할이 봇 권한보다 높이 있거나, `구매자` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}

	if (message.content.startsWith('!배너')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!배너 [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			
			const role = message.guild.roles.find(role => role.name === '배너');
			args.addRole(role);
			message.channel.send("> :heart: " + args + " 님을 승급했습니다. ")
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 배너거나 배너 역할이 봇 권한보다 높이 있거나, `배너` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}

	if (message.content.startsWith('!업로더')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!업로더 [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === '업로더');
			args.addRole(role);
			message.channel.send("> :heart: " + args + " 님을 승급했습니다. ")
			console.log(args + " 님을 승급했습니다. " + yyyy + "년 "  + mm + "월 " + dd + "일 ")
			console.log('!배너 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 업로더거나 업로더 역할이 봇 권한보다 높이 있거나, `업로더` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}


	if (message.content.startsWith('!프리미엄')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!프리미엄 [멘션]` 가 올바른 명령어입니다.")
		};
		try {	
			const role = message.guild.roles.find(role => role.name === '프리미엄 뷰메');
			args.addRole(role);
			message.channel.send("> :heart: " + args + " 님을 승급했습니다. ")
			console.log(args + " 님을 승급했습니다. " + yyyy + "년 "  + mm + "월 " + dd + "일 ")
			console.log('!프리미엄 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 프리미엄 뷰메거나 줍줍이 역할이 봇 권한보다 높이 있거나, `프리미엄 뷰메` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}


	if (message.content.startsWith('!unmute')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!unmute [멘션]` 가 올바른 명령어입니다.")
		};
		try {
			const role = message.guild.roles.find(role => role.name === 'Muted');
			args.removeRole(role);
			message.channel.send(":loud_sound: " + args + " 님의 채팅 금지를 해제했습니다.")
			console.log('!unmute 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		} catch (error) {
			message.channel.send("> 오류가 발생했습니다.\n혹시 대상이 이미 채팅금지 상태가 아니거나 `Muted` 역할이 없는것으로 추정됩니다.\n 자세한 오류 : \n" + error)
		}
	}

	if (message.content.startsWith('!ban')) {
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send("명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var args = message.mentions.members.first();
		if (!args) {
			return message.reply("`!ban [멘션]` 가 올바른 명령어입니다.")
		};
		var member = message.mentions.members.first();
		member.ban().then((member) => {
		message.channel.send(":wave: " + member.displayName + " 님이 서버에서 차단 되었습니다.");
		console.log(":wave: " + member.displayName + " 님이 서버에서 차단 되었습니다." + yyyy + "년 " + dd + "월 " + mm + "일 ");
		console.log('!ban 명령어 실행!' + yyyy + "년 "  + mm + "월 " + dd + "일 ");
		}).catch(() => {
			message.channel.send(member.displayName + " 의 권한이 봇보다 높아서 차단하는데 실패했습니다.")
		});
	}
  
		

	
	if (message.content.startsWith('!clear')) {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) {
			return message.channel.send(`<@${message.author.id}> ` + "명령어를 수행할 관리자 권한을 소지하고 있지않습니다.")
		};
		var clear = message.content.substring(7)
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
			if (!clear) {
				return message.channel.send("숫자를 입력해주세요.")
			}
			if (clear > 100) {
				message.channel.send("1부터 100까지만 입력해주세요.")
				return;
			}
			if (clear < 1) {
				message.channel.send("1부터 100까지만 입력해주세요.")
				return;
			}
			if (isNaN(clear) == true) {
				message.channel.send("숫자만 입력해주세요.")
			} else {
				message.channel.bulkDelete(clear)
				.then(() => message.channel.send(`${clear}개의 메세지를 삭제했습니다  ` + "청소날짜:  " + yyyy + "년 "  + mm + "월 " + dd + "일 "))
				.catch(console.error)
			}
	}
});

client.on("messageDelete", async msg => {
	let logs = await msg.guild.fetchAuditLogs({type: 72});
  
	let embed = new Discord.RichEmbed()
	  .setTitle("**메세지 삭제 로그**")
	  .setColor("#fc3c3c")
	  .addField("작성자 태그", msg.author.tag, true)
	  .addField("채널", msg.channel, true)
	  .addField("Privite")
	  .setFooter(`메세지 아이디: ${msg.id} | 작성자 아이디: ${msg.author.id}`);
  
	let channel = msg.guild.channels.find(x => x.id === '677441907231555614');
	channel.send({embed});
});

client.login(Token)