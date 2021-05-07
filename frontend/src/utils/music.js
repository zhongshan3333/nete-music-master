function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export class MusicPlayController {
  // 'repeat', 'repeat_one', 'replay', 'shuffle'
  // '列表循环', '单曲循环', '顺序播放', '随机播放'
  playMode = {
    0: 'repeat',
    1: 'repeat_one',
    2: 'replay',
    3: 'shuffle',
  };
  constructor(musicList, mode, currentSong = {}) {
    if (typeof mode !== 'number') throw Error('mode: must be integer!');
    if (mode < 0 || mode > 3) throw Error('mode: must in [0-3]!');
    if (!Array.isArray(musicList)) throw Error('musicList: must be list!');
    const hasID = musicList.some((v) => !v.id);
    if (!hasID) throw Error('musicList must has id!');

    this.mode = this.playMode[mode];
    this.currentSong = currentSong;
    this.prevSong = {};
    this.musicLength = musicList.length;
    this.musicList = musicList;
  }

  next() {
    if (this.musicLength === 0) return this.currentSong;
    // 下一首
    switch (this.mode) {
      case 'repeat_one':
      case 'replay':
      case 'repeat': {
        // repeat
        const idx = this.repeat_index();
        this.prevSong = this.currentSong;
        this.currentSong = this.musicList[idx];
        break;
      }
      case 'shuffle': {
        // shuffle
        this.shuffle();
        break;
      }
    }

    return this.currentSong;
  }

  previouse() {
    // 上一首
    return this.prevSong;
  }

  autoPlayNext() {
    if (this.musicLength === 0) return this.currentSong;
    // 下一首
    switch (this.mode) {
      case 'repeat': {
        // repeat

        const idx = this.repeat_index();
        this.prevSong = this.currentSong;
        this.currentSong = this.musicList[idx];
        break;
      }
      case 'repeat_one': {
        // repeat_one
        // stay currentSong
        if (Object.keys(this.currentSong) === 0 && this.musicLength > 0)
          this.currentSong = this.musicList[0];
        break;
      }
      case 'replay': {
        // replay
        let currentIDX = this.musicList.findIndex(
          (v) => v.id === this.currentSong.id
        );
        if (currentIDX + 1 === this.musicLength) this.currentSong = {};
        else {
          const idx = (currentIDX + 1) % this.musicLength;
          this.prevSong = this.currentSong;
          this.currentSong = this.musicList[idx];
        }
        break;
      }
      case 'shuffle': {
        // shuffle
        this.shuffle();
        break;
      }
    }
    return this.currentSong;
  }

  hasNext() {
    let hasnext = false;
    switch (this.mode) {
      case 'repeat': {
        // repeat
        if (this.musicLength !== 0) hasnext = true;
        break;
      }
      case 'repeat_one': {
        // repeat_one
        if (this.musicLength > 1) hasnext = true;
        break;
      }
      case 'replay': {
        if (this.musicLength > 1) {
          hasnext = true;
          break;
        }
        // replay
        const currentIDX = this.musicList.findIndex(
          (v) => v.id === this.currentSong.id
        );
        if (this.musicLength > 1 && currentIDX !== this.musicLength - 1)
          hasnext = true;
        break;
      }
      case 'shuffle': {
        // shuffle
        if (this.musicLength > 1) hasnext = true;
        break;
      }
    }
    return hasnext;
  }

  shuffle() {
    let currentIDX = null;
    let idx = null;

    if (this.currentSong != null) {
      currentIDX = this.musicList.findIndex(
        (v) => v.id === this.currentSong.id
      );
    }

    while (true) {
      if (this.musicLength === currentIDX) break;
      idx = getRandomInt(0, this.musicLength);
      if (idx !== currentIDX) break;
    }

    this.prevSong = this.currentSong;
    this.currentSong = this.musicList[idx];
  }

  repeat_index() {
    let currentIDX = this.musicList.findIndex(
      (v) => v.id === this.currentSong.id
    );
    return (currentIDX + 1) % this.musicLength;
  }
}

export function getPlayListValue(obj, key) {
  let value = obj;
  const keys = key.split('.');
  for (const key in keys) {
    if (keys.hasOwnProperty(key)) {
      const element = keys[key];
      value = value[element];
      if (!value) break;
    }
  }
  return value;
}
