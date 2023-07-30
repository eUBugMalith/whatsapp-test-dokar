import { MessageMedia, Message } from 'whatsapp-web.js';
import Downloader from '../services/download';
import Searcher from '../services/search';
import text from '../language';
import { LANGUAGE } from '../config';
import fs from 'fs';


export default {
  run: async (message: Message, keyword: string): Promise<Message> => {
    const downloader = new Downloader();
    const searcher = new Searcher();
    try {
      const { title, videoId } = await searcher.handle(keyword);
      message.reply(`${text[LANGUAGE].FOUNDED} "${title}"`);

     // message.reply(text[LANGUAGE].DOWNLOAD_STARTED);

      const music = await downloader.handle(videoId);

      const media = MessageMedia.fromFilePath(music);

     // const videoImage = await MessageMedia.fromUrl(`http://img.youtube.com/vi/${videoId}/hqdefault.jpg`);
      const videoImage = await MessageMedia.fromUrl(`https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`);
      message.reply(videoImage);

      fs.unlinkSync(music);
      return message.reply(media);

    } catch (error) {
      console.log(error);
      return message.reply(text[LANGUAGE].ERROR);
    }
  },
  help: text[LANGUAGE].HELP_PLAY,
};






 