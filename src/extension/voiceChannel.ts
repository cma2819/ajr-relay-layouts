import { NodeCG } from './nodecg';
import { Client, GatewayIntentBits, VoiceBasedChannel } from 'discord.js';
import { joinVoiceChannel } from '@discordjs/voice';

export const voiceChannel = (nodecg: NodeCG): void => {
  const logger = new nodecg.Logger('discord');
  const discordConfig = nodecg.bundleConfig.discord;
  const commentatorRep = nodecg.Replicant('commentators', { defaultValue: [] });

  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.MessageContent]
  });

  const connectToChannel = async (channel: VoiceBasedChannel) => {
    return joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });
  }

  client.on('ready', () => {
    logger.info('Ready to join discord bot');
  });

  client.on('messageCreate', async (message) => {
    logger.debug(`Get message ${JSON.stringify(message)}`)
    if (!message.guild || message.channelId !== discordConfig.commandChannelId) {
      return;
    }

    if (message.content === '-invite') {
      const channel = message.member?.voice.channel;
      logger.debug(`Received invite message, channel is ${channel}`);
      if (channel) {
        try {
          await connectToChannel(channel);

          setInterval(() => {
            const members = message.member?.voice.channel?.members?.map(member => ({
              pk: member.id,
              name: member.displayName,
              avatar: member.avatarURL({ extension: 'png' }) ?? '',
            })).filter(m => m.pk !== discordConfig.botId) ?? [];
            commentatorRep.value = members;
            logger.debug(`Set commentators as ${JSON.stringify(members)}`);
          }, 1000)
        } catch (e) {
          logger.error(e)
        }
      }
    }
  })

  client.login(discordConfig.token);
}