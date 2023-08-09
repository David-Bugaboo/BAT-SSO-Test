export default function secondsToHms(second: number) {
  const h = Math.floor(second / 3600);
  const m = Math.floor(second % 3600 / 60);
  const s = Math.floor(second % 3600 % 60);

  const hDisplay = h > 0 ? h + 'h ' : "";
  const mDisplay = m > 0 ? m + 'm ' : "";
  const sDisplay = s > 0 ? s + 's ' : "";
  return hDisplay + mDisplay + sDisplay; 
}