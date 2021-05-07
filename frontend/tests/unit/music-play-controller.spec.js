import { MusicPlayController } from '../../src/utils';

const playlist = Array.from(Array(10).keys()).map((v) => ({
  id: v,
}));

const playMode = {
  repeat: 0,
  repeat_one: 1,
  replay: 2,
  shuffle: 3,
};

describe('music play controller test', () => {
  it('test repeat to be expect', () => {
    const c = new MusicPlayController(playlist, playMode.repeat);
    for (let index = 0; index < playlist.length; index++) {
      const n = c.next();

      expect(n.id).toBe(index);
      expect(c.hasNext()).toBeTruthy();
    }
  });
  test('should repeat_one expect', () => {
    const c = new MusicPlayController(playlist, playMode.repeat_one);
    for (let index = 0; index < playlist.length; index++) {
      const next = c.next();
      expect(next.id).toBe(index);
      expect(c.hasNext()).toBeTruthy();
    }
  });
  test('should replay expect', () => {
    const c = new MusicPlayController(playlist, playMode.replay);
    for (let index = 0; index <= playlist.length; index++) {
      const next = c.next();

      if (index === playlist.length) {
        console.log(next);
        expect(next.id).toEqual(0);
      } else {
        expect(next.id).toBe(index % playlist.length);
      }
      expect(c.hasNext()).toBeTruthy();
    }
  });
  test('should replay expect autoPlay', () => {
    const c = new MusicPlayController(playlist, playMode.replay);
    console.log(playlist.length);
    for (let index = 0; index <= playlist.length; index++) {
      const next = c.autoPlayNext();
      if (index === playlist.length) {
        console.log(next);
        expect(next.id).toBeUndefined();
      } else {
        expect(next.id).toBe(index % playlist.length);
      }
      expect(c.hasNext()).toBeTruthy();
    }
  });

  test('should random music expect', () => {
    const c = new MusicPlayController(playlist, playMode.shuffle);
    console.log('random...');
    for (let index = 0; index < playlist.length; index++) {
      const next = c.next();
      expect(next.id).toBeDefined();
      expect(c.hasNext()).toBeTruthy();
    }
  });
});
