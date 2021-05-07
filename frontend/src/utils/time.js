export function realFormatSecond(second) {
    const secondType = typeof second;
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second);
      const hours = Math.floor(second / 3600);
      second = second - hours * 3600;
      const mimute = Math.floor(second / 60);
      second = second - mimute * 60;
      return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2);
    } else {
      return '00:00';
    }
  }