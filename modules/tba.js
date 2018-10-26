const Discord = require('discord.js');
const TBA = require('tba-api-storm');

module.exports = {
    name: 'tba',
    type: 'informational',
    usage: 'tba <arguments>',
    permission: 1,
    help: 'Querys The Blue Alliance API for information.',
    main: function(bot, m) {
        let req = new TBA(bot.config.tba);

        var curYear = new Date().getFullYear();
        var args = m.content.split(' ')[0];
        var teamNumber = m.content.split(' ')[1];
        console.log(args + ', ' + teamNumber);
        if (!isNaN(args)) {
            team(args);
        } else if (!isNaN(teamNumber)) {
            if (args === 'team') {
                team(teamNumber);
            } else if (args === 'awards') {
                let year = m.content.split(' ')[2];
                console.log(year);
                if (isNaN(year)) { year = null; }
                var awardlist = new Discord.RichEmbed();
                req.getTeamAwards(teamNumber, year).then(d => {
                    awardlist.setAuthor('Awards for FIRST® Robotics Competition Team ' + teamNumber + (year ? ' in ' + year : ''), 'http://i.imgur.com/V8nrobr.png', 'https://www.thebluealliance.com/team/' + teamNumber)
                        .setColor(0x1675DB);
                    var awards = [''];
                    var n = 0;
                    for (var i = 0; i < d.length; i++) {
                        if ((awards[n] + d[i].year + ' - ' + d[i].name).length >= 1024) {
                            n++;
                        }
                        if (awards[n] !== undefined) {
                            awards[n] += d[i].year + ' - ' + d[i].name + '\n';
                        } else {
                            awards[n] = d[i].year + ' - ' + d[i].name + '\n';
                        }
                    }
                    for (var j = 0; j < awards.length; j++) {
                        if (awards[j] !== undefined) {
                            if (awards.length === 1) {
                                awardlist.addField('Award List', awards[j]);
                            } else {
                                awardlist.addField('Award List Page ' + (j + 1), awards[j]);
                            }
                        }
                        if (awardlist.fields.length === 4 || j === awards.length - 1) {
                            awardlist.setColor(0x1675DB);
                            sendEmbed(awardlist);
                        }
                    }
                }).catch(e => {
                    console.log(e.message);
                    m.reply(e);
                });
            } else if (args === 'avatar') {
                let year = m.content.split(' ')[2];
                if (year === undefined) { year = curYear; }
                req.getTeamMedia(teamNumber, year).then(d => {
                    var found = false;
                    for (var i = 0; i < d.length; i++) {
                        if (d[i].type === 'avatar') {
                            found = true;
                            m.channel.send('**Team ' + teamNumber + '\'s** avatar for the *FIRST®* POWER UP season:',
                                { files: [new Buffer(d[i].details.base64Image, 'base64')] });
                        }
                    }
                    if (!found) m.channel.send('Unfortunately Team ' + teamNumber + ' does not have an avatar.');
                });
            } else if (args === 'robots') {
                var robots = new Discord.RichEmbed();
                req.getTeamRobots(teamNumber).then(d => {
                    robots.setAuthor('Robot Names for FIRST® Robotics Competition Team ' + teamNumber, 'http://i.imgur.com/V8nrobr.png', 'https://www.thebluealliance.com/team/' + teamNumber)
                        .setColor(0x1675DB);
                    for (let i in d) {
                        robots.addField(d[i].year, d[i].robot_name);
                    }
                    sendEmbed(robots);
                    teamNumber = null;
                }).catch(e => {
                    console.log(e.message);
                    m.reply('an error has occurred');
                });
            } else if (args === 'events') {
                var evts = new Discord.RichEmbed();
                let year = m.content.split(' ')[2];
                console.log(year);
                if (year === undefined) { year = curYear; }
                req.getTeamEventList(teamNumber, year).then(d => {
                    evts.setAuthor('Events for FIRST® Robotics Competition Team ' + teamNumber + ' in ' + year, 'http://i.imgur.com/V8nrobr.png', 'https://www.thebluealliance.com/team/' + teamNumber)
                        .setColor(0x1675DB);
                    for (var i = 0; i < d.length; i++) {
                        var startDate = new Date(d[i].start_date);
                        var endDate = new Date(d[i].end_date);
                        evts.addField(`${d[i].year} ${d[i].name}`, `${d[i].location_name}, ${d[i].city}, ${d[i].state_prov}, ${d[i].country}\n${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`);
                    }
                    sendEmbed(evts);
                }).catch(e => {
                    console.log(e.message);
                    m.reply('an error has occurred');
                });
            } else if (args === 'media') {
                var media = new Discord.RichEmbed();
                let year = m.content.split(' ')[2];
                console.log(year);
                if (year === undefined) { year = curYear; }
                req.getTeamMedia(teamNumber, year).then(d => {
                    if (d.length !== 0) {
                        media.setAuthor('Media for FIRST® Robotics Competition Team ' + teamNumber + ' in ' + year, 'http://i.imgur.com/V8nrobr.png', 'https://www.thebluealliance.com/team/' + teamNumber)
                            .setColor(0x1675DB);
                        for (var i = 0; i < d.length; i++) {
                            if ((d[i].type === 'imgur' || d[i].type === 'cdphotothread') && media.image === null) {
                                if (d[i].type === 'imgur') {
                                    media.setImage('https://i.imgur.com/' + d[i].foreign_key + '.png');
                                } else if (d[i].type === 'cdphotothread') {
                                    media.setImage('https://www.chiefdelphi.com/media/img/' + d[i].details.image_partial);
                                }
                            }
                            var temp, name;

                            if (d[i].type === 'imgur') {
                                name = 'Imgur';
                                temp = 'https://i.imgur.com/' + d[i].foreign_key + '.png';
                            } else if (d[i].type === 'cdphotothread') {
                                name = 'Chief Delphi';
                                temp = 'https://www.chiefdelphi.com/media/img/' + d[i].details.image_partial;
                            } else if (d[i].type === 'youtube') {
                                name = 'Youtube';
                                temp = 'https://www.youtube.com/watch?v=' + d[i].foreign_key;
                            } else if (d[i].type === 'facebook-profile') {
                                name = 'Facebook';
                                temp = 'https://www.facebook.com/' + d[i].foreign_key;
                            } else if (d[i].type === 'youtube-channel') {
                                name = 'Youtube Channel';
                                temp = 'https://twitter.com/' + d[i].foreign_key;
                            } else if (d[i].type === 'twitter-profile') {
                                name = 'Twitter';
                                temp = 'https://www.youtube.com/' + d[i].foreign_key;
                            } else if (d[i].type === 'github-profile') {
                                name = 'Github';
                                temp = 'https://github.com/' + d[i].foreign_key;
                            } else if (d[i].type === 'instagram-profile') {
                                name = 'Instagram';
                                temp = 'https://www.instagram.com/' + d[i].foreign_key;
                            } else if (d[i].type === 'periscope-profile') {
                                name = 'Periscope';
                                temp = 'https://www.periscope.tv/' + d[i].foreign_key;
                            } else if (d[i].type === 'grabcad') {
                                name = 'GrabCAD';
                                temp = 'https://grabcad.com/library/' + d[i].foreign_key;
                            } else if (d[i].type === 'avatar') {
                                name = 'Team Avatar';
                                temp = 'Use the ``tba avatar`` command to see this team\'s avatar!';
                            }

                            media.addField(name, temp);
                        }
                        sendEmbed(media);
                    } else {
                        m.channel.send('Unfortunately there is no media for team ' + teamNumber + ' in ' + year + '.');
                    }
                }).catch(e => {
                    console.log(e.message);
                    m.reply(e);
                });
            }
        } else if (args === 'district') {
            var toSend = new Discord.RichEmbed();
            let subcommand = m.content.split(' ')[1];
            if (subcommand === 'list') {
                req.getDistrictList(curYear).then(d => {
                    toSend.setColor(0x1675DB)
                        .setURL('https://www.thebluealliance.com');
                    var str = '';
                    for (var i = 0; i < d.length; i++) {
                        str += d[i].display_name + ', ';
                    }
                    str = str.substring(0, str.length - 2);
                    toSend.addField('Current District List', str);
                    sendEmbed(toSend);
                }).catch(e => {
                    console.log(e.message);
                    m.reply('an error has occurred');
                });
            } else {
                m.channel.sendMessage('Arguments for district subcommand: list');
            }
        } else {
            m.channel.sendMessage('Please specify an argument! Accepted arguments: team, avatar, awards, media, robots, events, district');
        }

        /* else if(subcommand == "events") {
                   var district = m.content.split(" ")[2];
                   var year = m.content.split(" ")[3];
                   if(year == null)
                       year = curYear;
                   var eventList = new Discord.RichEmbed();
                   var districtName = getDistrictName(district, year)
                   req.getDistrictEvents(district).then(d => {
                           eventList.setAuthor('Events for the ' + districtName + ' district in ' + year, 'http://i.imgur.com/V8nrobr.png', 'https://www.thebluealliance.com/events/' + district + '/' + year)
                               .setColor(0x1675DB)
                           var events = [""];
                           var n = 0;
                           for(var i = 0; i < d.length; i++) {
                               if((events[n] + d[i].name).length >= 1024) {
                                   n++;
                               }
                               if(events[n] != undefined)
                                   events[n] += d[i].name + "\n";
                               else
                                   events[n] = d[i].name + "\n";
                           }
                           for(var j = 0; j < events.length; j++) {
                               if(events[j] != undefined) {
                                   if(events.length == 1)
                                       eventList.addField("Event List", events[j])
                                   else
                                       eventList.addField("Event List Page " + (j + 1), events[j])
                               }
                               if(eventList.fields.length == 2 || j == events.length - 1) {
                                   eventList.setColor(0x1675DB)
                                   sendEmbed(eventList);
                               }
                           }
                   }).catch((e) => {
                       console.log(e);
                       m.reply(e);
                   });
               } else if(subcommand == "rankings") {
                   var district = m.content.split(" ")[2];
                   var year = m.content.split(" ")[3];
                   req.getDistrictRankings(district, year).then(d => {

                   })
               }*/

        function sendEmbed(embed) {
            m.channel.send({ embed: embed })
                .then(msg => {
                    if (!m.content.endsWith('--nodel')) {
                        setTimeout(() => {
                            msg.delete();
                        }, 30000);
                    } else {
                        m.channel.sendMessage('This message will not autodelete.')
                            .then(msg2 => {
                                setTimeout(() => {
                                    msg2.delete();
                                }, 5000);
                            });
                    }
                });
        }

        function team(num) {
            var teaminfo = new Discord.RichEmbed();
            req.getTeam(num).then(d => {
                teaminfo.setAuthor('FIRST® Robotics Competition Team ' + num, 'http://i.imgur.com/V8nrobr.png', 'https://www.thebluealliance.com/team/' + num)
                    .setColor(0x1675DB)
                    .setThumbnail('https://frcavatars.herokuapp.com/get_image?team=' + num)
                    .addField('Name', d.nickname, true)
                    .addField('Rookie Year', d.rookie_year, true)
                    .addField('Location', `${d.city}, ${d.state_prov}, ${d.country}`, true)
                    .addField('Website', d.website, true);
                if (d.motto !== null) { teaminfo.addField('Motto', d.motto || 'None', true); }
                sendEmbed(teaminfo);
            }).catch(e => { console.log(e); m.channel.sendMessage('Team does not exist'); });
        }

        /* function getDistrictName(n) {
            var r;
            if (n === 'chs') {
                r = 'Chesapeake';
            } else if (n === 'fim') {
                r = 'Michigan';
            } else if (n === 'in') {
                r = 'Indiana';
            } else if (n === 'isr') {
                r = 'Israel';
            } else if (n === 'mar') {
                r = 'Mid-Atlantic';
            } else if (n === 'nc') {
                r = 'North Carolina';
            } else if (n === 'ne') {
                r = 'New England';
            } else if (n === 'ont') {
                r = 'Ontario';
            } else if (n === 'pch') {
                r = 'Peachtree';
            } else if (n === 'pnw') {
                r = 'Pacific Northwest';
            } else {
                r = 'not found';
            }

            return r;
        }*/
    },
};
